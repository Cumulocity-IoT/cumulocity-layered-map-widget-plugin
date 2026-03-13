import { Injectable } from '@angular/core';
import { has } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@c8y/client";
import * as i2 from "@c8y/ngx-components";
export class WidgetConfigurationService {
    constructor(inventoryService, alertService) {
        this.inventoryService = inventoryService;
        this.alertService = alertService;
    }
    async updateWidgetConfiguration(dashboardId, widgetId, newConfig) {
        const { data: mo } = await this.inventoryService.detail(dashboardId);
        const dashboard = mo['c8y_Dashboard'];
        if (!has(dashboard.children, widgetId)) {
            throw new Error(widgetId + ' doesn not exist in Dashboard ' + dashboardId);
        }
        dashboard.children[widgetId].config = newConfig;
        await this.inventoryService
            .update({
            id: dashboardId,
            c8y_Dashboard: dashboard,
        })
            .catch((error) => this.alertService.addServerFailure(error));
    }
    getWidgetConfiguration(dashboardId, widgetId) {
        return this.inventoryService.detail(dashboardId).then((res) => {
            const dashboard = res.data['c8y_Dashboard'];
            if (!has(dashboard.children, widgetId)) {
                throw new Error(widgetId + ' doesn not exist in Dashboard ' + dashboardId);
            }
            return dashboard.children[widgetId].config;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: WidgetConfigurationService, deps: [{ token: i1.InventoryService }, { token: i2.AlertService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: WidgetConfigurationService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: WidgetConfigurationService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.InventoryService }, { type: i2.AlertService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWNvbmZpZ3VyYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy93aWRnZXQtY29uZmlndXJhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQWE3QixNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFlBQ1UsZ0JBQWtDLEVBQ2xDLFlBQTBCO1FBRDFCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDakMsQ0FBQztJQUVKLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxXQUFtQixFQUFFLFFBQWdCLEVBQUUsU0FBa0I7UUFDdkYsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckUsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBaUIsQ0FBQztRQUV0RCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsR0FBRyxnQ0FBZ0MsR0FBRyxXQUFXLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBQ0QsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBRWhELE1BQU0sSUFBSSxDQUFDLGdCQUFnQjthQUN4QixNQUFNLENBQUM7WUFDTixFQUFFLEVBQUUsV0FBVztZQUNmLGFBQWEsRUFBRSxTQUFTO1NBQ3pCLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsc0JBQXNCLENBQUMsV0FBbUIsRUFBRSxRQUFnQjtRQUMxRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDNUQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQWlCLENBQUM7WUFFNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxHQUFHLGdDQUFnQyxHQUFHLFdBQVcsQ0FBQyxDQUFDO1lBQzdFLENBQUM7WUFFRCxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzsrR0FqQ1UsMEJBQTBCO21IQUExQiwwQkFBMEI7OzRGQUExQiwwQkFBMEI7a0JBRHRDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbnZlbnRvcnlTZXJ2aWNlIH0gZnJvbSAnQGM4eS9jbGllbnQnO1xuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlIH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBoYXMgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbnRlcmZhY2UgRGFzaGJvYXJkQ2hpbGQge1xuICBjb25maWc6IHVua25vd247XG4gIFtrZXk6IHN0cmluZ106IHVua25vd247XG59XG5cbmludGVyZmFjZSBDOHlEYXNoYm9hcmQge1xuICBjaGlsZHJlbjogUmVjb3JkPHN0cmluZywgRGFzaGJvYXJkQ2hpbGQ+O1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2lkZ2V0Q29uZmlndXJhdGlvblNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGludmVudG9yeVNlcnZpY2U6IEludmVudG9yeVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbGVydFNlcnZpY2U6IEFsZXJ0U2VydmljZVxuICApIHt9XG5cbiAgYXN5bmMgdXBkYXRlV2lkZ2V0Q29uZmlndXJhdGlvbihkYXNoYm9hcmRJZDogc3RyaW5nLCB3aWRnZXRJZDogc3RyaW5nLCBuZXdDb25maWc6IHVua25vd24pIHtcbiAgICBjb25zdCB7IGRhdGE6IG1vIH0gPSBhd2FpdCB0aGlzLmludmVudG9yeVNlcnZpY2UuZGV0YWlsKGRhc2hib2FyZElkKTtcbiAgICBjb25zdCBkYXNoYm9hcmQgPSBtb1snYzh5X0Rhc2hib2FyZCddIGFzIEM4eURhc2hib2FyZDtcblxuICAgIGlmICghaGFzKGRhc2hib2FyZC5jaGlsZHJlbiwgd2lkZ2V0SWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3Iod2lkZ2V0SWQgKyAnIGRvZXNuIG5vdCBleGlzdCBpbiBEYXNoYm9hcmQgJyArIGRhc2hib2FyZElkKTtcbiAgICB9XG4gICAgZGFzaGJvYXJkLmNoaWxkcmVuW3dpZGdldElkXS5jb25maWcgPSBuZXdDb25maWc7XG5cbiAgICBhd2FpdCB0aGlzLmludmVudG9yeVNlcnZpY2VcbiAgICAgIC51cGRhdGUoe1xuICAgICAgICBpZDogZGFzaGJvYXJkSWQsXG4gICAgICAgIGM4eV9EYXNoYm9hcmQ6IGRhc2hib2FyZCxcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB0aGlzLmFsZXJ0U2VydmljZS5hZGRTZXJ2ZXJGYWlsdXJlKGVycm9yKSk7XG4gIH1cblxuICBnZXRXaWRnZXRDb25maWd1cmF0aW9uKGRhc2hib2FyZElkOiBzdHJpbmcsIHdpZGdldElkOiBzdHJpbmcpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5pbnZlbnRvcnlTZXJ2aWNlLmRldGFpbChkYXNoYm9hcmRJZCkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zdCBkYXNoYm9hcmQgPSByZXMuZGF0YVsnYzh5X0Rhc2hib2FyZCddIGFzIEM4eURhc2hib2FyZDtcblxuICAgICAgaWYgKCFoYXMoZGFzaGJvYXJkLmNoaWxkcmVuLCB3aWRnZXRJZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHdpZGdldElkICsgJyBkb2VzbiBub3QgZXhpc3QgaW4gRGFzaGJvYXJkICcgKyBkYXNoYm9hcmRJZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXNoYm9hcmQuY2hpbGRyZW5bd2lkZ2V0SWRdLmNvbmZpZztcbiAgICB9KTtcbiAgfVxufVxuIl19