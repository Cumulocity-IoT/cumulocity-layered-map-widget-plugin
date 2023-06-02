import { Injectable } from '@angular/core';
import { EventService, IEvent, IManagedObject } from '@c8y/client';
import { RealtimeService, RealtimeSubjectService } from '@c8y/ngx-components';
import { from, merge, Observable } from 'rxjs';
import { filter, map, pairwise, startWith } from 'rxjs/operators';
import { ILocationUpdateEvent } from './layered-map-widget.service';
import { has, isEmpty } from 'lodash';

const EMPTY_EVENT: ILocationUpdateEvent = {
  c8y_Position: {
    lat: 0,
    lng: 0,
    alt: 0,
    accuracy: 0,
  },
  source: { id: '' },
  text: '',
  type: 'c8y_LocationUpdate',
  creationTime: '',
  time: new Date(0).toISOString(),
};
@Injectable()
export class LocationRealtimeService extends RealtimeService<IEvent> {
  constructor(realtime: RealtimeSubjectService, private event: EventService) {
    super(realtime);
  }

  protected channel(): string {
    return '/events/*';
  }

  private isLocationUpdateEvent(event: IEvent): event is ILocationUpdateEvent {
    return event.type === 'c8y_LocationUpdate' && has(event, 'c8y_Position');
  }

  startListening(devices: IManagedObject[]): Map<string, Observable<ILocationUpdateEvent>> {
    const cache = new Map<string, Observable<ILocationUpdateEvent>>();
    for (const device of devices) {
      const observable$ = this.fetchLatestAndRealtime$(device.id);
      cache.set(device.id, observable$);
    }
    return cache;
  }

  fetchLatestAndRealtime$(source: string): Observable<ILocationUpdateEvent> {
    const latestValue$ = from(
      this.event.list({
        source,
        pageSize: 1,
        withTotalPages: false,
        dateFrom: new Date(0).toISOString(),
        dateTo: new Date().toISOString(),
        type: 'c8y_LocationUpdate',
      })
    ).pipe(
      map((result) => result.data),
      filter((data) => !isEmpty(data)),
      map((data) => data[0] as ILocationUpdateEvent)
    );

    const realtime$ = this.onCreate$(source).pipe(
      filter((event) => this.isLocationUpdateEvent(event)),
      map((event) => event as ILocationUpdateEvent)
    );

    return merge(latestValue$, realtime$).pipe(
      startWith(EMPTY_EVENT),
      pairwise(),
      filter(([prev, curr]) => (prev === EMPTY_EVENT ? true : curr.time >= prev.time)),
      map(([, curr]) => curr)
    );
  }
}
