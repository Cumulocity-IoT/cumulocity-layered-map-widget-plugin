import { Injectable } from '@angular/core';
import { FetchClient, IFetchOptions } from '@c8y/client';

import { isEmpty } from 'lodash';
import * as L from 'leaflet';

import { ILayeredMapWidgetConfig, LayerConfig, WebMapServiceLayerConfig, isWebMapServiceLayerConfig } from '../layered-map-widget.model';

@Injectable()
export class WMSLayerService {
  constructor(private fetch: FetchClient) {}

  filterWMSLayers(config: ILayeredMapWidgetConfig): LayerConfig<WebMapServiceLayerConfig>[] {
    if (config.layers && !isEmpty(config.layers)) {
      return config.layers.filter((l) => isWebMapServiceLayerConfig(l.config)) as LayerConfig<WebMapServiceLayerConfig>[];
    }
    return [];
  }

  createWMSLayer(layerConfig: LayerConfig<WebMapServiceLayerConfig>, leaf: typeof L) {
    const cfg = layerConfig.config as WebMapServiceLayerConfig;
    const layers = cfg.wmsLayers.map((l) => l.name).toString();
    const shortUrl = cfg.url.includes('?') ? cfg.url.split('?')[0] : cfg.url;

    if (cfg.token) {
      const url = `service/c2c-integration/api/geoserver-proxy`;
      const layer = leaf.tileLayer.wms(url, {
        layers,
        format: shortUrl,
        transparent: true,
        version: cfg.token,
      });

      const createTile = (coords: L.Coords, done: L.DoneCallback) => {
        const url = layer.getTileUrl(coords);
        const img = document.createElement('img');
        img.setAttribute('role', 'presentation');
        img.setAttribute('data-url', url);

        const GET_OPTIONS: IFetchOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'image/png',
          },
        };

        this.fetch
          .fetch(url, GET_OPTIONS)
          .then((response) => response.blob())
          .then(
            (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                img.src = <string>reader.result;
              };
              reader.readAsDataURL(blob);
              done(undefined, img);
            },
            (error) => done(error, img)
          );
        return img;
      };

      // @ts-ignore
      layer.createTile = createTile;

      return layer;
    } else {
      const layer = leaf.tileLayer.wms(shortUrl, {
        layers,
        format: 'image/png',
        transparent: true,
      });
      return layer;
    }
  }
}
