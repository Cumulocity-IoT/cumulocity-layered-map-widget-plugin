import { Injectable } from '@angular/core';
import { OperationStatus } from '@c8y/client';
import { filter } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@c8y/ngx-components";
export class OperationToastService {
    constructor(alertService, operationRealtime) {
        this.alertService = alertService;
        this.operationRealtime = operationRealtime;
        this.realtimeSubscriptions = new Map();
        this.alertsCache = new Map();
    }
    add(alert) {
        const { deviceId, uuid } = alert.operationDetails;
        this.alertsCache.set(uuid, alert);
        // @ts-ignore
        delete alert.operationDetails;
        this.alertService.add(alert);
        this.subscribe(uuid, deviceId);
        return this.operationRealtime.onUpdate$(deviceId).pipe(filter((o) => {
            return ((o.status === OperationStatus.SUCCESSFUL || o.status === OperationStatus.FAILED) &&
                o['uuid'] === uuid);
        }));
    }
    remove(alert) {
        this.alertService.remove(alert);
        if (alert.operationDetails) {
            const uuid = alert.operationDetails?.uuid;
            this.alertsCache.delete(uuid);
            this.unsubscribe(uuid);
        }
    }
    handleRealtimeElement(operation) {
        const uuid = operation['uuid'];
        const alert = this.alertsCache.get(uuid);
        if (alert) {
            this.alertService.remove(alert);
        }
        const text = operation['description'];
        let detailedData = '';
        if (operation.status === OperationStatus.FAILED) {
            // text += `<br /><a href="/apps/devicemanagement/index.html#/device/${operation.deviceId}/operations" target="_blank">Go to operation details</a>`;
            detailedData = operation['failureReason'];
        }
        else {
            detailedData = operation['param'];
        }
        this.alertService.add({
            type: operation.status === OperationStatus.SUCCESSFUL ? 'success' : 'danger',
            text: text,
            detailedData,
            allowHtml: true,
        });
        // first need to remove from cache and then check for unsubscribe!
        this.alertsCache.delete(uuid);
        this.unsubscribe(uuid);
    }
    /**
     * Creates an operation realtime listener for a device.
     * @param deviceId
     * @param uuid
     * @returns
     */
    subscribe(uuid, deviceId) {
        if (this.realtimeSubscriptions.has(uuid)) {
            // already subscribed
            return;
        }
        const sub = this.operationRealtime
            .onUpdate$(deviceId)
            .pipe(filter((o) => {
            return ((o.status === OperationStatus.SUCCESSFUL || o.status === OperationStatus.FAILED) &&
                o['uuid'] === uuid);
        }))
            .subscribe((o) => this.handleRealtimeElement(o));
        this.realtimeSubscriptions.set(uuid, sub);
    }
    /**
     * Cancels the listening to an operation channel.
     * @param uuid
     */
    unsubscribe(uuid) {
        const sub = this.realtimeSubscriptions.get(uuid);
        if (sub) {
            sub.unsubscribe();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: OperationToastService, deps: [{ token: i1.AlertService }, { token: i1.OperationRealtimeService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: OperationToastService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: OperationToastService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.AlertService }, { type: i1.OperationRealtimeService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9uLXRvYXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvb3BlcmF0aW9uLXRvYXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFELE9BQU8sRUFBZ0IsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFTNUMsTUFBTSxPQUFPLHFCQUFxQjtJQUloQyxZQUNVLFlBQTBCLEVBQzFCLGlCQUEyQztRQUQzQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBTDdDLDBCQUFxQixHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO1FBQ3hELGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQTBCLENBQUM7SUFLckQsQ0FBQztJQUVKLEdBQUcsQ0FBQyxLQUFxQjtRQUN2QixNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUVsRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsYUFBYTtRQUNiLE9BQU8sS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRS9CLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQ3BELE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1gsT0FBTyxDQUNMLENBQUMsQ0FBQyxDQUFDLE1BQU0s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QUNLLFdBQVcsQ0FBQyxJQUFZO1FBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakQsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNSLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQzsrR0E1R1UscUJBQXFCO21IQUFyQixxQkFBcUI7OzRGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJT3BlcmF0aW9uLCBPcGVyYXRpb25TdGF0dXMgfSBmcm9tICdAYzh5L2NsaWVudCc7XG5pbXBvcnQgeyBBbGVydCwgQWxlcnRTZXJ2aWNlLCBPcGVyYXRpb25SZWFsdGltZVNlcnZpY2UgfSBmcm9tICdAYzh5L25neC1jb21wb25lbnRzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZmlsdGVyIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3BlcmF0aW9uQWxlcnQgZXh0ZW5kcyBBbGVydCB7XG4gIG9wZXJhdGlvbkRldGFpbHM6IHtcbiAgICBkZXZpY2VJZDogc3RyaW5nO1xuICAgIHV1aWQ6IHN0cmluZztcbiAgfTtcbn1cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcGVyYXRpb25Ub2FzdFNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWx0aW1lU3Vic2NyaXB0aW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBTdWJzY3JpcHRpb24+KCk7XG4gIHByaXZhdGUgYWxlcnRzQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgT3BlcmF0aW9uQWxlcnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbGVydFNlcnZpY2U6IEFsZXJ0U2VydmljZSxcbiAgICBwcml2YXRlIG9wZXJhdGlvblJlYWx0aW1lOiBPcGVyYXRpb25SZWFsdGltZVNlcnZpY2VcbiAgKSB7fVxuXG4gIGFkZChhbGVydDogT3BlcmF0aW9uQWxlcnQpIHtcbiAgICBjb25zdCB7IGRldmljZUlkLCB1dWlkIH0gPSBhbGVydC5vcGVyYXRpb25EZXRhaWxzO1xuXG4gICAgdGhpcy5hbGVydHNDYWNoZS5zZXQodXVpZCwgYWxlcnQpO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBkZWxldGUgYWxlcnQub3BlcmF0aW9uRGV0YWlscztcbiAgICB0aGlzLmFsZXJ0U2VydmljZS5hZGQoYWxlcnQpO1xuXG4gICAgdGhpcy5zdWJzY3JpYmUodXVpZCwgZGV2aWNlSWQpO1xuXG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9uUmVhbHRpbWUub25VcGRhdGUkKGRldmljZUlkKS5waXBlKFxuICAgICAgZmlsdGVyKChvKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgKG8uc3RhdHVzID09PSBPcGVyYXRpb25TdGF0dXMuU1VDQ0VTU0ZVTCB8fCBvLnN0YXR1cyA9PT0gT3BlcmF0aW9uU3RhdHVzLkZBSUxFRCkgJiZcbiAgICAgICAgICBvWyd1dWlkJ10gPT09IHV1aWRcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHJlbW92ZShhbGVydDogT3BlcmF0aW9uQWxlcnQpIHtcbiAgICB0aGlzLmFsZXJ0U2VydmljZS5yZW1vdmUoYWxlcnQpO1xuXG4gICAgaWYgKGFsZXJ0Lm9wZXJhdGlvbkRldGFpbHMpIHtcbiAgICAgIGNvbnN0IHV1aWQgPSBhbGVydC5vcGVyYXRpb25EZXRhaWxzPy51dWlkO1xuXG4gICAgICB0aGlzLmFsZXJ0c0NhY2hlLmRlbGV0ZSh1dWlkKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUodXVpZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSZWFsdGltZUVsZW1lbnQob3BlcmF0aW9uOiBJT3BlcmF0aW9uKSB7XG4gICAgY29uc3QgdXVpZCA9IG9wZXJhdGlvblsndXVpZCddIGFzIHN0cmluZztcbiAgICBjb25zdCBhbGVydCA9IHRoaXMuYWxlcnRzQ2FjaGUuZ2V0KHV1aWQpO1xuXG4gICAgaWYgKGFsZXJ0KSB7XG4gICAgICB0aGlzLmFsZXJ0U2VydmljZS5yZW1vdmUoYWxlcnQpO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBvcGVyYXRpb25bJ2Rlc2NyaXB0aW9uJ10gYXMgc3RyaW5nO1xuXG4gICAgbGV0IGRldGFpbGVkRGF0YSA9ICcnO1xuXG4gICAgaWYgKG9wZXJhdGlvbi5zdGF0dXMgPT09IE9wZXJhdGlvblN0YXR1cy5GQUlMRUQpIHtcbiAgICAgIC8vIHRleHQgKz0gYDxiciAvPjxhIGhyZWY9XCIvYXBwcy9kZXZpY2VtYW5hZ2VtZW50L2luZGV4Lmh0bWwjL2RldmljZS8ke29wZXJhdGlvbi5kZXZpY2VJZH0vb3BlcmF0aW9uc1wiIHRhcmdldD1cIl9ibGFua1wiPkdvIHRvIG9wZXJhdGlvbiBkZXRhaWxzPC9hPmA7XG4gICAgICBkZXRhaWxlZERhdGEgPSBvcGVyYXRpb25bJ2ZhaWx1cmVSZWFzb24nXSBhcyBzdHJpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRldGFpbGVkRGF0YSA9IG9wZXJhdGlvblsncGFyYW0nXSBhcyBzdHJpbmc7XG4gICAgfVxuXG4gICAgdGhpcy5hbGVydFNlcnZpY2UuYWRkKHtcbiAgICAgIHR5cGU6IG9wZXJhdGlvbi5zdGF0dXMgPT09IE9wZXJhdGlvblN0YXR1cy5TVUNDRVNTRlVMID8gJ3N1Y2Nlc3MnIDogJ2RhbmdlcicsXG4gICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgZGV0YWlsZWREYXRhLFxuICAgICAgYWxsb3dIdG1sOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgLy8gZmlyc3QgbmVlZCB0byByZW1vdmUgZnJvbSBjYWNoZSBhbmQgdGhlbiBjaGVjayBmb3IgdW5zdWJzY3JpYmUhXG4gICAgdGhpcy5hbGVydHNDYWNoZS5kZWxldGUodXVpZCk7XG4gICAgdGhpcy51bnN1YnNjcmliZSh1dWlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG9wZXJhdGlvbiByZWFsdGltZSBsaXN0ZW5lciBmb3IgYSBkZXZpY2UuXG4gICAqIEBwYXJhbSBkZXZpY2VJZFxuICAgKiBAcGFyYW0gdXVpZFxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpYmUodXVpZDogc3RyaW5nLCBkZXZpY2VJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVhbHRpbWVTdWJzY3JpcHRpb25zLmhhcyh1dWlkKSkge1xuICAgICAgLy8gYWxyZWFkeSBzdWJzY3JpYmVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3ViID0gdGhpcy5vcGVyYXRpb25SZWFsdGltZVxuICAgICAgLm9uVXBkYXRlJChkZXZpY2VJZClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKG8pID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKG8uc3RhdHVzID09PSBPcGVyYXRpb25TdGF0dXMuU1VDQ0VTU0ZVTCB8fCBvLnN0YXR1cyA9PT0gT3BlcmF0aW9uU3RhdHVzLkZBSUxFRCkgJiZcbiAgICAgICAgICAgIG9bJ3V1aWQnXSA9PT0gdXVpZFxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChvKSA9PiB0aGlzLmhhbmRsZVJlYWx0aW1lRWxlbWVudChvKSk7XG5cbiAgICB0aGlzLnJlYWx0aW1lU3Vic2NyaXB0aW9ucy5zZXQodXVpZCwgc3ViKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIHRoZSBsaXN0ZW5pbmcgdG8gYW4gb3BlcmF0aW9uIGNoYW5uZWwuXG4gICAqIEBwYXJhbSB1dWlkXG4gICAqL1xuICBwcml2YXRlIHVuc3Vic2NyaWJlKHV1aWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHN1YiA9IHRoaXMucmVhbHRpbWVTdWJzY3JpcHRpb25zLmdldCh1dWlkKTtcblxuICAgIGlmIChzdWIpIHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19