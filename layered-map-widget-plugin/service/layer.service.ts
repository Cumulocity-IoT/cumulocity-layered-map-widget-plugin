import { Injectable } from '@angular/core';
import { IManagedObject } from '@c8y/client';
import { FeatureGroup, LatLng, latLng, Marker } from 'leaflet';
import { flatten, get, has, isEmpty, set } from 'lodash';
import {
  BasicLayerConfig,
  DeviceFragmentLayerConfig,
  isDeviceFragmentLayerConfig,
  isQueryLayerConfig,
  isWebMapServiceLayerConfig,
  LayerConfig,
  MyLayer,
  PollingDelta,
} from '../layered-map-widget.model';
import { MarkerIconService } from './marker-icon.service';
import { PopUpService } from './popup.service';
import { QueryLayerService } from './query-layer.service';
import { SelectedDevicesService } from './selected-devices.service';

@Injectable({ providedIn: 'root' })
export class LayerService {
  constructor(
    private popupService: PopUpService,
    private markerIconService: MarkerIconService,
    private queryLayerService: QueryLayerService,
    private selectedDevicesService: SelectedDevicesService
  ) {}

  createLayers(configs: LayerConfig<BasicLayerConfig>[]) {
    return Promise.all(configs.map((cfg) => this.createLayer(cfg)));
  }

  async createLayer(setup: LayerConfig<BasicLayerConfig>) {
    const layer = Object.assign(new MyLayer(), setup);

    if (isQueryLayerConfig(setup.config)) {
      const config = setup.config;
      if (config.type === 'Alarm') {
        layer.initialLoad = this.queryLayerService
          .fetchByAlarmQuery(config.filter)
          .then((devices) => {
            layer.devices = devices.map((d) => d.id);
            devices.forEach((d) => {
              this.updatePosition(layer, d.id, d.c8y_Position);
              this.updateMarkerIcon(d.id, layer, d.c8y_ActiveAlarmsStatus);
            });
          });
      } else if (config.type === 'Inventory') {
        layer.initialLoad = this.queryLayerService
          .fetchByInventoryQuery(config.filter)
          .then((devices) => {
            layer.devices = devices.map((d) => d.id);
            devices.forEach((d) => this.updatePosition(layer, d.id, d.c8y_Position));
          });
      } else if (config.type === 'Event') {
        layer.initialLoad = this.queryLayerService
          .fetchByEventQuery(config.filter)
          .then((devices) => {
            layer.devices = devices.map((d) => d.id);
            devices.forEach((d) => this.updatePosition(layer, d.id, d.c8y_Position));
          });
      }
    } else if (isDeviceFragmentLayerConfig(setup.config)) {
      const config = setup.config as DeviceFragmentLayerConfig;
      const devices = await this.selectedDevicesService.getDevices(config.device);
      const matches = this.getMatches(setup.config, devices || []);
      // assign devices mathcing the layer criteria
      layer.devices = matches.map((d) => d.id);
      // create coordinate cache for devices having the c8y_Position fragment
      matches
        .filter((d) => has(d, 'c8y_Position') && !isEmpty(d.c8y_Position))
        .forEach((d) => layer.coordinates.set(d.id, latLng(d.c8y_Position)));

      this.createLayerGroup(layer);
      layer.initialLoad = Promise.resolve();
    } else if (isWebMapServiceLayerConfig(setup.config)) {
      layer.config.enablePolling = 'false';
      layer.config.icon = 'globe1';
      layer.initialLoad = Promise.resolve();
    }

    return layer;
  }
  updateMarkerIcon(
    deviceId: string,
    layer: MyLayer & LayerConfig<BasicLayerConfig>,
    status: {
      critical?: number;
      major?: number;
      minor?: number;
      warning?: number;
    }
  ) {
    let classNames = '';
    if (status.critical) {
      classNames = `status critical`;
    } else if (status.major) {
      classNames = 'status major';
    } else if (status.minor) {
      classNames = 'status minor';
    } else {
      classNames = 'status warning';
    }

    const marker = layer.markerCache.get(deviceId)!;
    const icon = this.markerIconService.getIcon(layer.config.icon, classNames);
    marker.setIcon(icon);
  }

  updateManagedObjects(mos: IManagedObject[], layer: MyLayer): void {
    for (const mo of mos) {
      this.updatePosition(layer, mo.id, mo.c8y_Position);
      if (isQueryLayerConfig(layer.config) && layer.config.type === 'Alarm') {
        this.updateMarkerIcon(mo.id, layer, mo.c8y_ActiveAlarmsStatus);
      }
      const marker = this.updatePosition(layer, mo.id, mo.c8y_Position);
      if (marker) {
        this.popupService.getPopupComponent(marker).onUpdate(mo);
      }
    }
  }

  updatePollingDelta(delta: PollingDelta, layer: MyLayer): void {
    for (const d of delta.add) {
      layer.devices.push(d.id);
      if (has(d, 'c8y_Position') && !isEmpty(d.c8y_Position)) {
        this.updatePosition(layer, d.id, d.c8y_Position);
        if (isQueryLayerConfig(layer.config) && layer.config.type === 'Alarm') {
          this.updateMarkerIcon(d.id, layer, d.c8y_ActiveAlarmsStatus);
        }
      }
    }

    for (const toDeleteId of delta.remove) {
      layer.devices = layer.devices.filter((id) => id !== toDeleteId);
      if (layer.coordinates.has(toDeleteId)) {
        layer.coordinates.delete(toDeleteId);
      }
      if (layer.markerCache.has(toDeleteId)) {
        const markerToDelete = layer.markerCache.get(toDeleteId)!;
        layer.group.removeLayer(markerToDelete);
        layer.markerCache.delete(toDeleteId);
      }
    }
  }

  createLayerGroup(layer: MyLayer): void {
    const markers = [...layer.coordinates.keys()].map((key) => {
      const coord = layer.coordinates.get(key)!;
      const marker = this.createMarker(key, coord, layer);
      layer.markerCache.set(key, marker);
      return marker;
    });

    layer.group = new FeatureGroup(markers);
  }

  private createMarker(deviceId: string, coordinate: LatLng, layer: MyLayer) {
    const color = layer.config.color?.length ? layer.config.color : '#fff';
    const icon = this.markerIconService.getIcon(layer.config.icon, '', color);
    const popup = this.popupService.getPopup({ deviceId, layer });

    const marker = new Marker(coordinate, {
      icon,
    });
    marker.bindPopup(popup.html, { offset: [0, -24] });
    set(marker.getPopup(), 'ref', popup.ref);
    return marker;
  }

  private getMatches(c: DeviceFragmentLayerConfig, devices: IManagedObject[]) {
    if (isDeviceFragmentLayerConfig(c)) {
      return devices.filter((d) => has(d, c.fragment) && get(d, c.fragment) === c.value);
    }

    return devices;
  }

  private updatePosition(layer: MyLayer, id: string, position: any): Marker | null {
    let marker: Marker<any> = null;
    if (!position) {
      if (layer.coordinates.has(id)) {
        layer.coordinates.delete(id);
        layer.markerCache.delete(id);
      }
      return marker;
    }
    // we haven't had any position yet
    if (!layer.coordinates.has(id)) {
      const coordinate = latLng(position);
      layer.coordinates.set(id, coordinate);
      marker = this.createMarker(id, coordinate, layer);
      layer.markerCache.set(id, marker);
      layer.group.addLayer(marker);
    } else {
      const oldCoord = layer.coordinates.get(id)!;
      const newCoord = latLng(position);
      marker = layer.markerCache.get(id)!;
      if (oldCoord.distanceTo(newCoord) > 0) {
        layer.coordinates.set(id, newCoord);
        marker.setLatLng(newCoord);
      }
    }
    return marker;
  }

  extractMinMaxBounds(allLayers: MyLayer[]) {
    const markers = flatten(allLayers.map((l) => [...l.markerCache.values()]));
    return new FeatureGroup(markers).getBounds();
  }
}
