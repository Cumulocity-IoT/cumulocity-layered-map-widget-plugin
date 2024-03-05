import { isEmpty } from 'lodash';
import {
  ILayeredMapWidgetConfig,
  LayerConfig,
  WebMapServiceLayerConfig,
  isWebMapServiceLayerConfig,
} from '../../layered-map-widget-plugin/layered-map-widget.model';

import { Injectable } from '@angular/core';
import 'leaflet-wms-header';
import { TileLayer, tileLayer } from 'leaflet';
import { FetchClient } from '@c8y/client';

@Injectable()
export class WMSLayerService {
  constructor(private fetch: FetchClient) {}

  filterWMSLayers(config: ILayeredMapWidgetConfig): LayerConfig<WebMapServiceLayerConfig>[] {
    if (config.layers && !isEmpty(config.layers)) {
      return config.layers.filter((l) =>
        isWebMapServiceLayerConfig(l.config)
      ) as LayerConfig<WebMapServiceLayerConfig>[];
    }
    return [];
  }

  // async createWMSLayer(layerConfig: LayerConfig<WebMapServiceLayerConfig>) {
  //   const cfg = layerConfig.config as WebMapServiceLayerConfig;
  //   const layers = cfg.wmsLayers.map((l) => l.name).toString();
  //   const shortUrl = cfg.url.split('?')[0];
  //   if (cfg.token) {
  //     const headers = await this.getLoginHeaders(cfg.token);
  //     const layer = TileLayer.wmsHeader(
  //       shortUrl,
  //       {
  //         layers,
  //         format: 'image/png',
  //         transparent: true,
  //         crossOrigin: 'anonymous',
  //         referrerPolicy: 'unsafe-url',
  //       },
  //       headers,
  //       null,
  //       null
  //     );
  //     return layer;
  //   } else {
  //     const layer = tileLayer.wms(shortUrl, {
  //       layers,
  //       format: 'image/png',
  //       transparent: true,
  //     });
  //     return layer;
  //   }
  // }

  createWMSLayer(layerConfig: LayerConfig<WebMapServiceLayerConfig>) {
    const cfg = layerConfig.config as WebMapServiceLayerConfig;
    const layers = cfg.wmsLayers.map((l) => l.name).toString();
    const shortUrl = cfg.url.includes('?') ? cfg.url.split('?')[0] : cfg.url;

    if (cfg.token) {
      const url = `${this.fetch.baseUrl}service/c2c-integration/api/geoserver-proxy`;
      const layer = TileLayer.wmsHeader(
        url,
        {
          layers,
          format: shortUrl,
          transparent: true,
          version: cfg.token,
        },
        [this.getXSRFHeader()].filter(Boolean),
        null,
        null
      );
      return layer;
    } else {
      const layer = tileLayer.wms(shortUrl, {
        layers,
        format: 'image/png',
        transparent: true,
      });
      return layer;
    }
  }

  private getXSRFHeader() {
    let token = '';
    try {
      const name = 'XSRF-TOKEN';
      const value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      token = value ? value.pop() : undefined;
    } catch (ex) {
      return undefined;
    }
    return token ? { header: 'X-XSRF-TOKEN', value: token } : undefined;
  }

  // async getLoginHeaders(token: string) {
  //   const credentials = await this.tenantOptionCredentials.getCredentials(token);
  //   const { username, password } = credentials;
  //   return [
  //     { header: 'Authorization', value: 'Basic ' + btoa(username + ':' + password) },
  //     { header: 'content-type', value: 'text/plain' },
  //   ];
  // }
}
