import { AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as i0 from "@angular/core";
export declare class DynamicQueryFormComponent implements AfterViewInit {
    selectedFilters: string[];
    form: FormGroup<{}>;
    fields: FormlyFieldConfig[];
    filter: Record<string, unknown>;
    params: FormlyFieldConfig[];
    ngAfterViewInit(): void;
    getIcon(b: FormlyFieldConfig): "" | "calendar-1" | "radio-button-on" | "text-input";
    queryParamClick(key: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicQueryFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicQueryFormComponent, "ps-dynamic-query-form", never, { "filter": { "alias": "filter"; "required": false; }; "params": { "alias": "params"; "required": false; }; }, {}, never, ["*"], true, never>;
}
