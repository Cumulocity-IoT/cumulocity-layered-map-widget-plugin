import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FileNameToIconPipe implements PipeTransform {
    fileTypeIconsMap: {
        [key: string]: string[];
    };
    fileNameRegexp: RegExp;
    /**
     * Returns the icon for a specific binary.
     */
    transform(name: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileNameToIconPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FileNameToIconPipe, "fileNameToIcon", false>;
}
