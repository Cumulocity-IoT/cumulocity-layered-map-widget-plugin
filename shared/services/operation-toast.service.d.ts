import { IOperation } from '@c8y/client';
import { Alert, AlertService, OperationRealtimeService } from '@c8y/ngx-components';
import * as i0 from "@angular/core";
export interface OperationAlert extends Alert {
    operationDetails: {
        deviceId: string;
        uuid: string;
    };
}
export declare class OperationToastService {
    private alertService;
    private operationRealtime;
    private realtimeSubscriptions;
    private alertsCache;
    constructor(alertService: AlertService, operationRealtime: OperationRealtimeService);
    add(alert: OperationAlert): import("rxjs").Observable<IOperation>;
    remove(alert: OperationAlert): void;
    private handleRealtimeElement;
    /**
     * Creates an operation realtime listener for a device.
     * @param deviceId
     * @param uuid
     * @returns
     */
    private subscribe;
    /**
     * Cancels the listening to an operation channel.
     * @param uuid
     */
    private unsubscribe;
    static ɵfac: i0.ɵɵFactoryDeclaration<OperationToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OperationToastService>;
}
