import { isEmpty } from 'lodash';
import {
  ILayeredMapWidgetConfig,
  LayerConfig,
  WebMapServiceLayerConfig,
  isWebMapServiceLayerConfig,
} from '../../layered-map-widget-plugin/layered-map-widget.model';

import { Injectable } from '@angular/core';
import 'cumulocity-leaflet-wms-header';
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

  createWMSLayer(layerConfig: LayerConfig<WebMapServiceLayerConfig>) {
    const cfg = layerConfig.config as WebMapServiceLayerConfig;
    const layers = cfg.wmsLayers.map((l) => l.name).toString();
    const shortUrl = cfg.url.includes('?') ? cfg.url.split('?')[0] : cfg.url;

    if (cfg.token) {
      const url = `service/c2c-integration/api/geoserver-proxy`;
      const layer = TileLayer.c8yWMSHeader(
        url,
        {
          layers,
          format: shortUrl,
          transparent: true,
          version: cfg.token,
        },
        {
          method: 'GET',
          headers: {
            'Content-Type': 'image/png',
          },
        },
        this.fetch
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
}
