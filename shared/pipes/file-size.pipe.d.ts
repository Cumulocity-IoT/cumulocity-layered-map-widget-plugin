import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FormatFileSizePipe implements PipeTransform {
    /**
     * Returns the file size as user friendly string.
     * @param sizeInBytes
     * @param longForm
     * @returns
     */
    transform(sizeInBytes: number, longForm?: boolean): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormatFileSizePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FormatFileSizePipe, "formatFileSize", false>;
}
