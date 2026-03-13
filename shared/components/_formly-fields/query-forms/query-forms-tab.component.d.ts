import { EventEmitter, OnInit } from '@angular/core';
import { IAlarm, IEvent, IManagedObject } from '@c8y/client';
import * as i0 from "@angular/core";
export type QueryResult = {
    filter: object;
} & ({
    type: 'Inventory';
    data: IManagedObject[];
} | {
    type: 'Event';
    data: IEvent[];
} | {
    type: 'Alarm';
    data: IAlarm[];
});
export declare class QueryFormsTabComponent implements OnInit {
    tabChange: EventEmitter<"Inventory" | "Alarm" | "Event">;
    filter: object;
    hiddenAutoRun: boolean;
    queryType: 'Inventory' | 'Alarm' | 'Event';
    tabs: {
        active: boolean;
        icon: string;
        name: string;
    }[];
    ngOnInit(): void;
    onTabClick(name: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QueryFormsTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QueryFormsTabComponent, "ps-query-forms-tab", never, { "filter": { "alias": "filter"; "required": false; }; "hiddenAutoRun": { "alias": "hiddenAutoRun"; "required": false; }; "queryType": { "alias": "queryType"; "required": false; }; }, { "tabChange": "tabChange"; }, never, never, true, never>;
}
