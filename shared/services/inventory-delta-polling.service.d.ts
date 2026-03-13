import { IManagedObject, InventoryService } from '@c8y/client';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export type InventoryDelta = {
    add: IManagedObject[];
    remove: string[];
};
export declare class InventoryDeltaPollingService {
    private inventory;
    constructor(inventory: InventoryService);
    createPolling$(filter: object, interval?: number, mos?: string[]): Observable<InventoryDelta>;
    private iterateAfter;
    private checkForUpdates;
    toDelta(matches: Array<IManagedObject>, old: Array<string>): {
        add: IManagedObject[];
        remove: string[];
    };
    private fetchMatchingManagedObjects;
    static ɵfac: i0.ɵɵFactoryDeclaration<InventoryDeltaPollingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InventoryDeltaPollingService>;
}
