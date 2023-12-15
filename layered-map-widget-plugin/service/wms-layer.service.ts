import { isEmpty } from 'lodash';
import {
  ILayeredMapWidgetConfig,
  LayerConfig,
  WebMapServiceLayerConfig,
  isWebMapServiceLayerConfig,
} from '../../layered-map-widget-plugin/layered-map-widget.model';
import { TenantOptionCredentialsService } from './tenant-option-credentials.service';

import { tileLayer } from 'leaflet';
import { Injectable } from '@angular/core';

@Injectable()
export class WMSLayerService {
  constructor(private tenantOptionCredentials: TenantOptionCredentialsService) {}

  filterWMSLayers(config: ILayeredMapWidgetConfig): LayerConfig<WebMapServiceLayerConfig>[] {
    if (config.layers && !isEmpty(config.layers)) {
      return config.layers.filter((l) =>
        isWebMapServiceLayerConfig(l.config)
      ) as LayerConfig<WebMapServiceLayerConfig>[];
    }
    return [];
  }

  async createWMSLayer(layerConfig: LayerConfig<WebMapServiceLayerConfig>) {
    const cfg = layerConfig.config as WebMapServiceLayerConfig;
    const layers = cfg.wmsLayers.map((l) => l.name).toString();
    const shortUrl = cfg.url.split('?')[0];
    if (cfg.token) {
      await this.login(cfg.url, cfg.token);
    }
    const layer = tileLayer.wms(shortUrl, {
      layers,
      format: 'image/png',
      transparent: true,
    });
    return layer;
  }

  async login(url: string, token: string) {
    const credentials = await this.tenantOptionCredentials.getCredentials(token);
    const { username, password } = credentials;
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    return window.fetch(url, {
      method: 'HEAD',
      headers,
    });
  }
}
