import { Injectable } from '@angular/core';
import { EventService, IManagedObject, InventoryService } from '@c8y/client';
import {
  isQueryLayerConfig,
  MyLayer,
  PollingDelta,
  QueryLayerConfig,
} from '../layered-map-widget.model';
import { Observable, timer } from 'rxjs';
import { exhaustMap, filter } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { normalizeQueryFilter } from 'shared';

const FETCH_INTERVAL = 5000;

@Injectable()
export class EventPollingService {
  constructor(
    private event: EventService,
    private inventory: InventoryService
  ) {}

  createPolling$(layer: MyLayer, interval = FETCH_INTERVAL): Observable<PollingDelta> {
    if (!isQueryLayerConfig(layer.config) || layer.config.type !== 'Event') {
      throw new Error('Layer is not event layer!');
    }

    return timer(interval, interval).pipe(
      exhaustMap(() => this.checkForUpdates(layer)),
      filter((delta) => delta.add.length > 0 || delta.remove.length > 0)
    );
  }

  private checkForUpdates(layer: MyLayer) {
    const config = layer.config;
    return this.fetchMatchingEvents(config).then((sources) => this.toPollingDelta(sources, layer));
  }

  async toPollingDelta(sources: Set<string>, layer: MyLayer) {
    const delta = {
      add: new Array<IManagedObject>(),
      remove: new Array<string>(),
    };

    const idsToAdd = [...sources].filter((source) => !layer.devices.includes(source));

    if (!isEmpty(idsToAdd)) {
      delta.add.push(...(await this.resolveManagedObjects(idsToAdd)));
    }

    const toRemoveIds = layer.devices.filter((id) => !sources.has(id));

    toRemoveIds.forEach((id) => delta.remove.push(id));

    return delta;
  }

  private async resolveManagedObjects(ids: string[]) {
    const filter = {
      ids: ids.toString(),
      fragmentType: 'c8y_Position',
      withChildren: false,
      pageSize: 100,
    };

    if (ids.length <= 100) {
      return this.inventory.list({ ...filter, withTotalPages: false }).then((res) => res.data);
    } else {
      const mos: IManagedObject[] = [];
      let res = await this.inventory.list({ ...filter, withTotalPages: true });

      while (res.data.length) {
        mos.push(...res.data);

        if (!res.paging?.nextPage) {
          break;
        }
        res = await res.paging.next();
      }

      return mos;
    }
  }

  private async fetchMatchingEvents(config: QueryLayerConfig) {
    const result = new Set<string>();
    const filter = {
      withTotalPages: true,
      pageSize: 100,
      ...normalizeQueryFilter(config.filter),
    };

    let res = await this.event.list(filter);

    while (res.data.length) {
      const ids = res.data
        .filter((event) => !result.has(event.source.id))
        .map((event) => event.source.id);

      ids.forEach((id) => result.add(id));

      if (!res.paging?.nextPage) {
        break;
      }
      res = await res.paging.next();
    }

    return result;
  }
}
