import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoreModule, IconDirective } from '@c8y/ngx-components';
import * as i0 from "@angular/core";
import * as i1 from "@c8y/ngx-components";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@ngx-formly/core";
export class DynamicQueryFormComponent {
    constructor() {
        this.selectedFilters = [];
        this.form = new FormGroup({});
        this.fields = [];
        this.filter = {};
        this.params = [];
    }
    ngAfterViewInit() {
        const fields = [];
        for (const title of Object.keys(this.filter)) {
            const match = this.params.find((p) => p.key === title);
            if (match) {
                this.selectedFilters.push(match.key.toString());
                fields.push(match);
            }
        }
        this.fields = fields;
    }
    getIcon(b) {
        const key = b.key?.toString();
        if (key?.includes('date') || key?.includes('created')) {
            return 'calendar-1';
        }
        if (b.type == 'select' || b.type == 'checkbox') {
            return 'radio-button-on';
        }
        else if (b.type === 'input') {
            return 'text-input';
        }
        // if (b.type === 'date') {
        //   return 'calendar-1';
        // }
        return '';
    }
    queryParamClick(key) {
        // const properties = <any>this.fields;
        if (this.selectedFilters.some((f) => f === key)) {
            this.selectedFilters = this.selectedFilters.filter((f) => f !== key);
            // delete properties[b.key!];
            delete this.filter[key];
            this.fields = this.fields.filter((f) => f.key !== key);
        }
        else {
            // set(<any>this.fields, b.key, b);
            const param = this.params.find((p) => p.key === key);
            if (param) {
                this.fields = [...this.fields, param];
                this.selectedFilters.push(key);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DynamicQueryFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DynamicQueryFormComponent, isStandalone: true, selector: "ps-dynamic-query-form", inputs: { filter: "filter", params: "params" }, ngImport: i0, template: `<form class="card" [formGroup]="form">
    <div class="card-header">
      <h4 class="card-title">Query filter</h4>
    </div>
    <div class="card-block">
      @for (p of params; track p.key) {
        <button
          class="btn btn-default btn-icon btn-sm m-t-8 m-l-0 m-r-8"
          [ngClass]="selectedFilters.includes(p.key!.toString()) ? 'active' : ''"
          (click)="queryParamClick(p.key!.toString())"
        >
          <i [c8yIcon]="getIcon(p)"></i>
          {{ p.key }}
        </button>
      }

      <div class="form-group m-t-16">
        <formly-form [form]="form" [fields]="fields" [model]="filter"></formly-form>
      </div>

      <ng-content></ng-content>
    </div>
  </form>`, isInline: true, dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "directive", type: i1.IconDirective, selector: "[c8yIcon]", inputs: ["c8yIcon"] }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "component", type: i4.FormlyForm, selector: "formly-form", inputs: ["form", "model", "fields", "options"], outputs: ["modelChange"] }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DynamicQueryFormComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ps-dynamic-query-form',
                    standalone: true,
                    imports: [CoreModule, IconDirective],
                    template: `<form class="card" [formGroup]="form">
    <div class="card-header">
      <h4 class="card-title">Query filter</h4>
    </div>
    <div class="card-block">
      @for (p of params; track p.key) {
        <button
          class="btn btn-default btn-icon btn-sm m-t-8 m-l-0 m-r-8"
          [ngClass]="selectedFilters.includes(p.key!.toString()) ? 'active' : ''"
          (click)="queryParamClick(p.key!.toString())"
        >
          <i [c8yIcon]="getIcon(p)"></i>
          {{ p.key }}
        </button>
      }

      <div class="form-group m-t-16">
        <formly-form [form]="form" [fields]="fields" [model]="filter"></formly-form>
      </div>

      <ng-content></ng-content>
    </div>
  </form>`,
                }]
        }], propDecorators: { filter: [{
                type: Input
            }], params: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1xdWVyeS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL19mb3JtbHktZmllbGRzL3F1ZXJ5LWZvcm1zL2R5bmFtaWMtcXVlcnktZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUErQmhFLE1BQU0sT0FBTyx5QkFBeUI7SUE1QnRDO1FBNkJFLG9CQUFlLEdBQWEsRUFBRSxDQUFDO1FBQy9CLFNBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixXQUFNLEdBQXdCLEVBQUUsQ0FBQztRQUN4QixXQUFNLEdBQTRCLEVBQUUsQ0FBQztRQUNyQyxXQUFNLEdBQXdCLEVBQUUsQ0FBQztLQXFEM0M7SUFuREMsZUFBZTtRQUNiLE1BQU0sTUFBTSxHQUF3QixFQUFFLENBQUM7UUFFdkMsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQzdDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBRXZELElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELE9BQU8sQ0FBQyxDQUFvQjtRQUMxQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBRTlCLElBQUksR0FBRyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDdEQsT0FBTyxZQUFZLENBQUM7UUFDdEIsQ0FBQztRQUVELElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUMvQyxPQUFPLGlCQUFpQixDQUFDO1FBQzNCLENBQUM7YUFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDOUIsT0FBTyxZQUFZLENBQUM7UUFDdEIsQ0FBQztRQUNELDJCQUEyQjtRQUMzQix5QkFBeUI7UUFFekIsSUFBSTtRQUVKLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFXO1FBQ3pCLHVDQUF1QztRQUN2QyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDckUsNkJBQTZCO1lBQzdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELENBQUM7YUFBTSxDQUFDO1lBQ04sbUNBQW1DO1lBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRXJELElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDOytHQXpEVSx5QkFBeUI7bUdBQXpCLHlCQUF5QixpSUF4QjFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBc0JGLDJEQXZCRSxVQUFVOzs0RkF5QlQseUJBQXlCO2tCQTVCckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQztvQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBc0JGO2lCQUNUOzhCQUtVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlLCBJY29uRGlyZWN0aXZlIH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwcy1keW5hbWljLXF1ZXJ5LWZvcm0nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29yZU1vZHVsZSwgSWNvbkRpcmVjdGl2ZV0sXG4gIHRlbXBsYXRlOiBgPGZvcm0gY2xhc3M9XCJjYXJkXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICA8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+UXVlcnkgZmlsdGVyPC9oND5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPlxuICAgICAgQGZvciAocCBvZiBwYXJhbXM7IHRyYWNrIHAua2V5KSB7XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4taWNvbiBidG4tc20gbS10LTggbS1sLTAgbS1yLThcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cInNlbGVjdGVkRmlsdGVycy5pbmNsdWRlcyhwLmtleSEudG9TdHJpbmcoKSkgPyAnYWN0aXZlJyA6ICcnXCJcbiAgICAgICAgICAoY2xpY2spPVwicXVlcnlQYXJhbUNsaWNrKHAua2V5IS50b1N0cmluZygpKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8aSBbYzh5SWNvbl09XCJnZXRJY29uKHApXCI+PC9pPlxuICAgICAgICAgIHt7IHAua2V5IH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgfVxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtLXQtMTZcIj5cbiAgICAgICAgPGZvcm1seS1mb3JtIFtmb3JtXT1cImZvcm1cIiBbZmllbGRzXT1cImZpZWxkc1wiIFttb2RlbF09XCJmaWx0ZXJcIj48L2Zvcm1seS1mb3JtPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgPC9mb3JtPmAsXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNRdWVyeUZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgc2VsZWN0ZWRGaWx0ZXJzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3JtID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gIGZpZWxkczogRm9ybWx5RmllbGRDb25maWdbXSA9IFtdO1xuICBASW5wdXQoKSBmaWx0ZXI6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge307XG4gIEBJbnB1dCgpIHBhcmFtczogRm9ybWx5RmllbGRDb25maWdbXSA9IFtdO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBmaWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgdGl0bGUgb2YgT2JqZWN0LmtleXModGhpcy5maWx0ZXIpKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IHRoaXMucGFyYW1zLmZpbmQoKHApID0+IHAua2V5ID09PSB0aXRsZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRmlsdGVycy5wdXNoKG1hdGNoLmtleS50b1N0cmluZygpKTtcbiAgICAgICAgZmllbGRzLnB1c2gobWF0Y2gpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmZpZWxkcyA9IGZpZWxkcztcbiAgfVxuXG4gIGdldEljb24oYjogRm9ybWx5RmllbGRDb25maWcpIHtcbiAgICBjb25zdCBrZXkgPSBiLmtleT8udG9TdHJpbmcoKTtcblxuICAgIGlmIChrZXk/LmluY2x1ZGVzKCdkYXRlJykgfHwga2V5Py5pbmNsdWRlcygnY3JlYXRlZCcpKSB7XG4gICAgICByZXR1cm4gJ2NhbGVuZGFyLTEnO1xuICAgIH1cblxuICAgIGlmIChiLnR5cGUgPT0gJ3NlbGVjdCcgfHwgYi50eXBlID09ICdjaGVja2JveCcpIHtcbiAgICAgIHJldHVybiAncmFkaW8tYnV0dG9uLW9uJztcbiAgICB9IGVsc2UgaWYgKGIudHlwZSA9PT0gJ2lucHV0Jykge1xuICAgICAgcmV0dXJuICd0ZXh0LWlucHV0JztcbiAgICB9XG4gICAgLy8gaWYgKGIudHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgLy8gICByZXR1cm4gJ2NhbGVuZGFyLTEnO1xuXG4gICAgLy8gfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcXVlcnlQYXJhbUNsaWNrKGtleTogc3RyaW5nKSB7XG4gICAgLy8gY29uc3QgcHJvcGVydGllcyA9IDxhbnk+dGhpcy5maWVsZHM7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLnNvbWUoKGYpID0+IGYgPT09IGtleSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWx0ZXJzID0gdGhpcy5zZWxlY3RlZEZpbHRlcnMuZmlsdGVyKChmKSA9PiBmICE9PSBrZXkpO1xuICAgICAgLy8gZGVsZXRlIHByb3BlcnRpZXNbYi5rZXkhXTtcbiAgICAgIGRlbGV0ZSB0aGlzLmZpbHRlcltrZXldO1xuICAgICAgdGhpcy5maWVsZHMgPSB0aGlzLmZpZWxkcy5maWx0ZXIoKGYpID0+IGYua2V5ICE9PSBrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZXQoPGFueT50aGlzLmZpZWxkcywgYi5rZXksIGIpO1xuICAgICAgY29uc3QgcGFyYW0gPSB0aGlzLnBhcmFtcy5maW5kKChwKSA9PiBwLmtleSA9PT0ga2V5KTtcblxuICAgICAgaWYgKHBhcmFtKSB7XG4gICAgICAgIHRoaXMuZmllbGRzID0gWy4uLnRoaXMuZmllbGRzLCBwYXJhbV07XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==