import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { subMinutes } from 'date-fns';
import * as i0 from "@angular/core";
import * as i1 from "@c8y/client";
const FETCH_INTERVAL = 5;
const FAILURE_LIMIT = 10;
export class ManagedObjectUpdatePollingService {
    constructor(inventory) {
        this.inventory = inventory;
        this.subject = new Subject();
        this.update$ = this.subject.asObservable();
        this.running = false;
        this.failureCount = 0;
        this.interval = FETCH_INTERVAL;
    }
    /**
     *
     * @param queryExtension for instructions how queries are built - check https://cumulocity.com/api/core/2024/#tag/Query-language
     * @param interval
     * @returns
     */
    startListening(queryExtension, interval = FETCH_INTERVAL) {
        if (this.running) {
            return this.update$;
        }
        this.loop = new Subject();
        this.currentDate = subMinutes(new Date(), 5).toISOString();
        this.counter = this.loop.subscribe(() => this.checkForUpdates(queryExtension));
        this.running = true;
        this.interval = interval;
        this.iterateAfter();
        return this.update$;
    }
    iterateAfter() {
        setTimeout(() => {
            this.loop.next();
        }, this.interval);
    }
    stopListening() {
        if (this.loop) {
            this.loop.complete();
            this.loop = null;
        }
        if (this.counter) {
            this.counter.unsubscribe();
            this.counter = null;
        }
        this.running = false;
    }
    checkForUpdates(queryExtension) {
        const query = `$filter=(lastUpdated.date gt '${this.currentDate}' and ${queryExtension}')`;
        const filter = {
            pageSize: 200,
            withTotalPages: false,
            query,
        };
        this.inventory
            .list(filter)
            .then((result) => {
            this.failureCount = 0;
            if (result.data.length) {
                this.subject.next(result.data);
                const moWithLatestDate = result.data.reduce((a, b) => a.lastUpdated > b.lastUpdated ? a : b);
                this.currentDate = moWithLatestDate.lastUpdated;
            }
        }, (error) => {
            this.failureCount++;
            if (this.failureCount >= FAILURE_LIMIT) {
                this.failureCount = 0;
                console.error(`Unable to detect updates for query ${query}`, error);
            }
        })
            .finally(() => {
            this.iterateAfter();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ManagedObjectUpdatePollingService, deps: [{ token: i1.InventoryService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ManagedObjectUpdatePollingService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ManagedObjectUpdatePollingService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.InventoryService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlZC1vYmplY3QtdXBkYXRlLWRldGVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL21hbmFnZWQtb2JqZWN0LXVwZGF0ZS1kZXRlY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRCLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7OztBQUV0QyxNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFDekIsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBR3pCLE1BQU0sT0FBTyxpQ0FBaUM7SUFVNUMsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFUdkMsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFvQixDQUFDO1FBQ3pDLFlBQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBR3ZDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsYUFBUSxHQUFHLGNBQWMsQ0FBQztJQUVnQixDQUFDO0lBRW5EOzs7OztPQUtHO0lBQ0gsY0FBYyxDQUFDLGNBQXNCLEVBQUUsUUFBUSxHQUFHLGNBQWM7UUFDOUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUzRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTyxZQUFZO1FBQ2xCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxlQUFlLENBQUMsY0FBc0I7UUFDNUMsTUFBTSxLQUFLLEdBQUcsaUNBQWlDLElBQUksQ0FBQyxXQUFXLFNBQVMsY0FBYyxJQUFJLENBQUM7UUFDM0YsTUFBTSxNQUFNLEdBQUc7WUFDYixRQUFRLEVBQUUsR0FBRztZQUNiLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLEtBQUs7U0FDTixDQUFDO1FBRUYsSUFBSSxDQUFDLFNBQVM7YUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ1osSUFBSSxDQUNILENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUV0QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUNuRCxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN0QyxDQUFDO2dCQUVGLElBQUksQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO1lBQ2xELENBQUM7UUFDSCxDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxLQUFLLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0RSxDQUFDO1FBQ0gsQ0FBQyxDQUNGO2FBQ0EsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7K0dBeEZVLGlDQUFpQzttSEFBakMsaUNBQWlDOzs0RkFBakMsaUNBQWlDO2tCQUQ3QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJTWFuYWdlZE9iamVjdCwgSW52ZW50b3J5U2VydmljZSB9IGZyb20gJ0BjOHkvY2xpZW50JztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHN1Yk1pbnV0ZXMgfSBmcm9tICdkYXRlLWZucyc7XG5cbmNvbnN0IEZFVENIX0lOVEVSVkFMID0gNTtcbmNvbnN0IEZBSUxVUkVfTElNSVQgPSAxMDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hbmFnZWRPYmplY3RVcGRhdGVQb2xsaW5nU2VydmljZSB7XG4gIHByaXZhdGUgc3ViamVjdCA9IG5ldyBTdWJqZWN0PElNYW5hZ2VkT2JqZWN0W10+KCk7XG4gIHJlYWRvbmx5IHVwZGF0ZSQgPSB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIHByaXZhdGUgbG9vcDogU3ViamVjdDx2b2lkPjtcbiAgcHJpdmF0ZSBjb3VudGVyOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcnVubmluZyA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnREYXRlOiBzdHJpbmc7XG4gIHByaXZhdGUgZmFpbHVyZUNvdW50ID0gMDtcbiAgcHJpdmF0ZSBpbnRlcnZhbCA9IEZFVENIX0lOVEVSVkFMO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW52ZW50b3J5OiBJbnZlbnRvcnlTZXJ2aWNlKSB7fVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcXVlcnlFeHRlbnNpb24gZm9yIGluc3RydWN0aW9ucyBob3cgcXVlcmllcyBhcmUgYnVpbHQgLSBjaGVjayBodHRwczovL2N1bXVsb2NpdHkuY29tL2FwaS9jb3JlLzIwMjQvI3RhZy9RdWVyeS1sYW5ndWFnZVxuICAgKiBAcGFyYW0gaW50ZXJ2YWxcbiAgICogQHJldHVybnNcbiAgICovXG4gIHN0YXJ0TGlzdGVuaW5nKHF1ZXJ5RXh0ZW5zaW9uOiBzdHJpbmcsIGludGVydmFsID0gRkVUQ0hfSU5URVJWQUwpOiBPYnNlcnZhYmxlPElNYW5hZ2VkT2JqZWN0W10+IHtcbiAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGUkO1xuICAgIH1cbiAgICB0aGlzLmxvb3AgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IHN1Yk1pbnV0ZXMobmV3IERhdGUoKSwgNSkudG9JU09TdHJpbmcoKTtcblxuICAgIHRoaXMuY291bnRlciA9IHRoaXMubG9vcC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGVja0ZvclVwZGF0ZXMocXVlcnlFeHRlbnNpb24pKTtcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBpbnRlcnZhbDtcbiAgICB0aGlzLml0ZXJhdGVBZnRlcigpO1xuXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlJDtcbiAgfVxuXG4gIHByaXZhdGUgaXRlcmF0ZUFmdGVyKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5sb29wLm5leHQoKTtcbiAgICB9LCB0aGlzLmludGVydmFsKTtcbiAgfVxuXG4gIHN0b3BMaXN0ZW5pbmcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubG9vcCkge1xuICAgICAgdGhpcy5sb29wLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLmxvb3AgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvdW50ZXIpIHtcbiAgICAgIHRoaXMuY291bnRlci51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5jb3VudGVyID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRm9yVXBkYXRlcyhxdWVyeUV4dGVuc2lvbjogc3RyaW5nKSB7XG4gICAgY29uc3QgcXVlcnkgPSBgJGZpbHRlcj0obGFzdFVwZGF0ZWQuZGF0ZSBndCAnJHt0aGlzLmN1cnJlbnREYXRlfScgYW5kICR7cXVlcnlFeHRlbnNpb259JylgO1xuICAgIGNvbnN0IGZpbHRlciA9IHtcbiAgICAgIHBhZ2VTaXplOiAyMDAsXG4gICAgICB3aXRoVG90YWxQYWdlczogZmFsc2UsXG4gICAgICBxdWVyeSxcbiAgICB9O1xuXG4gICAgdGhpcy5pbnZlbnRvcnlcbiAgICAgIC5saXN0KGZpbHRlcilcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgdGhpcy5mYWlsdXJlQ291bnQgPSAwO1xuXG4gICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgY29uc3QgbW9XaXRoTGF0ZXN0RGF0ZSA9IHJlc3VsdC5kYXRhLnJlZHVjZSgoYSwgYikgPT5cbiAgICAgICAgICAgICAgYS5sYXN0VXBkYXRlZCA+IGIubGFzdFVwZGF0ZWQgPyBhIDogYlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IG1vV2l0aExhdGVzdERhdGUubGFzdFVwZGF0ZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLmZhaWx1cmVDb3VudCsrO1xuXG4gICAgICAgICAgaWYgKHRoaXMuZmFpbHVyZUNvdW50ID49IEZBSUxVUkVfTElNSVQpIHtcbiAgICAgICAgICAgIHRoaXMuZmFpbHVyZUNvdW50ID0gMDtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuYWJsZSB0byBkZXRlY3QgdXBkYXRlcyBmb3IgcXVlcnkgJHtxdWVyeX1gLCBlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIHRoaXMuaXRlcmF0ZUFmdGVyKCk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19