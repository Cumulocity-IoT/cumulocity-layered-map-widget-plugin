import { AfterViewInit, Component, ComponentRef, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import type * as L from 'leaflet';

import { LayeredMapWidgetService } from './service/layered-map-widget.service';
import { get, isEmpty, isNil } from 'lodash';
import { fromEvent, Subject, Subscription } from 'rxjs';

import { ILayeredMapWidgetConfig, isDeviceFragmentLayerConfig, isQueryLayerConfig, MyLayer } from './layered-map-widget.model';
import { LayerService } from './service/layer.service';
import { PopupComponent } from './popup/popup.component';
import { InventoryPollingService } from './service/inventory-polling.service';
import { filter, takeUntil } from 'rxjs/operators';
import { AlarmPollingService } from './service/alarm-polling.service';
import { PositionPollingService } from './service/position-polling.service';
import { EventPollingService } from './service/event-polling.service';
import { WMSLayerService } from './service/wms-layer.service';
import { IManagedObject } from '@c8y/client';
import { DashboardChildComponent } from '@c8y/ngx-components';

@Component({
  selector: 'layered-map-widget',
  providers: [LayeredMapWidgetService, InventoryPollingService, AlarmPollingService, EventPollingService, PositionPollingService, WMSLayerService],
  styleUrls: ['./layered-map-widget.component.less'],
  templateUrl: './layered-map-widget.component.html',
  standalone: false
})
export class LayeredMapWidgetComponent implements AfterViewInit, OnDestroy {
  map!: L.Map;
  leaf!: typeof L;
  allLayers: MyLayer[] = [];
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

  async ngAfterViewInit() {
    this.leaf = await import('leaflet');
    this.initMap();
  }

  private initMap() {
    const options: L.MapOptions = this.options ?? {
      // zoom: 15,
      // center: this.leaf.latLng(29.3117, 47.4818),
      attributionControl: false,
      scrollWheelZoom: false,
    };
    this.map = this.leaf.map(this.mapReference.nativeElement, options);

    if (this.config?.manualCenter) {
      const { lat, long, zoomLevel } = this.config?.manualCenter;
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

    // this.map!.invalidateSize();
    this.draw(this.config);
  }

  onPopupOpen(event: L.PopupEvent): void {
    const popup = event.popup as L.Popup & { ref: ComponentRef<PopupComponent> };
    const ref = get(popup, 'ref');
    ref.instance.onShow();
    // const latLng = popup.getLatLng();
    // if (latLng) {
    //   this.map.setView(latLng, 13);
    // }
  }

  onPopupClose(event: L.PopupEvent): void {
    const popup = event.popup as L.Popup & { ref: ComponentRef<PopupComponent> };
    const ref = get(popup, 'ref');
    ref.instance.onHide();
  }

  onOverlayAdd(event: L.LayersControlEvent): void {
    const layer = this.allLayers.find((l) => l.group === event.layer);
    if (!layer) {
      // happens e.g. for WMS layer
      return;
    }
    if (!layer.initialLoad) {
      this.layerService.load(layer);
    }
    layer.initialLoad?.then(() => this.startPolling(layer));
  }

  onOverlayRemove(event: L.LayersControlEvent): void {
    const layer = this.allLayers.find((l) => l.group === event.layer);
    if (layer) {
      this.stopPolling(layer);
      delete layer.initialLoad;
      layer.active = false;
    }
  }

  private async draw(config: ILayeredMapWidgetConfig) {
    this.cfg = config;
    const osm = this.leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 22,
      maxNativeZoom: 19,
      minZoom: 2,
      detectRetina: true,
    });

    const layerControl = this.leaf.control.layers().addTo(this.map);
    layerControl.addBaseLayer(osm, 'Open Street Map');
    osm.addTo(this.map);

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

      const markerBasedLayers = config.layers.filter((l) => isDeviceFragmentLayerConfig(l.config) || isQueryLayerConfig(l.config));
      this.allLayers = await this.layerService.createLayers(markerBasedLayers);
      for (const layer of this.allLayers) {
        layerControl.addOverlay(layer.group, layer.config.name);
        if (layer.active) {
          layer.group.addTo(this.map);
        }
      }

      if (config.autoCenter === 'true') {
        Promise.all(this.allLayers.map((layer) => layer.initialLoad)).then(() => {
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

    if (this.config.positionPolling?.enabled === 'true') {
      this.createPositionUpdatePolling(this.allLayers);
    }
  }

  private startPolling(layer: MyLayer) {
    this.stopPolling(layer);
    const cfg = layer.config;
    if (!cfg.enablePolling || cfg.enablePolling === 'false') {
      return;
    }

    if (isDeviceFragmentLayerConfig(cfg)) {
      const query = `(bygroupid(${cfg.device.id}) or id eq '${cfg.device.id}') and has(c8y_Position) and ${cfg.fragment} eq '${cfg.value}'`;
      const sub = this.inventoryPollingService.createPolling$({ query }, layer, cfg.pollingInterval * 1000).subscribe((delta) => this.layerService.updatePollingDelta(delta, layer));
      this.layerSubs.set(layer, sub);
    }

    if (isQueryLayerConfig(cfg)) {
      if (cfg.type === 'Alarm') {
        const sub = this.alarmPollingService.createPolling$(layer, cfg.pollingInterval * 1000).subscribe((delta) => this.layerService.updatePollingDelta(delta, layer));
        this.layerSubs.set(layer, sub);
      } else if (cfg.type === 'Inventory') {
        const sub = this.inventoryPollingService.createPolling$(cfg.filter, layer, cfg.pollingInterval * 1000).subscribe((delta) => this.layerService.updatePollingDelta(delta, layer));
        this.layerSubs.set(layer, sub);
      } else if (cfg.type === 'Event') {
        const sub = this.eventPollingService.createPolling$(layer, cfg.pollingInterval * 1000).subscribe((delta) => this.layerService.updatePollingDelta(delta, layer));
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
    try {
      this.tearDownRealtime();
      this.map.clearAllEventListeners;
    } catch (e) {
      console.warn(e);
    }
  }

  private tearDownRealtime(): void {
    if (!isEmpty(this.layerSubs)) {
      this.layerSubs.forEach((sub) => sub.unsubscribe());
    }
    this.positionUpdateSub?.unsubscribe();
  }
}
