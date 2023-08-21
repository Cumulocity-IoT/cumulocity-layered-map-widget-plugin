import { AlertService, DynamicComponent, OnBeforeSave } from '@c8y/ngx-components';
import { IManagedObject } from '@c8y/client';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { clone, cloneDeep, has, isEmpty } from 'lodash';
import { EventLineCreatorModalComponent } from './event-line-creator/event-line-creator-modal.component';
import { DrawLineCreatorModalComponent } from './draw-line-creator/draw-line-creator-modal.component';
import {
  ILayeredMapWidgetConfig,
  isDeviceFragmentLayerConfig,
  isQueryLayerConfig,
  ITrack,
  LayerConfig,
} from './layered-map-widget.model';
import { LayerModalComponent } from './layer-config/layer-modal.component';
import { PopoverModalComponent } from './popover-config/popover-modal.component';

export type WidgetConfigMode = 'CREATE' | 'UPDATE';

@Component({
  templateUrl: './layered-map-widget-config.component.html',
})
export class LayeredMapWidgetConfig implements OnInit, DynamicComponent, OnBeforeSave {
  @Input() config: ILayeredMapWidgetConfig = {
    layers: [],
  };
  ng1FormRef?: any;
  items: IManagedObject[] = [];
  mode: WidgetConfigMode;

  constructor(private bsModalService: BsModalService, private alert: AlertService) {}

  ngOnInit(): void {
    this.mode = this.config.saved ? 'UPDATE' : 'CREATE';

    if (!has(this.config, 'layers')) {
      this.config.layers = [];
    }
  }

  // onSubDevicesChanged(devices: IManagedObject[]): void {
  //   this.config.devices = devices;
  // }

  async openLayerModal(layer?: LayerConfig) {
    const modalRef = this.bsModalService.show(LayerModalComponent, {});

    const close = modalRef.content?.closeSubject.pipe(take(1)).toPromise();
    if (!layer) {
      // create mode
      const created = await close;
      if (!!created && (isDeviceFragmentLayerConfig(created) || isQueryLayerConfig(created))) {
        this.config.layers?.push({ config: created, active: true });
        this.config.layers = [...this.config.layers];
      }
    } else {
      // edit mode
      const original = cloneDeep(layer.config);
      modalRef.content?.setLayer(layer.config);
      const updated = await close;
      if (!updated) {
        layer.config = original;
      }
    }
  }

  async openPopoverModal(layer: LayerConfig) {
    const modalRef = this.bsModalService.show(PopoverModalComponent, {});
    if (layer.config.popoverConfig) {
      modalRef.content?.setConfig(clone(layer.config.popoverConfig));
    }

    const close = modalRef.content?.closeSubject.pipe(take(1)).toPromise();
    const popoverConfig = await close;
    if (popoverConfig) {
      layer.config.popoverConfig = popoverConfig;
    }
  }

  editLayer(layer: LayerConfig) {
    this.openLayerModal(layer);
  }

  editPopover(layer: LayerConfig) {
    this.openPopoverModal(layer);
  }

  deleteLayer(layer: LayerConfig) {
    this.config.layers = this.config.layers.filter((l) => l !== layer);
  }

  async openEventTrackCreatorModal() {
    const modalRef = this.bsModalService.show(EventLineCreatorModalComponent, {});
    modalRef.content!.items = clone(this.config.devices ?? []);
    const openExportTemplateModal = modalRef.content?.closeSubject.pipe(take(1)).toPromise();
    const track = await openExportTemplateModal;
    if (track) {
      this.addTrackToConfig(track);
    }
  }

  async openDrawTrackCreatorModal() {
    const modalRef = this.bsModalService.show(DrawLineCreatorModalComponent, {
      class: 'modal-lg',
    });
    const openExportTemplateModal = modalRef.content!.closeSubject.pipe(take(1)).toPromise();
    const track = await openExportTemplateModal;
    if (track) {
      this.addTrackToConfig(track);
    }
  }

  private addTrackToConfig(track: ITrack | null): void {
    if (!track) {
      return;
    }
    if (!this.config.tracks) {
      this.config.tracks = [];
    }
    this.config.tracks.push(track);
  }

  deleteTrack(track: ITrack): void {
    this.config.tracks = this.config.tracks?.filter((t) => t.name !== track.name);
    if (this.config.selectedTrack === track.name) {
      this.config.selectedTrack = undefined;
    }
  }

  userChangedSelection(event: { checked: boolean; track: ITrack }): void {
    const { checked, track } = event;
    if (checked) {
      // check and select a new element (automatically unchecks other ones)
      this.config.selectedTrack = track.name;
    } else if (track.name === this.config.selectedTrack) {
      this.config.selectedTrack = undefined;
    }
  }

  async onBeforeSave(config?: ILayeredMapWidgetConfig): Promise<boolean> {
    if (!config) {
      return false;
    }

    if (config.layers.find((l) => isDeviceFragmentLayerConfig(l)) && isEmpty(this.config.device)) {
      this.alert.danger('Device Fragment layer requires you to select a group or device!');
      return false;
    }

    config.saved = true;
    return true;
  }
}
