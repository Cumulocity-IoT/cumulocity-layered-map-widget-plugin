import { EventService, IEvent, IManagedObject } from '@c8y/client';
import { RealtimeService, RealtimeSubjectService } from '@c8y/ngx-components';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface ILocationUpdateEvent extends IEvent {
    c8y_Position: {
        accuracy: number;
        alt: number;
        lat: number;
        lng: number;
    };
    type: 'c8y_LocationUpdate';
}
export declare class LocationRealtimeService extends RealtimeService<IEvent> {
    private event;
    constructor(realtime: RealtimeSubjectService, event: EventService);
    protected channel(): string;
    startListening(devices: IManagedObject[]): Map<string, Observable<ILocationUpdateEvent>>;
    fetchLatestAndRealtime$(source: string): Observable<ILocationUpdateEvent>;
    private isLocationUpdateEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocationRealtimeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocationRealtimeService>;
}
