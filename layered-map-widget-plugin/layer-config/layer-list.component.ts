import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  isDeviceFragmentLayerConfig,
  isQueryLayerConfig,
  LayerConfig,
} from '../layered-map-widget.model';
@Component({
  templateUrl: './layer-list.component.html',
  selector: 'layer-list',
})
export class LayerListComponent {
  @Output() deleteLayer = new EventEmitter<LayerConfig>();
  @Output() editLayer = new EventEmitter<LayerConfig>();
  @Output() editPopover = new EventEmitter<LayerConfig>();

  @Output() activeLayerChange = new EventEmitter<{
    checked: boolean;
    config: LayerConfig;
  }>();

  @Input() layers: LayerConfig[];

  onUserChangedSelection(event: Event, config: LayerConfig): void {
    const checked = (<HTMLInputElement>event.currentTarget).checked;

    // this.activeLayerChange.emit({
    //   checked,
    //   config,
    // });
    config.active = checked;
  }

  onEditLayer(config: LayerConfig): void {
    this.editLayer.emit(config);
  }

  onEditPopover(config: LayerConfig): void {
    this.editPopover.emit(config);
  }

  onDeleteLayer(config: LayerConfig): void {
    this.deleteLayer.emit(config);
  }

  getContent(layer: LayerConfig): string {
    const cfg = layer.config;

    if (isDeviceFragmentLayerConfig(cfg)) {
      return `Devices with ${cfg.fragment}=${cfg.value}`;
    }
    if (isQueryLayerConfig(cfg)) {
      return `${cfg.type} with query ${JSON.stringify(cfg.filter)}`;
    }
    return '';
  }
}
