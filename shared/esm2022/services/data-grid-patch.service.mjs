import { Injectable } from '@angular/core';
import { invoke, set, has } from 'lodash';
import * as i0 from "@angular/core";
export class DataGridPatchService {
    constructor() {
        this.ORIGINAL_METHOD_BACKUP_ATTRIBUTE_NAME = 'multiSortMethod';
    }
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
    applySingleSortBehavior(grid) {
        if (has(grid, this.ORIGINAL_METHOD_BACKUP_ATTRIBUTE_NAME)) {
            return;
        }
        if (!has(grid, 'changeSortOrder')) {
            throw new Error('Patching of c8y-data-grid failed. Method changeSortOrder not found.');
        }
        set(grid, this.ORIGINAL_METHOD_BACKUP_ATTRIBUTE_NAME, grid.changeSortOrder.bind(grid));
        grid.changeSortOrder = (columnName) => {
            const oldSortedColumns = grid.columns.filter((c) => c.name !== columnName && c.sortable && c.sortOrder !== '');
            oldSortedColumns.map((c) => {
                c.sortOrder = '';
                return c;
            });
            invoke(grid, this.ORIGINAL_METHOD_BACKUP_ATTRIBUTE_NAME, columnName);
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DataGridPatchService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DataGridPatchService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DataGridPatchService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1ncmlkLXBhdGNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvZGF0YS1ncmlkLXBhdGNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxRQUFRLENBQUM7O0FBRzFDLE1BQU0sT0FBTyxvQkFBb0I7SUFEakM7UUFFVywwQ0FBcUMsR0FBRyxpQkFBaUIsQ0FBQztLQXdDcEU7SUF2Q0M7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCx1QkFBdUIsQ0FBQyxJQUF1QjtRQUM3QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLEVBQUUsQ0FBQztZQUMxRCxPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztZQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLHFFQUFxRSxDQUFDLENBQUM7UUFDekYsQ0FBQztRQUNELEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFdkYsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3BDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQzFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEtBQUssRUFBRSxDQUNqRSxDQUFDO1lBRUYsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pCLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUVqQixPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMscUNBQXFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDO0lBQ0osQ0FBQzsrR0F4Q1Usb0JBQW9CO21IQUFwQixvQkFBb0IsY0FEUCxNQUFNOzs0RkFDbkIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFHcmlkQ29tcG9uZW50IH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBpbnZva2UsIHNldCwgaGFzIH0gZnJvbSAnbG9kYXNoJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZFBhdGNoU2VydmljZSB7XG4gIHJlYWRvbmx5IE9SSUdJTkFMX01FVEhPRF9CQUNLVVBfQVRUUklCVVRFX05BTUUgPSAnbXVsdGlTb3J0TWV0aG9kJztcbiAgLyoqXG4gICAqIEVuZm9yY2VzIHRoYXQgYWx3YXlzIG9ubHkgb25lIGNvbHVtbiBjYW4gYmUgc29ydGVkLlxuICAgKiBXQVJOSU5HOiBUaGlzIG1ldGhvZCBtaWdodCBicmFrZSBpbiB0aGUgZnV0dXJlIGFzIHByaXZhdGUgQVBJIGlzIGFjY2Vzc2VkIVxuICAgKlxuICAgKiBVc2FnZSBpbiB5b3VyIGNvbXBvbmVudDpcbiAgICpcbiAgICogQFZpZXdDaGlsZChEYXRhR3JpZENvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gICAqIHNldCBncmlkKHZhbHVlOiBEYXRhR3JpZENvbXBvbmVudCkge1xuICAgKiAgIGlmICh2YWx1ZSkge1xuICAgKiAgICAgdGhpcy5wYXRjaFNlcnZpY2UuYXBwbHlTaW5nbGVTb3J0QmVoYXZpb3IodmFsdWUpO1xuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiBAcGFyYW0gZ3JpZFxuICAgKi9cbiAgYXBwbHlTaW5nbGVTb3J0QmVoYXZpb3IoZ3JpZDogRGF0YUdyaWRDb21wb25lbnQpOiB2b2lkIHtcbiAgICBpZiAoaGFzKGdyaWQsIHRoaXMuT1JJR0lOQUxfTUVUSE9EX0JBQ0tVUF9BVFRSSUJVVEVfTkFNRSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWhhcyhncmlkLCAnY2hhbmdlU29ydE9yZGVyJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGF0Y2hpbmcgb2YgYzh5LWRhdGEtZ3JpZCBmYWlsZWQuIE1ldGhvZCBjaGFuZ2VTb3J0T3JkZXIgbm90IGZvdW5kLicpO1xuICAgIH1cbiAgICBzZXQoZ3JpZCwgdGhpcy5PUklHSU5BTF9NRVRIT0RfQkFDS1VQX0FUVFJJQlVURV9OQU1FLCBncmlkLmNoYW5nZVNvcnRPcmRlci5iaW5kKGdyaWQpKTtcblxuICAgIGdyaWQuY2hhbmdlU29ydE9yZGVyID0gKGNvbHVtbk5hbWUpID0+IHtcbiAgICAgIGNvbnN0IG9sZFNvcnRlZENvbHVtbnMgPSBncmlkLmNvbHVtbnMuZmlsdGVyKFxuICAgICAgICAoYykgPT4gYy5uYW1lICE9PSBjb2x1bW5OYW1lICYmIGMuc29ydGFibGUgJiYgYy5zb3J0T3JkZXIgIT09ICcnXG4gICAgICApO1xuXG4gICAgICBvbGRTb3J0ZWRDb2x1bW5zLm1hcCgoYykgPT4ge1xuICAgICAgICBjLnNvcnRPcmRlciA9ICcnO1xuXG4gICAgICAgIHJldHVybiBjO1xuICAgICAgfSk7XG5cbiAgICAgIGludm9rZShncmlkLCB0aGlzLk9SSUdJTkFMX01FVEhPRF9CQUNLVVBfQVRUUklCVVRFX05BTUUsIGNvbHVtbk5hbWUpO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==