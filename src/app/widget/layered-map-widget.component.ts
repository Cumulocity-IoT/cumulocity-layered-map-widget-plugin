import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import type * as L from 'leaflet';
import { isEmpty, isNil } from 'lodash';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { ILayeredMapWidgetConfig, isQueryLayerConfig, MyLayer } from './layered-map-widget.model';
import { LayerService } from './service/layer.service';
import { InventoryPollingService } from './service/inventory-polling.service';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { AlarmPollingService } from './service/alarm-polling.service';
import { PositionPollingService } from './service/position-polling.service';
import { EventPollingService } from './service/event-polling.service';
import { WMSLayerService } from './service/wms-layer.service';
import { RailwayService } from './service/railway.service';
import { IManagedObject } from '@c8y/client';
import { CoreModule, DashboardChildComponent } from '@c8y/ngx-components';

@Component({
  selector: 'layered-map-widget',
  providers: [
    InventoryPollingService,
    AlarmPollingService,
    EventPollingService,
    PositionPollingService,
    WMSLayerService,
    RailwayService,
  ],
  styleUrls: ['./layered-map-widget.component.less'],
  templateUrl: './layered-map-widget.component.html',
  standalone: true,
  imports: [CoreModule],
})
export class LayeredMapWidgetComponent implements AfterViewInit, OnDestroy {
  map!: L.Map;
  leaf!: typeof L;
  allLayers: MyLayer[] = [];
  private railwayLayer!: L.GeoJSON;
  private railwayLegend: L.Control | null = null;
  get railwayLoading$() { return this.railwayService.loading$; }
  @ViewChild('mapContainer', { read: ElementRef, static: true }) mapReference!: ElementRef;

  cfg!: ILayeredMapWidgetConfig;

  @Input() config!: ILayeredMapWidgetConfig;

  @Input() options: L.MapOptions = {
    zoom: 15,
    attributionControl: false,
  };

  private layerSubs: Map<MyLayer, Subscription> = new Map();
  private positionUpdateSub: Subscription | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private layerService: LayerService,
    private inventoryPollingService: InventoryPollingService,
    private positionPollingService: PositionPollingService,
    private eventPollingService: EventPollingService,
    private alarmPollingService: AlarmPollingService,
    private wmsLayerService: WMSLayerService,
    private railwayService: RailwayService,
    child: DashboardChildComponent
  ) {
    child.changeEnd
      .pipe(
        filter((child) => child.lastChange === 'resize'),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.map?.invalidateSize();
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async ngAfterViewInit() {
    this.leaf = (await import('leaflet')) as typeof L;
    this.initMap();
  }

  private initMap() {
    const options: L.MapOptions = this.options ?? {
      // zoom: 15,
      // center: this.leaf.latLng(29.3117, 47.4818),
      attributionControl: false,
      scrollWheelZoom: false,
    };

    this.map = this.leaf.map(this.mapReference.nativeElement as HTMLElement, options);

    if (this.config?.manualCenter) {
      const { lat, long, zoomLevel } = this.config.manualCenter;

      if (!isNil(lat) && !isNil(long)) {
        const bounds = this.leaf.latLng(lat, long);

        this.map.setView(bounds, zoomLevel ?? 10);
      }
    }

    fromEvent<L.PopupEvent>(this.map, 'popupopen')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => this.onPopupOpen(e));

    fromEvent<L.PopupEvent>(this.map, 'popupclose')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => this.onPopupClose(e));

    fromEvent<L.LayersControlEvent>(this.map, 'overlayadd')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => this.onOverlayAdd(e));

    fromEvent<L.LayersControlEvent>(this.map, 'overlayremove')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => this.onOverlayRemove(e));

      fromEvent<L.LeafletEvent>(this.map, 'moveend')
      .pipe(takeUntil(this.destroy$), debounceTime(2000))
      .subscribe(() => this.onMapMoveEnd());
       

    // this.map!.invalidateSize();
    this.draw(this.config);
  }

  onPopupOpen(event: L.PopupEvent): void {
    const popup = event.popup as L.Popup & { ref?: { instance: { onShow(): void } } };

    popup.ref?.instance.onShow();
    // const latLng = popup.getLatLng();
    // if (latLng) {
    //   this.map.setView(latLng, 13);
    // }
  }

  onMapMoveEnd(): void {
    const zoom = this.map.getZoom();

    // Always cancel any pending retry or in-flight request when the map moves.
    this.railwayService.cancel();

    if (zoom < 10) {
      this.railwayLayer.clearLayers();
      if (this.railwayLegend) {
        this.map.removeControl(this.railwayLegend);
        this.railwayLegend = null;
      }
      return;
    }

    if (!this.railwayLegend) {
      this.railwayLegend = this.addRailwayLegend();
    }

    const bounds = this.map.getBounds();
    const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;

    // Zoom 10–12: only main types to limit data volume; zoom ≥13: all types
    const types =
      zoom >= 13
        ? ['rail', 'light_rail', 'tram', 'subway', 'monorail', 'narrow_gauge', 'preserved']
        : ['rail', 'light_rail'];

    this.railwayService.fetch(bbox, types, (geojson) => {
      this.railwayLayer.clearLayers();
      this.railwayLayer.addData(geojson);
    });
  }

  onPopupClose(event: L.PopupEvent): void {
    const popup = event.popup as L.Popup & { ref?: { instance: { onHide(): void } } };

    popup.ref?.instance.onHide();
  }

  onOverlayAdd(event: L.LayersControlEvent): void {
    const layer = this.allLayers.find((l) => l.group === event.layer);

    if (!layer) {
      // happens e.g. for WMS layer
      return;
    }

    if (layer.initialLoad === undefined) {
      this.layerService.load(layer);
    }
    void layer.initialLoad?.then(() => this.startPolling(layer));
  }

  onOverlayRemove(event: L.LayersControlEvent): void {
    const layer = this.allLayers.find((l) => l.group === event.layer);

    if (layer) {
      this.stopPolling(layer);
      delete layer.initialLoad;
      layer.active = false;
    }
  }

  private draw(config: ILayeredMapWidgetConfig) {
    const asBool = (v: unknown): boolean => v === true || v === 'true';

    if (config.autoCenter !== undefined) config.autoCenter = asBool(config.autoCenter);
    if (config.positionPolling)
      config.positionPolling.enabled = asBool(config.positionPolling.enabled);
    config.layers?.forEach((l) => {
      l.config.enablePolling = asBool(l.config.enablePolling);
    });

    this.cfg = config;
    const osm = this.leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 22,
      maxNativeZoom: 19,
      minZoom: 2,
      detectRetina: true,
    });

    // const railwayLayer = this.leaf.tileLayer('https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
    //   {
    //     attribution: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>, Style: <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a> and OpenStreetMap',
    //     minZoom: 2,
    //     maxZoom: 19,
    //     tileSize: 256
    //   });

    this.railwayLayer = this.leaf.geoJSON(null as any, {
      style: (feature) => this.getRailwayStyle(feature),
      onEachFeature: (feature: any, layer: L.Layer) => {
        const path = layer as L.Path;
        path.bindPopup(this.buildRailwayPopup(feature), { maxWidth: 320 });
        path.on('mouseover', () => {
          const base = this.getRailwayStyle(feature);
          path.setStyle({ weight: (base.weight ?? 2) + 2, opacity: 1 });
          path.bringToFront();
        });
        path.on('mouseout', () => {
          this.railwayLayer.resetStyle(path);
        });
      },
    }).addTo(this.map);

    const layerControl = this.leaf.control.layers().addTo(this.map);

    layerControl.addBaseLayer(osm, 'Open Street Map');
    layerControl.addOverlay(this.railwayLayer, 'Railway');

    osm.addTo(this.map);
    // railwayLayer.addTo(this.map);

    if (config.layers && !isEmpty(config.layers)) {
      setTimeout(() => {
        const wmsLayers = this.wmsLayerService.filterWMSLayers(config);

        wmsLayers.forEach((layerConfig) => {
          const layer = this.wmsLayerService.createWMSLayer(layerConfig, this.leaf);

          layerControl.addOverlay(layer, layerConfig.config.name);

          if (layerConfig.active) {
            layer.addTo(this.map);
          }
        });
      }, 2000);

      const markerBasedLayers = config.layers.filter((l) => isQueryLayerConfig(l.config));

      this.allLayers = this.layerService.createLayers(markerBasedLayers);

      for (const layer of this.allLayers) {
        layerControl.addOverlay(layer.group, layer.config.name);

        if (layer.active) {
          layer.group.addTo(this.map);
        }
      }

      if (config.autoCenter) {
        void Promise.all(this.allLayers.map((layer) => layer.initialLoad)).then(() => {
          const bounds = this.layerService.extractMinMaxBounds(this.allLayers);

          if (bounds) {
            this.map.fitBounds(bounds);
          }
        });
      } else if (this.config?.manualCenter) {
        const { lat, long, zoomLevel } = this.config.manualCenter;

        if (lat && long) {
          const bounds = this.leaf.latLng(lat, long);

          this.map.setView(bounds, zoomLevel);
        }
      }
    }


      

      // const track = this.widgetService.getTrack(config);
      // if (track && this.map) {
      //   const line = this.leaf.polyline(track.coords);
      //   line.addTo(this.map);
      //   this.map.fitBounds(line.getBounds());
      // }

      if (this.config.positionPolling?.enabled) {
        this.createPositionUpdatePolling(this.allLayers);
      }
    }

  private getRailwayStyle(feature: any): L.PathOptions {
    const STYLES: Record<string, { color: string; weight: number; dashArray?: string }> = {
      rail:         { color: '#4a90d9', weight: 4 },
      light_rail:   { color: '#f5a623', weight: 3 },
      tram:         { color: '#e8b400', weight: 2.5 },
      subway:       { color: '#d0021b', weight: 3, dashArray: '6 4' },
      monorail:     { color: '#9b59b6', weight: 2.5 },
      narrow_gauge: { color: '#795548', weight: 2 },
      preserved:    { color: '#27ae60', weight: 2, dashArray: '4 4' },
    };
    const type: string = feature?.properties?.railway ?? '';
    const usage: string = feature?.properties?.usage ?? '';
    const base = STYLES[type] ?? { color: '#999999', weight: 2 };
    let weight = base.weight;
    if (usage === 'main') weight += 1;
    if (usage === 'industrial' || usage === 'siding') {
      return { ...base, weight, dashArray: '3 5' };
    }
    return { ...base, weight };
  }

  private buildRailwayPopup(feature: any): string {
    const p = feature?.properties ?? {};
    const type: string = p.railway ?? '';
    const TYPE_LABELS: Record<string, string> = {
      rail:         'Heavy Rail',
      light_rail:   'Light Rail',
      tram:         'Tram',
      subway:       'Subway / Metro',
      monorail:     'Monorail',
      narrow_gauge: 'Narrow Gauge',
      preserved:    'Preserved / Heritage',
    };
    const row = (label: string, value: string | undefined): string =>
      value
        ? `<tr>
            <td style="color:#888;padding:2px 10px 2px 0;white-space:nowrap">${label}</td>
            <td style="font-weight:600">${value}</td>
           </tr>`
        : '';

    const osmId: string = (feature?.id ?? '').replace('way/', '');
    const osmLink = osmId
      ? `<a href="https://www.openstreetmap.org/way/${osmId}" target="_blank"
           rel="noopener noreferrer" style="font-size:12px">View on OpenStreetMap ↗</a>`
      : '';

    const electrification = (() => {
      if (!p.electrified || p.electrified === 'no') return undefined;
      const parts: string[] = [p.electrified];
      if (p.voltage) parts.push(`${p.voltage} V`);
      if (p.frequency) parts.push(`${p.frequency} Hz`);
      return parts.join(' · ');
    })();

    const flags = [p.tunnel === 'yes' ? 'Tunnel' : '', p.bridge === 'yes' ? 'Bridge' : '']
      .filter(Boolean)
      .join(', ');

    return `
      <div style="font-family:sans-serif;font-size:13px;min-width:200px">
        <div style="font-weight:700;font-size:14px;margin-bottom:6px;
                    border-bottom:2px solid #eee;padding-bottom:5px">
          ${p.name ?? '<em style="color:#aaa">Unnamed</em>'}
        </div>
        <table style="border-collapse:collapse;width:100%">
          ${row('Type', TYPE_LABELS[type] ?? type)}
          ${row('Operator', p.operator)}
          ${row('Usage', p.usage)}
          ${row('Max speed', p['maxspeed'] ? p['maxspeed'] + ' km/h' : undefined)}
          ${row('Tracks', p.tracks)}
          ${row('Gauge', p.gauge ? p.gauge + ' mm' : undefined)}
          ${row('Electrification', electrification)}
          ${row('Infrastructure', flags || undefined)}
          ${row('Ref', p.ref)}
        </table>
        ${osmLink ? `<div style="margin-top:8px">${osmLink}</div>` : ''}
      </div>`;
  }

  private addRailwayLegend(): L.Control {
    const leaf = this.leaf;
    const entries: [string, string][] = [
      ['#4a90d9', 'Heavy Rail'],
      ['#f5a623', 'Light Rail'],
      ['#e8b400', 'Tram'],
      ['#d0021b', 'Subway'],
      ['#9b59b6', 'Monorail'],
      ['#795548', 'Narrow Gauge'],
      ['#27ae60', 'Preserved'],
    ];
    const LegendControl = leaf.Control.extend({
      onAdd: () => {
        const div = leaf.DomUtil.create('div', '');
        div.style.cssText =
          'background:rgba(255,255,255,0.92);padding:8px 12px;border-radius:5px;' +
          'font-family:sans-serif;font-size:12px;line-height:1.9;' +
          'box-shadow:0 1px 5px rgba(0,0,0,.3);pointer-events:none';
        div.innerHTML =
          '<b style="display:block;margin-bottom:4px;font-size:13px">Railway types</b>' +
          entries
            .map(
              ([color, label]) =>
                `<div><span style="display:inline-block;width:22px;height:4px;background:${color};` +
                `border-radius:2px;margin-right:7px;vertical-align:middle"></span>${label}</div>`
            )
            .join('');
        return div;
      },
    });
    return new (LegendControl as any)({ position: 'bottomleft' }).addTo(this.map);
  }

  private startPolling(layer: MyLayer) {
    this.stopPolling(layer);
    const cfg = layer.config;

    if (!cfg.enablePolling) {
      return;
    }

    if (isQueryLayerConfig(cfg)) {
      if (cfg.type === 'Alarm') {
        const sub = this.alarmPollingService
          .createPolling$(layer, cfg.pollingInterval * 1000)
          .subscribe((delta) => this.layerService.updatePollingDelta(delta, layer));

        this.layerSubs.set(layer, sub);
      } else if (cfg.type === 'Inventory') {
        const sub = this.inventoryPollingService
          .createPolling$(cfg.filter, layer, cfg.pollingInterval * 1000)
          .subscribe((delta) => this.layerService.updatePollingDelta(delta, layer));

        this.layerSubs.set(layer, sub);
      } else if (cfg.type === 'Event') {
        const sub = this.eventPollingService
          .createPolling$(layer, cfg.pollingInterval * 1000)
          .subscribe((delta) => this.layerService.updatePollingDelta(delta, layer));

        this.layerSubs.set(layer, sub);
      }
    }
  }

  private stopPolling(layer: MyLayer) {
    if (this.layerSubs.has(layer)) {
      this.layerSubs.get(layer)?.unsubscribe();
      this.layerSubs.delete(layer);
    }
  }

  private createPositionUpdatePolling(layers: MyLayer[]) {
    if (!this.positionUpdateSub) {
      const interval = +(this.config.positionPolling?.interval ?? 0) * 1000 || 5000;

      this.positionUpdateSub = this.positionPollingService
        .createPolling$('has(c8y_Position)', interval)
        .pipe(filter((updates) => !isEmpty(updates)))
        .subscribe((positionUpdates) => this.onPositionUpdate(layers, positionUpdates));
    }
  }

  private onPositionUpdate(layers: MyLayer[], positionUpdates: IManagedObject[]): void {
    for (const layer of layers) {
      const matches = positionUpdates.filter((mo) => layer.devices.includes(mo.id));

      if (!isEmpty(matches)) {
        this.layerService.updateManagedObjects(matches, layer);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    try {
      this.tearDownRealtime();
      this.map.clearAllEventListeners();
    } catch (e) {
      console.warn(e);
    }
  }

  private tearDownRealtime(): void {
    this.railwayService.cancel();
    if (!isEmpty(this.layerSubs)) {
      this.layerSubs.forEach((sub) => sub.unsubscribe());
    }
    this.positionUpdateSub?.unsubscribe();
  }
}
