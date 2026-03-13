import * as i0 from "@angular/core";
export declare class EventQueryFormComponent {
    filter: {};
    queryParams: ({
        key: string;
        type: string;
        templateOptions: {
            label: string;
            placeholder: string;
            description: string;
        };
    } | import("@ngx-formly/core").FormlyFieldConfig<import("@ngx-formly/core").FormlyFieldProps & {
        [additionalProperties: string]: any;
    }>)[];
    static ɵfac: i0.ɵɵFactoryDeclaration<EventQueryFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EventQueryFormComponent, "ps-event-query-form", never, { "filter": { "alias": "filter"; "required": false; }; }, {}, never, ["*"], true, never>;
}
