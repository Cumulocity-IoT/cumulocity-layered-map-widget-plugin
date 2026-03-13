import { DataGridComponent } from '@c8y/ngx-components';
import * as i0 from "@angular/core";
export declare class DataGridPatchService {
    readonly ORIGINAL_METHOD_BACKUP_ATTRIBUTE_NAME = "multiSortMethod";
    /**
     * Enforces that always only one column can be sorted.
     * WARNING: This method might brake in the future as private API is accessed!
     *
     * Usage in your component:
     *
     * @ViewChild(DataGridComponent, { static: false })
     * set grid(value: DataGridComponent) {
     *   if (value) {
     *     this.patchService.applySingleSortBehavior(value);
     *   }
     * }
     *
     * @param grid
     */
    applySingleSortBehavior(grid: DataGridComponent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataGridPatchService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DataGridPatchService>;
}
