import { Component } from '@angular/core';
import { ModalLabels, ModalService, Status } from '@c8y/ngx-components';
import { IconSelectorService } from '@c8y/ngx-components/icon-selector';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import {
  BasicLayerConfig,
  DeviceFragmentLayerConfig,
  isDeviceFragmentLayerConfig,
  isQueryLayerConfig,
  isWebMapServiceLayerConfig,
  QueryLayerConfig,
  WebMapServiceLayerConfig,
} from '../layered-map-widget.model';
import { TenantOptionCredentialsService } from '../../layered-map-widget-plugin/service/tenant-option-credentials.service';

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

  protected wmsCredentials = { username: '', password: '' };

  constructor(
    public bsModalRef: BsModalRef,
    private iconSelector: IconSelectorService,
    private modal: ModalService,
    private tenantOptionCredentials: TenantOptionCredentialsService
  ) {}

  setLayer(layer: BasicLayerConfig) {
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
      if (layer.token) {
        this.tenantOptionCredentials.getCredentials(layer.token).then((creds) => {
          this.wmsCredentials = creds;
        });
      }
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

  onWmsURLChange(url?: string) {
    if (url?.length > 0) {
      const params = new URLSearchParams(decodeURI(url));
      if (params.has('layers')) {
        const layers = params.get('layers')?.split(',');
        const existingLayers = (<WebMapServiceLayerConfig>this.layer).wmsLayers;
        for (const layer of layers) {
          if (!existingLayers.find((l) => l.name === layer)) {
            existingLayers.push({ name: layer });
          }
        }
      }
    }
  }

  addWMSLayer() {
    (<WebMapServiceLayerConfig>this.layer).wmsLayers.push({ name: '' });
  }

  removeWMSLayer(index: number) {
    (<WebMapServiceLayerConfig>this.layer).wmsLayers.splice(index, 1);
  }

  clearAllPasswords() {
    this.modal
      .confirm('Clear passwords', 'Are you sure you want to clear all passwords?', Status.DANGER)
      .then((result) => {
        if (result) this.onClearPasswordsConfirmation();
      });
  }

  private onClearPasswordsConfirmation() {
    this.tenantOptionCredentials.clearAllCredentials();
    this.wmsCredentials = { username: '', password: '' };
    delete (<WebMapServiceLayerConfig>this.layer).token;
  }

  // - MODAL section

  // called if cancel is pressed
  onDismiss(): void {
    this.closeSubject.next(undefined);
  }

  // called if save is pressed
  onClose(): void {
    if (
      this.type === 'WebMapServiceLayer' &&
      this.wmsCredentials.username.length &&
      this.wmsCredentials.password.length
    ) {
      const creds = {
        username: this.wmsCredentials.username,
        password: this.wmsCredentials.password,
      };
      this.tenantOptionCredentials.saveCredentials(creds).then((token) => {
        (<WebMapServiceLayerConfig>this.layer).token = token;
        this.closeSubject.next(this.layer as any);
      });
    } else {
      this.closeSubject.next(this.layer as any);
    }
  }
}
