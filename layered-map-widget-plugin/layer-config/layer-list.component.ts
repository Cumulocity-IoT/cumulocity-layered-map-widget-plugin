import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BasicLayerConfig,
  isDeviceFragmentLayerConfig,
  isQueryLayerConfig,
  isWebMapServiceLayerConfig,
  LayerConfig,
} from '../layered-map-widget.model';
@Component({
  templateUrl: './layer-list.component.html',
  selector: 'layer-list',
})
export class LayerListComponent {
  @Output() deleteLayer = new EventEmitter<LayerConfig<BasicLayerConfig>>();
  @Output() editLayer = new EventEmitter<LayerConfig<BasicLayerConfig>>();
  @Output() editPopover = new EventEmitter<LayerConfig<BasicLayerConfig>>();

  @Output() activeLayerChange = new EventEmitter<{
    checked: boolean;
    config: LayerConfig<BasicLayerConfig>;
  }>();

  @Input() layers: LayerConfig<BasicLayerConfig>[];

  onUserChangedSelection(event: Event, config: LayerConfig<BasicLayerConfig>): void {
    const checked = (<HTMLInputElement>event.currentTarget).checked;

    // this.activeLayerChange.emit({
    //   checked,
    //   config,
    // });
    config.active = checked;
  }

  onEditLayer(config: LayerConfig<BasicLayerConfig>): void {
    this.editLayer.emit(config);
  }

  onEditPopover(config: LayerConfig<BasicLayerConfig>): void {
    this.editPopover.emit(config);
  }

  onDeleteLayer(config: LayerConfig<BasicLayerConfig>): void {
    this.deleteLayer.emit(config);
  }

  getContent(layer: LayerConfig<BasicLayerConfig>): string {
    const cfg = layer.config;

    if (isDeviceFragmentLayerConfig(cfg)) {
      return `Devices with ${cfg.fragment}=${cfg.value}`;
    }
    if (isQueryLayerConfig(cfg)) {
      return `${cfg.type} with query ${JSON.stringify(cfg.filter)}`;
    }

    if (isWebMapServiceLayerConfig(cfg)) {
      return `WMS Server: ${cfg.url}`;
    }

    return '';
  }
}
