import { Injectable } from '@angular/core';
import { IManagedObject, InventoryService } from '@c8y/client';
import { Observable, timer } from 'rxjs';
import { exhaustMap, filter, map, tap } from 'rxjs/operators';

@Injectable()
export class PositionPollingService {
  constructor(private inventory: InventoryService) {}

  createPolling$(filterQuery: string, interval: number): Observable<IManagedObject[]> {
    let currentDate = new Date().toISOString();

    return timer(interval, interval).pipe(
      exhaustMap(() => this.checkForUpdates(filterQuery, currentDate)),
      filter((result) => result.data.length > 0),
      tap((result) => {
        const moWithLatestDate = result.data.reduce((a, b) =>
          a.lastUpdated > b.lastUpdated ? a : b
        );

        currentDate = new Date(moWithLatestDate.lastUpdated).toISOString();
      }),
      map((result) => result.data)
    );
  }

  private checkForUpdates(filterQuery: string, lastUpdate: string) {
    const query = `$filter=(${filterQuery} and lastUpdated.date gt '${lastUpdate}')`;
    const filter = {
      pageSize: 200,
      withTotalPages: false,
      query,
    };
    return this.inventory.list(filter);
  }
}
