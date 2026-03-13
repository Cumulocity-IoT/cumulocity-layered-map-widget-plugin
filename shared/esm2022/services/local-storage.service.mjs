import { Injectable } from '@angular/core';
import { debounce } from 'lodash';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class LocalStorageService {
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.storage$ = new Subject();
        this._debounceTime = 100;
    }
    get debounceTime() {
        return this._debounceTime;
    }
    set debounceTime(delayInMS) {
        this._debounceTime = delayInMS;
        this.setStorageDebounce(delayInMS);
    }
    init() {
        this.setStorageDebounce();
        this.listenToStorageChanges();
    }
    delete(key) {
        localStorage.removeItem(key);
    }
    destroy() {
        this.storage$.complete();
    }
    get(key) {
        const storage = localStorage.getItem(key);
        return storage ? JSON.parse(storage) : undefined;
    }
    getOrDefault(key, defaultValue) {
        return this.get(key) || defaultValue;
    }
    // basically not needed but this way you can handle it all via the service
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        return value;
    }
    listenToStorageChanges() {
        window.addEventListener('storage', () => this.storageUpdateDebounce(localStorage), false);
    }
    setStorageDebounce(debounceTime = this.debounceTime) {
        this.storageUpdateDebounce = debounce((ls) => this.storage$.next(ls), debounceTime);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocalStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocalStorageService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocalStorageService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2xvY2FsLXN0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQXdCLE1BQU0sUUFBUSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRy9CLE1BQU0sT0FBTyxtQkFBbUI7SUFEaEM7UUFFRSw4REFBOEQ7UUFDOUQsYUFBUSxHQUFpQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBVy9CLGtCQUFhLEdBQUcsR0FBRyxDQUFDO0tBeUM3QjtJQWxEQyxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksWUFBWSxDQUFDLFNBQVM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFNRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFXO1FBQ2hCLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxHQUFHLENBQUksR0FBVztRQUNoQixNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTFDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDMUQsQ0FBQztJQUVELFlBQVksQ0FBSSxHQUFXLEVBQUUsWUFBZTtRQUMxQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksWUFBWSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCwwRUFBMEU7SUFDMUUsR0FBRyxDQUFJLEdBQVcsRUFBRSxLQUFRO1FBQzFCLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVqRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTyxzQkFBc0I7UUFDNUIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVPLGtCQUFrQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWTtRQUN6RCxJQUFJLENBQUMscUJBQXFCLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN0RixDQUFDOytHQXJEVSxtQkFBbUI7bUhBQW5CLG1CQUFtQjs7NEZBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlYm91bmNlLCBEZWJvdW5jZWRGdW5jTGVhZGluZyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgc3RvcmFnZSQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgZ2V0IGRlYm91bmNlVGltZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWJvdW5jZVRpbWU7XG4gIH1cblxuICBzZXQgZGVib3VuY2VUaW1lKGRlbGF5SW5NUykge1xuICAgIHRoaXMuX2RlYm91bmNlVGltZSA9IGRlbGF5SW5NUztcbiAgICB0aGlzLnNldFN0b3JhZ2VEZWJvdW5jZShkZWxheUluTVMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVib3VuY2VUaW1lID0gMTAwO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBwcml2YXRlIHN0b3JhZ2VVcGRhdGVEZWJvdW5jZSE6IERlYm91bmNlZEZ1bmNMZWFkaW5nPCh2YWx1ZTogYW55KSA9PiB2b2lkPjtcblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0U3RvcmFnZURlYm91bmNlKCk7XG4gICAgdGhpcy5saXN0ZW5Ub1N0b3JhZ2VDaGFuZ2VzKCk7XG4gIH1cblxuICBkZWxldGUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JhZ2UkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBnZXQ8VD4oa2V5OiBzdHJpbmcpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBzdG9yYWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcblxuICAgIHJldHVybiBzdG9yYWdlID8gKEpTT04ucGFyc2Uoc3RvcmFnZSkgYXMgVCkgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXRPckRlZmF1bHQ8VD4oa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogVCk6IFQge1xuICAgIHJldHVybiB0aGlzLmdldChrZXkpIHx8IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8vIGJhc2ljYWxseSBub3QgbmVlZGVkIGJ1dCB0aGlzIHdheSB5b3UgY2FuIGhhbmRsZSBpdCBhbGwgdmlhIHRoZSBzZXJ2aWNlXG4gIHNldDxUPihrZXk6IHN0cmluZywgdmFsdWU6IFQpOiBUIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvU3RvcmFnZUNoYW5nZXMoKTogdm9pZCB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCAoKSA9PiB0aGlzLnN0b3JhZ2VVcGRhdGVEZWJvdW5jZShsb2NhbFN0b3JhZ2UpLCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIHNldFN0b3JhZ2VEZWJvdW5jZShkZWJvdW5jZVRpbWUgPSB0aGlzLmRlYm91bmNlVGltZSk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZVVwZGF0ZURlYm91bmNlID0gZGVib3VuY2UoKGxzKSA9PiB0aGlzLnN0b3JhZ2UkLm5leHQobHMpLCBkZWJvdW5jZVRpbWUpO1xuICB9XG59XG4iXX0=