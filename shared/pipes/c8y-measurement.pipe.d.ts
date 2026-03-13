import { PipeTransform } from '@angular/core';
import { IMeasurement } from '@c8y/client';
import { NumberPipe } from '@c8y/ngx-components';
import * as i0 from "@angular/core";
export declare class C8yMeasurementPipe implements PipeTransform {
    private number;
    constructor(number: NumberPipe);
    transform(measurement: IMeasurement, round?: 'ceil' | 'floor', digitsInfo?: string): string;
    private detectMeasurementPaths;
    static ɵfac: i0.ɵɵFactoryDeclaration<C8yMeasurementPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<C8yMeasurementPipe, "c8yMeasurement", false>;
}
