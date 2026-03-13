import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import osmtogeojson from 'osmtogeojson';

@Injectable()
export class RailwayService {
    private readonly OVERPASS_ENDPOINTS = [
        'https://overpass-api.de/api/interpreter',
    ];

    readonly loading$ = new BehaviorSubject<boolean>(false);

    private abortController: AbortController | null = null;
    private retryTimeout: ReturnType<typeof setTimeout> | null = null;

    /** Abort any in-flight request and clear any scheduled retry. */
    cancel(): void {
        if (this.retryTimeout !== null) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = null;
        }
        this.abortController?.abort();
        this.abortController = null;
        this.loading$.next(false);
    }

    /**
     * Fetch railway GeoJSON for the given bounding box and railway types.
     * Automatically tries mirror endpoints on 429, then schedules a 5 s retry
     * once all mirrors are exhausted. Any pending request or retry is discarded
     * the moment `cancel()` is called (e.g. when the user moves the map).
     *
     * @param bbox   Overpass bbox string "south,west,north,east"
     * @param types  List of OSM railway tag values to query
     * @param onData Callback invoked with the converted GeoJSON FeatureCollection
     */
    fetch(bbox: string, types: string[], onData: (geojson: any) => void): void {
        this.loading$.next(true);
        this._doFetch(bbox, types, onData, 0);
    }

    private _doFetch(
        bbox: string,
        types: string[],
        onData: (geojson: any) => void,
        endpointIndex: number
    ): void {
        this.abortController = new AbortController();
        const { signal } = this.abortController;

        const union = types.map((t) => `way["railway"="${t}"](${bbox});`).join('\n        ');
        const query = `
      [out:json][timeout:90];
      (
        ${union}
      );
      out body;
      >;
      out skel qt;
    `;

        const endpoint = this.OVERPASS_ENDPOINTS[endpointIndex];

        fetch(endpoint, {
            method: 'POST',
            body: 'data=' + encodeURIComponent(query),
            signal,
        })
            .then((response) => {
                if (!response.ok) {
                    const err = new Error('Network error') as Error & { status: number };
                    err.status = response.status;
                    throw err;
                }
                return response.json();
            })
            .then((data) => {
                this.loading$.next(false);
                onData(osmtogeojson(data));
            })
            .catch((error: Error & { status?: number }) => {
                // Aborted by cancel() — loading$ already set to false there
                if (signal.aborted || error.name === 'AbortError') return;

                if (error.status === 429) {
                    const nextIndex = endpointIndex + 1;
                    if (nextIndex < this.OVERPASS_ENDPOINTS.length) {
                        // Still loading — trying next mirror, keep loading$ true
                        console.warn(`Overpass ${endpoint} rate-limited (429). Trying next mirror…`);
                        this._doFetch(bbox, types, onData, nextIndex);
                        return;
                    }
                    // All mirrors exhausted — keep loading$ true during retry wait
                    console.warn('All Overpass instances rate-limited. Retrying in 5 s…');
                    this.retryTimeout = setTimeout(() => {
                        this.retryTimeout = null;
                        this._doFetch(bbox, types, onData, 0);
                    }, 5000);
                } else {
                    const nextIndex = endpointIndex + 1;
                    if (nextIndex < this.OVERPASS_ENDPOINTS.length) {
                        // Still loading — trying next mirror, keep loading$ true
                        console.warn(`Network error (${error.status}). Trying next Overpass mirror…`);
                        this._doFetch(bbox, types, onData, nextIndex);
                        return;
                    }
                    console.warn(`Network error (${error.status}). Retrying after timeout…`);
                    this.retryTimeout = setTimeout(() => {
                        this.retryTimeout = null;
                        this._doFetch(bbox, types, onData, 0);
                    }, 2000);
                }
            });
    }
}
