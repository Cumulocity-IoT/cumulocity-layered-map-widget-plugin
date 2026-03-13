import { InventoryService } from '@c8y/client';
import { AlertService } from '@c8y/ngx-components';
import * as i0 from "@angular/core";
export declare class WidgetConfigurationService {
    private inventoryService;
    private alertService;
    constructor(inventoryService: InventoryService, alertService: AlertService);
    updateWidgetConfiguration(dashboardId: string, widgetId: string, newConfig: unknown): Promise<void>;
    getWidgetConfiguration(dashboardId: string, widgetId: string): Promise<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WidgetConfigurationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WidgetConfigurationService>;
}
