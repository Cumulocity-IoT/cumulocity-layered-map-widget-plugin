import { Observable } from 'rxjs';
import { IManagedObject, InventoryService } from '@c8y/client';
import * as i0 from "@angular/core";
export declare class ManagedObjectUpdatePollingService {
    private inventory;
    private subject;
    readonly update$: Observable<IManagedObject[]>;
    private loop;
    private counter;
    private running;
    private currentDate;
    private failureCount;
    private interval;
    constructor(inventory: InventoryService);
    /**
     *
     * @param queryExtension for instructions how queries are built - check https://cumulocity.com/api/core/2024/#tag/Query-language
     * @param interval
     * @returns
     */
    startListening(queryExtension: string, interval?: number): Observable<IManagedObject[]>;
    private iterateAfter;
    stopListening(): void;
    private checkForUpdates;
    static ɵfac: i0.ɵɵFactoryDeclaration<ManagedObjectUpdatePollingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ManagedObjectUpdatePollingService>;
}
