import { IManagedObject, InventoryService } from '@c8y/client';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class HierarchyAggregationService {
    private inventoryService;
    private cache;
    constructor(inventoryService: InventoryService);
    getAllChildrenOfManagedObject$(moId: string, cache?: boolean): Observable<IManagedObject[]>;
    getAttributeValueOfAllChildren$<T>(extractAttribute: (mo: IManagedObject) => T, moId: string): Observable<Array<T>>;
    getUniqAttributeValueOfAllChildren$<T>(extractAttribute: (mo: IManagedObject) => T, moId: string): Observable<Array<T>>;
    private getDirectChildrenOfManagedObject$;
    private hasChildren;
    static ɵfac: i0.ɵɵFactoryDeclaration<HierarchyAggregationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HierarchyAggregationService>;
}
