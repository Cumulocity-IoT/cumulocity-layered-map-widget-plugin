import { AfterViewInit, Component, ComponentRef, Input, OnDestroy } from '@angular/core';
import {
  Control,
  icon,
  LatLng,
  latLng,
  Map as LMap,
  MapOptions,
  polyline,
  Polyline,
  Popup,
  tileLayer,
} from 'leaflet';

import { LayeredMapWidgetService } from './service/layered-map-widget.service';
import { get, isEmpty } from 'lodash';
import { Subject, Subscription } from 'rxjs';
import * as MarkerImage from './marker-icon';

import {
  ILayeredMapWidgetConfig,
  isDeviceFragmentLayerConfig,
  isQueryLayerConfig,
  MyLayer,
} from './layered-map-widget.model';
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
  providers: [
    LayeredMapWidgetService,
    InventoryPollingService,
    AlarmPollingService,
    EventPollingService,
    PositionPollingService,
    WMSLayerService,
  ],
  styleUrls: ['./layered-map-widget.component.less'],
  templateUrl: './layered-map-widget.component.html',
})
export class LayeredMapWidgetComponent implements AfterViewInit, OnDestroy {
  map?: LMap;
  allLayers: MyLayer[] = [];

  icon = icon({
    iconUrl: MarkerImage.markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
  });

  cfg: ILayeredMapWidgetConfig;

  @Input() set config(cfg: ILayeredMapWidgetConfig) {
    if (cfg) {
      this.cfg = cfg;
      if (this.map) {
        this.draw(cfg);
      }
    }
  }

  @Input() options: MapOptions = {
    zoom: 1,
    center: latLng(0, 0),
    attributionControl: false,
  };

  private layerSubs: Map<MyLayer, Subscription> = new Map();
  private positionUpdateSub: Subscription | null = null;
  circuit: Polyline;

  private destroy$ = new Subject();

  constructor(
    private widgetService: LayeredMapWidgetService,
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

  ngAfterViewInit(): void {
    this.map.invalidateSize();
  }

  onMapReady(map: LMap): void {
    this.map = map;
    if (this.cfg) {
      this.draw(this.cfg);
    }
  }

  private async draw(config: ILayeredMapWidgetConfig) {
    const osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 19,
      detectRetina: true,
    });

    const layerControl = new Control.Layers().addTo(this.map);
    layerControl.addBaseLayer(osm, 'Open Street Map');
    osm.addTo(this.map);

    if (config.layers && !isEmpty(config.layers)) {
      const wmsLayers = this.wmsLayerService.filterWMSLayers(config);

      wmsLayers.map((layerConfig) =>
        this.wmsLayerService.createWMSLayer(layerConfig).then((layer) => {
          layerControl.addOverlay(layer, layerConfig.config.name);
          if (layerConfig.active) {
            layer.addTo(this.map);
          }
        })
      );

      const markerBasedLayers = config.layers.filter(
        (l) => isDeviceFragmentLayerConfig(l.config) || isQueryLayerConfig(l.config)
      );
      const layers = await this.layerService.createLayers(markerBasedLayers);
      for (const layer of layers) {
        layerControl.addOverlay(layer.group, layer.config.name);
        if (layer.active) {
          layer.group.addTo(this.map);
        }
        this.allLayers.push(layer);
      }

      if (config.autoCenter) {
        Promise.all(layers.map((layer) => layer.initialLoad)).then(() => {
          const bounds = this.layerService.extractMinMaxBounds(this.allLayers);
          this.map.fitBounds(bounds);
        });
      } else if (config.manualCenter) {
        const bounds = new LatLng(config.manualCenter.lat, config.manualCenter.long);
        this.map.setView(bounds, config.manualCenter.zoomLevel ?? 13);
      }
    }

    this.map.on('popupopen', (event) => {
      const popup = event.popup as Popup & { ref: ComponentRef<PopupComponent> };
      const ref = get(popup, 'ref');
      ref.instance.onShow();
      const latLng = popup.getLatLng();
      if (latLng) {
        this.map.setView(latLng, 13);
      }
    });

    this.map.on('popupclose', (event) => {
      const popup = event.popup as Popup & { ref: ComponentRef<PopupComponent> };
      const ref = get(popup, 'ref');
      ref.instance.onHide();
    });

    const track = this.widgetService.getTrack(config);
    if (track && this.map) {
      const line = polyline(track.coords);
      line.addTo(this.map);
      this.map.fitBounds(line.getBounds());
    }

    this.updateRealtimeSubs(this.allLayers);
  }

  private updateRealtimeSubs(layers: MyLayer[]): void {
    for (const layer of layers) {
      if (this.layerSubs.has(layer)) {
        this.layerSubs.get(layer)!.unsubscribe();
        this.layerSubs.delete(layer);
      }
      const cfg = layer.config;
      if (!cfg.enablePolling || cfg.enablePolling === 'false') {
        continue;
      }

      if (isDeviceFragmentLayerConfig(cfg)) {
        const query = `(bygroupid(${cfg.device.id}) or id eq '${cfg.device.id}') and has(c8y_Position) and ${cfg.fragment} eq '${cfg.value}'`;
        const sub = this.inventoryPollingService
          .createPolling$({ query }, layer, cfg.pollingInterval * 1000)
          .subscribe((delta) => this.layerService.updatePollingDelta(delta, layer));
        this.layerSubs.set(layer, sub);
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
    if (this.cfg.positionPolling?.enabled === 'true') {
      this.createPositionUpdatePolling(layers);
    }
  }

  private createPositionUpdatePolling(layers: MyLayer[]) {
    if (!this.positionUpdateSub) {
      const interval = +this.cfg.positionPolling?.interval * 1000 || 5000;
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
      this.map.remove();
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
