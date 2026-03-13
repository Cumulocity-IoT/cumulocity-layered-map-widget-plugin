import { Component } from '@angular/core';
import { CoreModule, ModalLabels, ModalService, Status } from '@c8y/ngx-components';
import { IconSelectorService } from '@c8y/ngx-components/icon-selector';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { QueryFormsTabComponent } from 'shared';
import {
  BasicLayerConfig,
  isQueryLayerConfig,
  isWebMapServiceLayerConfig,
  QueryLayerConfig,
  WebMapServiceLayerConfig,
} from '../layered-map-widget.model';
import { TenantOptionCredentialsService } from '../service/tenant-option-credentials.service';

@Component({
  templateUrl: './layer-modal.component.html',
  standalone: true,
  imports: [CoreModule, QueryFormsTabComponent],
})
export class LayerModalComponent {
  title = 'Create layer';
  closeSubject: Subject<QueryLayerConfig | WebMapServiceLayerConfig | undefined> = new Subject();

  labels: ModalLabels = { ok: 'Create', cancel: 'Cancel' };
  layer: Partial<QueryLayerConfig | WebMapServiceLayerConfig> = {
    name: '',
    color: '',
    icon: '',
    enablePolling: true,
    pollingInterval: 60,
  };

  type: 'QueryLayerConfig' | 'Unset' | 'WebMapServiceLayer' = 'Unset';
  queryType: 'Alarm' | 'Inventory' | 'Event' = 'Inventory';

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

    if (isQueryLayerConfig(layer)) {
      this.type = 'QueryLayerConfig';
      this.queryType = layer.type;
    } else if (isWebMapServiceLayerConfig(layer)) {
      this.type = 'WebMapServiceLayer';

      if (layer.token) {
        void this.tenantOptionCredentials.getCredentials(layer.token).then((creds) => {
          if (creds) this.wmsCredentials = creds;
        });
      }
    }
  }

  async openIconModal() {
    const icon = await this.iconSelector.selectIcon({ currentSelection: this.layer.icon });

    if (icon) {
      this.layer.icon = icon;
    }
  }

  changeType(type: string) {
    const { name, color, icon, pollingInterval, enablePolling } = this.layer;

    if (type === 'QueryLayerConfig') {
      this.layer = {
        name,
        color,
        icon,
        pollingInterval,
        enablePolling,
        ...{ type: 'Inventory', filter: {} },
      } as QueryLayerConfig;
      this.type = 'QueryLayerConfig';
      this.queryType = 'Inventory';
    } else if (type === 'WebMapServiceLayer') {
      this.layer = {
        name,
        color,
        icon,
        pollingInterval,
        enablePolling,
        ...{ type: 'ExternalGIS', url: '', wmsLayers: [{ name: '' }] },
      } as WebMapServiceLayerConfig;
      this.type = 'WebMapServiceLayer';
    }
  }

  onQueryTypeChange(type: 'Alarm' | 'Inventory' | 'Event') {
    const { name, color, icon, pollingInterval, enablePolling } = this.layer;

    if (type === 'Alarm') {
      this.layer = {
        name,
        color,
        icon,
        pollingInterval,
        enablePolling,
        ...{ type: 'Alarm', filter: {} },
      } as QueryLayerConfig;
      this.type = 'QueryLayerConfig';
      this.queryType = 'Alarm';
    } else if (type === 'Event') {
      this.layer = {
        name,
        color,
        icon,
        pollingInterval,
        enablePolling,
        ...{ type: 'Event', filter: {} },
      } as QueryLayerConfig;
      this.type = 'QueryLayerConfig';
      this.queryType = 'Event';
    } else if (type === 'Inventory') {
      this.layer = {
        name,
        color,
        icon,
        pollingInterval,
        enablePolling,
        ...{ type: 'Inventory', filter: {} },
      } as QueryLayerConfig;
      this.type = 'QueryLayerConfig';
      this.queryType = 'Inventory';
    }
  }

  onWmsURLChange(url?: string) {
    if (url && url.length) {
      const params = new URLSearchParams(decodeURI(url));

      if (params.has('layers')) {
        const layers = params.get('layers')?.split(',') ?? [];
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
    void this.modal
      .confirm('Clear passwords', 'Are you sure you want to clear all passwords?', Status.DANGER)
      .then((result) => {
        if (result) this.onClearPasswordsConfirmation();
      });
  }

  private onClearPasswordsConfirmation() {
    void this.tenantOptionCredentials.clearAllCredentials();
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

      void this.tenantOptionCredentials.saveCredentials(creds).then((token) => {
        (<WebMapServiceLayerConfig>this.layer).token = token;
        this.closeSubject.next(this.layer as QueryLayerConfig | WebMapServiceLayerConfig);
      });
    } else {
      this.closeSubject.next(this.layer as QueryLayerConfig | WebMapServiceLayerConfig);
    }
  }
}
