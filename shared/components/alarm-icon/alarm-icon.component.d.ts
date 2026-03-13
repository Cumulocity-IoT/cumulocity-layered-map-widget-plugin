import { IAlarm } from '@c8y/client';
import * as i0 from "@angular/core";
export declare class AlarmIconComponent {
    placement: 'top' | 'right' | 'bottom' | 'left';
    display: 'severity' | 'status';
    severity: string;
    status: string;
    set alarm(alarm: IAlarm);
    static ɵfac: i0.ɵɵFactoryDeclaration<AlarmIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AlarmIconComponent, "c8y-alarm-icon", never, { "placement": { "alias": "placement"; "required": false; }; "display": { "alias": "display"; "required": false; }; "severity": { "alias": "severity"; "required": false; }; "status": { "alias": "status"; "required": false; }; "alarm": { "alias": "alarm"; "required": false; }; }, {}, never, never, true, never>;
}
