import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  OnDestroy,
} from "@angular/core";
import {
  Control,
  icon,
  latLng,
  Map as LMap,
  MapOptions,
  polyline,
  Polyline,
  tileLayer,
} from "leaflet";
import { LayeredMapWidgetService } from "./service/layered-map-widget.service";
import { get, isEmpty } from "lodash-es";
import { Subscription } from "rxjs";
import { IManagedObject } from "@c8y/client";
import * as MarkerImage from "./marker-icon";

import {
  ILayeredMapWidgetConfig,
  isDeviceFragmentLayerConfig,
  isQueryLayerConfig,
  MyLayer,
} from "./layered-map-widget.model";
import { SelectedDevicesService } from "./service/selected-devices.service";
import { LayerService } from "./service/layer.service";
import { PopupComponent } from "./popup/popup.component";
import { InventoryPollingService } from "./service/inventory-polling.service";
import { filter } from "rxjs/operators";
import { AlarmPollingService } from "./service/alarm-polling.service";
import { PositionPollingService } from "./service/position-polling.service";
import { EventPollingService } from "./service/event-polling.service";

@Component({
  selector: "layered-map-widget",
  providers: [
    LayeredMapWidgetService,
    SelectedDevicesService,
    InventoryPollingService,
    AlarmPollingService,
    EventPollingService,
    PositionPollingService,
  ],
  styleUrls: ["./layered-map-widget.component.less"],
  templateUrl: "./layered-map-widget.component.html",
})
export class LayeredMapWidgetComponent implements AfterViewInit, OnDestroy {
  map: LMap;
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
      if (this.map && cfg.device) {
        this.selectedDevicesService
          .getDevices(cfg.device)
          .then((devices) => this.draw(cfg, devices));
      }
    }
  }

  @Input() options: MapOptions = {
    zoom: 1,
    center: latLng(0, 0),
    attributionControl: false,
  };

  private layerSubs: Map<MyLayer, Subscription> = new Map();
  private positionUpdateSub: Subscription = null;
  circuit: Polyline;

  constructor(
    private widgetService: LayeredMapWidgetService,
    private selectedDevicesService: SelectedDevicesService,
    private layerService: LayerService,
    private inventoryPollingService: InventoryPollingService,
    private positionPollingService: PositionPollingService,
    private eventPollingService: EventPollingService,
    private alarmPollingService: AlarmPollingService
  ) {}

  ngAfterViewInit(): void {
    this.map.invalidateSize();
  }

  onMapReady(map: LMap): void {
    this.map = map;
    if (this.cfg?.device) {
      this.selectedDevicesService
        .getDevices(this.cfg.device)
        .then((devices) => this.draw(this.cfg, devices));
    }
  }

  onResized(): void {
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  private draw(config: ILayeredMapWidgetConfig, devices: IManagedObject[]) {
    const osm = tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: true,
      }
    );

    const layerControl = new Control.Layers().addTo(this.map);
    layerControl.addBaseLayer(osm, "Open Street Map");
    osm.addTo(this.map);

    if (!isEmpty(config.layers)) {
      const layers = this.layerService.createLayers(config.layers, devices);
      for (const layer of layers) {
        layerControl.addOverlay(layer.group, layer.config.name);
        if (layer.active) {
          layer.group.addTo(this.map);
        }
        this.allLayers.push(layer);
      }
    }

    this.map.on("popupopen", (event) => {
      const popup = event.popup;
      const ref: ComponentRef<PopupComponent> = get(popup, "ref");
      ref.instance.onShow();
      this.map.setView(popup.getLatLng(), 13);
    });

    this.map.on("popupclose", (event) => {
      const popup = event.popup;
      const ref: ComponentRef<PopupComponent> = get(popup, "ref");
      ref.instance.onHide();
    });

    const track = this.widgetService.getTrack(config);
    if (track && this.map) {
      const line = polyline(track.coords);
      line.addTo(this.map);
      this.map.fitBounds(line.getBounds());
    }

    this.updateRealtimeSubs(this.allLayers, config);
  }

  private updateRealtimeSubs(
    layers: MyLayer[],
    config: ILayeredMapWidgetConfig
  ): void {
    for (const layer of layers) {
      if (this.layerSubs.has(layer)) {
        this.layerSubs.get(layer).unsubscribe();
        this.layerSubs.delete(layer);
      }
      const cfg = layer.config;
      if (isDeviceFragmentLayerConfig(cfg)) {
        const query = `(bygroupid(${config.device.id}) or id eq '${config.device.id}') and has(c8y_Position) and ${cfg.fragment} eq '${cfg.value}'`;
        const sub = this.inventoryPollingService
          .createPolling$({ query }, layer)
          .subscribe((delta) =>
            this.layerService.updatePollingDelta(delta, layer)
          );
        this.layerSubs.set(layer, sub);
      }

      if (isQueryLayerConfig(layer.config)) {
        if (layer.config.type === "Alarm") {
          const sub = this.alarmPollingService
            .createPolling$(layer)
            .subscribe((delta) =>
              this.layerService.updatePollingDelta(delta, layer)
            );
          this.layerSubs.set(layer, sub);
        } else if (layer.config.type === "Inventory") {
          const sub = this.inventoryPollingService
            .createPolling$(layer.config.filter, layer)
            .subscribe((delta) =>
              this.layerService.updatePollingDelta(delta, layer)
            );
          this.layerSubs.set(layer, sub);
        } else if (layer.config.type === "Event") {
          const sub = this.eventPollingService
            .createPolling$(layer)
            .subscribe((delta) =>
              this.layerService.updatePollingDelta(delta, layer)
            );
          this.layerSubs.set(layer, sub);
        }
      }
    }
    this.createPositionUpdatePolling(layers);
  }

  private createPositionUpdatePolling(layers: MyLayer[]) {
    if (!this.positionUpdateSub) {
      this.positionUpdateSub = this.positionPollingService
        .createPolling$()
        .pipe(filter((updates) => !isEmpty(updates)))
        .subscribe((positionUpdates) =>
          this.onPositionUpdate(layers, positionUpdates)
        );
    }
  }

  private onPositionUpdate(
    layers: MyLayer[],
    positionUpdates: IManagedObject[]
  ): void {
    for (const layer of layers) {
      const matches = positionUpdates.filter((mo) =>
        layer.devices.includes(mo.id)
      );
      if (!isEmpty(matches)) {
        this.layerService.updateManagedObjects(matches, layer);
      }
    }
  }

  ngOnDestroy(): void {
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
    this.positionUpdateSub.unsubscribe();
  }
}
