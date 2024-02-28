import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule, CommonModule, ModalModule, hookComponent } from '@c8y/ngx-components';

import { ContextWidgetConfig } from '@c8y/ngx-components/context-dashboard';
import { LayeredMapWidgetConfig } from './layered-map-widget-config.component';
import { LayeredMapWidgetComponent } from './layered-map-widget.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SubDeviceResolverComponent } from './sub-devices-selector/sub-device-resolver.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule as BsModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { EventLineCreatorModalComponent } from './event-line-creator/event-line-creator-modal.component';
import { TrackListComponent } from './track-list/track-list.component';
import { DrawLineCreatorModalComponent } from './draw-line-creator/draw-line-creator-modal.component';
import { PopupComponent } from './popup/popup.component';
import { LayerModalComponent } from './layer-config/layer-modal.component';
import { LayerListComponent } from './layer-config/layer-list.component';
import { AlarmQueryFormComponent } from './layer-config/query-forms/alarm-query-form-component';
import { DynamicQueryFormComponent } from './layer-config/query-forms/dynamic-query-form.component';
import { EventQueryFormComponent } from './layer-config/query-forms/event-query-form.component';
import { InventoryQueryFormComponent } from './layer-config/query-forms/inventory-query-form.component';
import { AlarmDisplayComponent } from './popup/alarm-display/alarm-display.component';
import { PopoverModalComponent } from './popover-config/popover-modal.component';
import { JsonEditorComponent } from './popover-config/editor/jsoneditor.component';
import { ActionIconPipe } from './popup/action-icon.pipe';
import { AssetSelectorModule } from '@c8y/ngx-components/assets-navigator';
import { CenterMapModalComponent } from './center-map/center-map-modal.component';
import { StringToBoolPipe } from './pipes/string-to-bool.pipe';
import { IconSelectorModule } from '@c8y/ngx-components/icon-selector';

const BOOSTRAP_MODULES = [
  BsModalModule,
  BsDatepickerModule.forRoot(),
  TimepickerModule.forRoot(),
  CollapseModule.forRoot(),
  TooltipModule,
];
@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    LeafletModule,
    ...BOOSTRAP_MODULES,
    ModalModule,
    IconSelectorModule,
    AssetSelectorModule,
  ],
  declarations: [
    StringToBoolPipe,
    LayeredMapWidgetConfig,
    LayeredMapWidgetComponent,
    SubDeviceResolverComponent,
    EventLineCreatorModalComponent,
    DrawLineCreatorModalComponent,
    LayerModalComponent,
    CenterMapModalComponent,
    PopoverModalComponent,
    JsonEditorComponent,
    LayerListComponent,
    TrackListComponent,
    DynamicQueryFormComponent,
    AlarmQueryFormComponent,
    EventQueryFormComponent,
    InventoryQueryFormComponent,
    PopupComponent,
    ActionIconPipe,
    AlarmDisplayComponent,
  ],
  entryComponents: [
    LayeredMapWidgetConfig,
    LayeredMapWidgetComponent,
    EventLineCreatorModalComponent,
    DrawLineCreatorModalComponent,
    PopoverModalComponent,
    TrackListComponent,
    PopupComponent,
  ],
  providers: [
    BsModalRef,
    hookComponent({
      id: 'iot.cumulocity.layered.map.widget',
      label: 'Layered Map',
      description:
        'Displays a map with position markers for selected devices. Support for configuration of additional layers and custom markers.',
      component: LayeredMapWidgetComponent,
      configComponent: LayeredMapWidgetConfig,
      // comment this if you want to test the widget
      previewImage: require('./previewImage.png'),
      data: {
        settings: {
          noNewWidgets: false, // Set this to true, to don't allow adding new widgets.
          ng1: {
            options: {
              noDeviceTarget: true, // Set this to true to hide the device selector.
              groupsSelectable: false, // Set this, if not only devices should be selectable.
            },
          },
        },
      } as ContextWidgetConfig,
    }),
  ],
})
export class LayeredMapWidgetModule {}
