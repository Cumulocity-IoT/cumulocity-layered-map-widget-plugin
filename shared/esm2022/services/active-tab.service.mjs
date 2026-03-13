import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./local-storage.service";
export const ACTIVE_TAB_STORAGE_KEY = 'c8y_rpActiveTab';
export class ActiveTabService {
    constructor(localStorageService) {
        this.localStorageService = localStorageService;
        this.subscriptions = new Subscription();
        this.setActiveTabListener();
        this.subscriptions.add(this.localStorageService.storage$.subscribe(() => this.handleStorageUpdate()));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    init() {
        const tabActive = !document.hidden;
        this.tabId = crypto.randomUUID();
        this.active$ = new BehaviorSubject(tabActive);
        this.lastActive$ = new BehaviorSubject(tabActive);
        if (tabActive)
            this.setCurrentTabActive();
    }
    isActive() {
        return this.tabId === this.localStorageService.get(ACTIVE_TAB_STORAGE_KEY);
    }
    handleStorageUpdate() {
        const isActive = this.localStorageService.get(ACTIVE_TAB_STORAGE_KEY) === this.tabId;
        // update lastActive, if it has changed
        if (isActive !== this.lastActive$.getValue())
            this.lastActive$.next(isActive);
    }
    setActiveTabListener() {
        // focus » active, lastActive via localStorage (via setCurrentTabActive)
        window.onfocus = () => {
            this.setCurrentTabActive();
            if (!this.active$.getValue())
                this.active$.next(true);
        };
        // blur » inactive, no update to lastActive
        window.onblur = () => {
            this.active$.next(false);
        };
    }
    setCurrentTabActive() {
        this.localStorageService.set(ACTIVE_TAB_STORAGE_KEY, this.tabId);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ActiveTabService, deps: [{ token: i1.LocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ActiveTabService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ActiveTabService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.LocalStorageService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXRhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FjdGl2ZS10YWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFHckQsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsaUJBQWlCLENBQUM7QUFHeEQsTUFBTSxPQUFPLGdCQUFnQjtJQU8zQixZQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUZwRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFHekMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQzlFLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUk7UUFDRixNQUFNLFNBQVMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFFbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksU0FBUztZQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXJGLHVDQUF1QztRQUN2QyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFTyxvQkFBb0I7UUFDMUIsd0VBQXdFO1FBQ3hFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUM7UUFFRiwyQ0FBMkM7UUFDM0MsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRSxDQUFDOytHQXJEVSxnQkFBZ0I7bUhBQWhCLGdCQUFnQjs7NEZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBBQ1RJVkVfVEFCX1NUT1JBR0VfS0VZID0gJ2M4eV9ycEFjdGl2ZVRhYic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3RpdmVUYWJTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgYWN0aXZlJCE6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPjtcbiAgbGFzdEFjdGl2ZSQhOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgcHJpdmF0ZSB0YWJJZCE6IHN0cmluZztcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSkge1xuICAgIHRoaXMuc2V0QWN0aXZlVGFiTGlzdGVuZXIoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnN0b3JhZ2UkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhhbmRsZVN0b3JhZ2VVcGRhdGUoKSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHRhYkFjdGl2ZSA9ICFkb2N1bWVudC5oaWRkZW47XG5cbiAgICB0aGlzLnRhYklkID0gY3J5cHRvLnJhbmRvbVVVSUQoKTtcbiAgICB0aGlzLmFjdGl2ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRhYkFjdGl2ZSk7XG4gICAgdGhpcy5sYXN0QWN0aXZlJCA9IG5ldyBCZWhhdmlvclN1YmplY3QodGFiQWN0aXZlKTtcbiAgICBpZiAodGFiQWN0aXZlKSB0aGlzLnNldEN1cnJlbnRUYWJBY3RpdmUoKTtcbiAgfVxuXG4gIGlzQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRhYklkID09PSB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KEFDVElWRV9UQUJfU1RPUkFHRV9LRVkpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVTdG9yYWdlVXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGlzQWN0aXZlID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldChBQ1RJVkVfVEFCX1NUT1JBR0VfS0VZKSA9PT0gdGhpcy50YWJJZDtcblxuICAgIC8vIHVwZGF0ZSBsYXN0QWN0aXZlLCBpZiBpdCBoYXMgY2hhbmdlZFxuICAgIGlmIChpc0FjdGl2ZSAhPT0gdGhpcy5sYXN0QWN0aXZlJC5nZXRWYWx1ZSgpKSB0aGlzLmxhc3RBY3RpdmUkLm5leHQoaXNBY3RpdmUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBY3RpdmVUYWJMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAvLyBmb2N1cyDCuyBhY3RpdmUsIGxhc3RBY3RpdmUgdmlhIGxvY2FsU3RvcmFnZSAodmlhIHNldEN1cnJlbnRUYWJBY3RpdmUpXG4gICAgd2luZG93Lm9uZm9jdXMgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldEN1cnJlbnRUYWJBY3RpdmUoKTtcbiAgICAgIGlmICghdGhpcy5hY3RpdmUkLmdldFZhbHVlKCkpIHRoaXMuYWN0aXZlJC5uZXh0KHRydWUpO1xuICAgIH07XG5cbiAgICAvLyBibHVyIMK7IGluYWN0aXZlLCBubyB1cGRhdGUgdG8gbGFzdEFjdGl2ZVxuICAgIHdpbmRvdy5vbmJsdXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2ZSQubmV4dChmYWxzZSk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3VycmVudFRhYkFjdGl2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KEFDVElWRV9UQUJfU1RPUkFHRV9LRVksIHRoaXMudGFiSWQpO1xuICB9XG59XG4iXX0=