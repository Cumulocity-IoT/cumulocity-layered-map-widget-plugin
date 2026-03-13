import { OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import * as i0 from "@angular/core";
export declare const ACTIVE_TAB_STORAGE_KEY = "c8y_rpActiveTab";
export declare class ActiveTabService implements OnDestroy {
    private localStorageService;
    active$: BehaviorSubject<boolean>;
    lastActive$: BehaviorSubject<boolean>;
    private tabId;
    private subscriptions;
    constructor(localStorageService: LocalStorageService);
    ngOnDestroy(): void;
    init(): void;
    isActive(): boolean;
    private handleStorageUpdate;
    private setActiveTabListener;
    private setCurrentTabActive;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActiveTabService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActiveTabService>;
}
