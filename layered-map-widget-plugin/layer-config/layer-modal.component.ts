import { Component } from '@angular/core';
import { ModalLabels } from '@c8y/ngx-components';
import { IconSelectorService } from '@c8y/ngx-components/icon-selector';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import {
  BasicLayerConfig,
  DeviceFragmentLayerConfig,
  isDeviceFragmentLayerConfig,
  isQueryLayerConfig,
  QueryLayerConfig,
} from '../layered-map-widget.model';

@Component({ templateUrl: './layer-modal.component.html' })
export class LayerModalComponent {
  title = 'Create layer';
  closeSubject: Subject<BasicLayerConfig> = new Subject();
  labels: ModalLabels = { ok: 'Create', cancel: 'Cancel' };
  layer: BasicLayerConfig = { name: '', color: '', icon: '' };

  type: 'DeviceFragmentLayerConfig' | 'QueryLayerConfig' | 'Unset' = 'Unset';
  queryType: 'Alarm' | 'Inventory' | 'Event';

  constructor(public bsModalRef: BsModalRef, private iconSelector: IconSelectorService) {}

  setLayer(layer: DeviceFragmentLayerConfig | QueryLayerConfig) {
    this.layer = layer;
    this.title = 'Edit layer';
    this.labels.ok = 'Update';
    if (isDeviceFragmentLayerConfig(layer)) {
      this.type = 'DeviceFragmentLayerConfig';
    } else if (isQueryLayerConfig(layer)) {
      this.type = 'QueryLayerConfig';
      this.queryType = layer.type;
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
        ...{ fragment: '', value: '' },
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
    }
  }

  // - MODAL section

  // called if cancel is pressed
  onDismiss(): void {
    this.closeSubject.next(null);
  }

  // called if save is pressed
  onClose(): void {
    this.closeSubject.next(this.layer);
  }
}
