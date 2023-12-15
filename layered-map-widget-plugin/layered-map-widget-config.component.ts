import { DynamicComponent, OnBeforeSave } from '@c8y/ngx-components';
import { IManagedObject } from '@c8y/client';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { clone, cloneDeep, has } from 'lodash';
import { EventLineCreatorModalComponent } from './event-line-creator/event-line-creator-modal.component';
import { DrawLineCreatorModalComponent } from './draw-line-creator/draw-line-creator-modal.component';
import {
  BasicLayerConfig,
  ILayeredMapWidgetConfig,
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

  constructor(private bsModalService: BsModalService) {}

  ngOnInit(): void {
    this.mode = this.config.saved ? 'UPDATE' : 'CREATE';

    if (!has(this.config, 'layers')) {
      this.config.layers = [];
    }

    if (!has(this.config, 'positionPolling')) {
      this.config.positionPolling = {
        enabled: true,
        interval: 3,
      };
    }
  }

  // togglePositionPolling() {
  //   this.config.positionPolling.enabled = !this.config.positionPolling.enabled;
  // }

  // onSubDevicesChanged(devices: IManagedObject[]): void {
  //   this.config.devices = devices;
  // }

  async openLayerModal(layer?: LayerConfig<BasicLayerConfig>) {
    const modalRef = this.bsModalService.show(LayerModalComponent, {});

    const close = modalRef.content?.closeSubject.pipe(take(1)).toPromise();
    if (!layer) {
      // create mode
      const created = await close;
      if (!!created) {
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

  async openPopoverModal(layer: LayerConfig<BasicLayerConfig>) {
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

  editLayer(layer: LayerConfig<BasicLayerConfig>) {
    this.openLayerModal(layer);
  }

  editPopover(layer: LayerConfig<BasicLayerConfig>) {
    this.openPopoverModal(layer);
  }

  deleteLayer(layer: LayerConfig<BasicLayerConfig>) {
    this.config.layers = this.config.layers.filter((l) => l !== layer);
  }

  async openEventTrackCreatorModal() {
    const modalRef = this.bsModalService.show(EventLineCreatorModalComponent, {});
    modalRef.content!.items = clone(this.config.devices ?? []); // TODO: remove this and add device selection in event modal
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

    config.saved = true;
    return true;
  }
}
