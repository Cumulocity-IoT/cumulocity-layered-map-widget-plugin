import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export interface FilterPipeValue {
    attr: string;
    value: string | number | boolean;
}
export declare class FilterPipe implements PipeTransform {
    transform<T>(data: T[], filterValue: FilterPipeValue[]): T[];
    private unify;
    private filterBy;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterPipe, "filter", false>;
}
