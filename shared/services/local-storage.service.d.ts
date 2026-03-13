import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class LocalStorageService {
    storage$: Subject<any>;
    get debounceTime(): number;
    set debounceTime(delayInMS: number);
    private _debounceTime;
    private storageUpdateDebounce;
    init(): void;
    delete(key: string): void;
    destroy(): void;
    get<T>(key: string): T | undefined;
    getOrDefault<T>(key: string, defaultValue: T): T;
    set<T>(key: string, value: T): T;
    private listenToStorageChanges;
    private setStorageDebounce;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalStorageService>;
}
