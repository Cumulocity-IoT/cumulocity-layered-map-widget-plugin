import {
  DynamicWidgetDefinition,
  hookWidget,
} from '@c8y/ngx-components';
import { assetPaths } from '../assets/assets';

export const samplePluginWidgetDefinition = {
  id: 'iot.cumulocity.layered.map.widget',
  label: 'Layered Map',
  description:
    'Displays a map with position markers for selected devices. Support for configuration of additional layers and custom markers.',
  loadComponent: () => import('./widget/layered-map-widget.component').then(m => m.LayeredMapWidgetComponent),
  loadConfigComponent: () => import('./widget/layered-map-widget-config.component').then(m => m.LayeredMapWidgetConfig),
  previewImage: assetPaths.previewImage,
  data: {
    settings: {
      noNewWidgets: false,
      ng1: {
        options: {
          noDeviceTarget: true,
          groupsSelectable: false,
        },
      },
    },
  },
} satisfies DynamicWidgetDefinition;

export const layeredMapWidgetProvider = [hookWidget(samplePluginWidgetDefinition)];
