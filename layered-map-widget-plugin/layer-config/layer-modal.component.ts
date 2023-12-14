import { Component } from '@angular/core';
import { ModalLabels } from '@c8y/ngx-components';
import { IconSelectorService } from '@c8y/ngx-components/icon-selector';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import {
  DeviceFragmentLayerConfig,
  isDeviceFragmentLayerConfig,
  isQueryLayerConfig,
  isWebMapServiceLayerConfig,
  QueryLayerConfig,
  WebMapServiceLayerConfig,
} from '../layered-map-widget.model';

@Component({ templateUrl: './layer-modal.component.html' })
export class LayerModalComponent {
  title = 'Create layer';
  closeSubject: Subject<DeviceFragmentLayerConfig | QueryLayerConfig | WebMapServiceLayerConfig> =
    new Subject();
  labels: ModalLabels = { ok: 'Create', cancel: 'Cancel' };
  layer: Partial<DeviceFragmentLayerConfig | QueryLayerConfig | WebMapServiceLayerConfig> = {
    name: '',
    color: '',
    icon: '',
  };

  type: 'DeviceFragmentLayerConfig' | 'QueryLayerConfig' | 'Unset' | 'WebMapServiceLayer' = 'Unset';
  queryType: 'Alarm' | 'Inventory' | 'Event';

  constructor(public bsModalRef: BsModalRef, private iconSelector: IconSelectorService) {}

  setLayer(layer: DeviceFragmentLayerConfig | QueryLayerConfig | WebMapServiceLayerConfig) {
    this.layer = layer;
    this.title = 'Edit layer';
    this.labels = { ok: 'Update', cancel: 'Cancel' };
    if (isDeviceFragmentLayerConfig(layer)) {
      this.type = 'DeviceFragmentLayerConfig';
    } else if (isQueryLayerConfig(layer)) {
      this.type = 'QueryLayerConfig';
      this.queryType = layer.type;
    } else if (isWebMapServiceLayerConfig(layer)) {
      this.type = 'WebMapServiceLayer';
    }
  }

  async openIconModal() {
    const icon = await this.iconSelector.selectIcon();
    if (icon) {
      this.layer.icon = icon;
    }
  }

  changeType(type: string) {
    const { name, color, icon } = this.layer;
    if (type === 'DeviceFragmentLayerConfig') {
      this.layer = {
        name,
        color,
        icon,
        ...{ fragment: '', value: '', device: { id: '', name: '' } },
      } as DeviceFragmentLayerConfig;
      this.type = type;
    } else if (type === 'AlarmQueryLayerConfig') {
      this.layer = {
        name,
        color,
        icon,
        ...{ type: 'Alarm', filter: {} },
      } as QueryLayerConfig;
      this.type = 'QueryLayerConfig';
      this.queryType = 'Alarm';
    } else if (type === 'EventQueryLayerConfig') {
      this.layer = {
        name,
        color,
        icon,
        ...{ type: 'Event', filter: {} },
      } as QueryLayerConfig;
      this.type = 'QueryLayerConfig';
      this.queryType = 'Event';
    } else if (type === 'InventoryQueryLayerConfig') {
      this.layer = {
        name,
        color,
        icon,
        ...{ type: 'Inventory', filter: {} },
      } as QueryLayerConfig;
      this.type = 'QueryLayerConfig';
      this.queryType = 'Inventory';
    } else if (type === 'WebMapServiceLayer') {
      this.layer = {
        name,
        color,
        icon,
        ...{ type: 'ExternalGIS', url: '', wmsLayers: [{ name: '' }] },
      } as WebMapServiceLayerConfig;
      this.type = 'WebMapServiceLayer';
    }
  }

  addWMSLayer() {
    (<WebMapServiceLayerConfig>this.layer).wmsLayers.push({ name: '' });
  }

  removeWMSLayer(index: number) {
    (<WebMapServiceLayerConfig>this.layer).wmsLayers.splice(index, 1);
  }

  // - MODAL section

  // called if cancel is pressed
  onDismiss(): void {
    this.closeSubject.next(undefined);
  }

  // called if save is pressed
  onClose(): void {
    this.closeSubject.next(this.layer as any);
  }
}
