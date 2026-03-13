import { Component, Input } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { DynamicQueryFormComponent } from './dynamic-query-form.component';
import { getDateFromBlock, getDateToBlock, getTextInputBlock } from './formly-query-blocks';
import * as i0 from "@angular/core";
export class EventQueryFormComponent {
    constructor() {
        this.filter = {};
        this.queryParams = [
            getDateFromBlock({
                key: 'createdFrom',
                label: 'Created from',
                description: "Start date or date and time of the event's creation (set by the platform during creation).",
            }),
            getDateToBlock({
                key: 'createdTo',
                label: 'Created to',
                description: "End date or date and time of the event's creation (set by the platform during creation).",
            }),
            getDateFromBlock({
                key: 'dateFrom',
                label: 'Date from',
                description: 'Start date or date and time of the event occurrence (provided by the device).',
            }),
            getDateToBlock({
                key: 'dateTo',
                label: 'Date to',
                description: 'End date or date and time of the event occurrence (provided by the device).',
            }),
            getTextInputBlock({
                key: 'fragmentType',
                description: 'A characteristic which identifies a managed object or event, for example, geolocation, electricity sensor, relay state.',
                label: 'Fragment Type',
            }),
            getTextInputBlock({
                key: 'fragmentValue',
                description: "Allows filtering events by the fragment's value, but only when provided together with fragmentType (only string values)",
                label: 'Fragment Value',
            }),
            getDateFromBlock({
                key: 'lastUpdatedFrom',
                label: 'Last updated from',
                description: 'Start date or date and time of the last update made.',
            }),
            getDateToBlock({
                key: 'lastUpdatedTo',
                label: 'Last updated to',
                description: 'End date or date and time of the last update made.',
            }),
            {
                key: 'revert',
                type: 'checkbox',
                templateOptions: {
                    label: 'Revert',
                    description: 'If you are using a range query (that is, at least one of the dateFrom or dateTo parameters is included in the request), then setting revert=true will sort the results by the oldest events first. By default, the results are sorted by the newest events first.',
                },
            },
            getTextInputBlock({
                key: 'type',
                description: 'The type of event to search for.',
                label: 'Type',
            }),
        ];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: EventQueryFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: EventQueryFormComponent, isStandalone: true, selector: "ps-event-query-form", inputs: { filter: "filter" }, ngImport: i0, template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`, isInline: true, dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "component", type: DynamicQueryFormComponent, selector: "ps-dynamic-query-form", inputs: ["filter", "params"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: EventQueryFormComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ps-event-query-form',
                    template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`,
                    standalone: true,
                    imports: [CoreModule, DynamicQueryFormComponent],
                }]
        }], propDecorators: { filter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtcXVlcnktZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9fZm9ybWx5LWZpZWxkcy9xdWVyeS1mb3Jtcy9ldmVudC1xdWVyeS1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQVU1RixNQUFNLE9BQU8sdUJBQXVCO0lBUnBDO1FBU1csV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNyQixnQkFBVyxHQUFHO1lBQ1osZ0JBQWdCLENBQUM7Z0JBQ2YsR0FBRyxFQUFFLGFBQWE7Z0JBQ2xCLEtBQUssRUFBRSxjQUFjO2dCQUNyQixXQUFXLEVBQ1QsNEZBQTRGO2FBQy9GLENBQUM7WUFDRixjQUFjLENBQUM7Z0JBQ2IsR0FBRyxFQUFFLFdBQVc7Z0JBQ2hCLEtBQUssRUFBRSxZQUFZO2dCQUNuQixXQUFXLEVBQ1QsMEZBQTBGO2FBQzdGLENBQUM7WUFDRixnQkFBZ0IsQ0FBQztnQkFDZixHQUFHLEVBQUUsVUFBVTtnQkFDZixLQUFLLEVBQUUsV0FBVztnQkFDbEIsV0FBVyxFQUFFLCtFQUErRTthQUM3RixDQUFDO1lBQ0YsY0FBYyxDQUFDO2dCQUNiLEdBQUcsRUFBRSxRQUFRO2dCQUNiLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQUUsNkVBQTZFO2FBQzNGLENBQUM7WUFDRixpQkFBaUIsQ0FBQztnQkFDaEIsR0FBRyxFQUFFLGNBQWM7Z0JBQ25CLFdBQVcsRUFDVCx5SEFBeUg7Z0JBQzNILEtBQUssRUFBRSxlQUFlO2FBQ3ZCLENBQUM7WUFDRixpQkFBaUIsQ0FBQztnQkFDaEIsR0FBRyxFQUFFLGVBQWU7Z0JBQ3BCLFdBQVcsRUFDVCx5SEFBeUg7Z0JBQzNILEtBQUssRUFBRSxnQkFBZ0I7YUFDeEIsQ0FBQztZQUNGLGdCQUFnQixDQUFDO2dCQUNmLEdBQUcsRUFBRSxpQkFBaUI7Z0JBQ3RCLEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLFdBQVcsRUFBRSxzREFBc0Q7YUFDcEUsQ0FBQztZQUNGLGNBQWMsQ0FBQztnQkFDYixHQUFHLEVBQUUsZUFBZTtnQkFDcEIsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsV0FBVyxFQUFFLG9EQUFvRDthQUNsRSxDQUFDO1lBQ0Y7Z0JBQ0UsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUsUUFBUTtvQkFDZixXQUFXLEVBQ1QsbVFBQW1RO2lCQUN0UTthQUNGO1lBQ0QsaUJBQWlCLENBQUM7Z0JBQ2hCLEdBQUcsRUFBRSxNQUFNO2dCQUNYLFdBQVcsRUFBRSxrQ0FBa0M7Z0JBQy9DLEtBQUssRUFBRSxNQUFNO2FBQ2QsQ0FBQztTQUNILENBQUM7S0FDSDsrR0E5RFksdUJBQXVCO21HQUF2Qix1QkFBdUIsNkdBTnhCOzs0QkFFZ0IsMkRBRWhCLFVBQVUsK0JBQUUseUJBQXlCOzs0RkFFcEMsdUJBQXVCO2tCQVJuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRTs7NEJBRWdCO29CQUMxQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLHlCQUF5QixDQUFDO2lCQUNqRDs4QkFFVSxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGM4eS9uZ3gtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBEeW5hbWljUXVlcnlGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljLXF1ZXJ5LWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IGdldERhdGVGcm9tQmxvY2ssIGdldERhdGVUb0Jsb2NrLCBnZXRUZXh0SW5wdXRCbG9jayB9IGZyb20gJy4vZm9ybWx5LXF1ZXJ5LWJsb2Nrcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BzLWV2ZW50LXF1ZXJ5LWZvcm0nLFxuICB0ZW1wbGF0ZTogYDxwcy1keW5hbWljLXF1ZXJ5LWZvcm0gW2ZpbHRlcl09XCJmaWx0ZXJcIiBbcGFyYW1zXT1cInF1ZXJ5UGFyYW1zXCJcbiAgICA+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50XG4gID48L3BzLWR5bmFtaWMtcXVlcnktZm9ybT5gLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29yZU1vZHVsZSwgRHluYW1pY1F1ZXJ5Rm9ybUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIEV2ZW50UXVlcnlGb3JtQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZmlsdGVyID0ge307XG4gIHF1ZXJ5UGFyYW1zID0gW1xuICAgIGdldERhdGVGcm9tQmxvY2soe1xuICAgICAga2V5OiAnY3JlYXRlZEZyb20nLFxuICAgICAgbGFiZWw6ICdDcmVhdGVkIGZyb20nLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiU3RhcnQgZGF0ZSBvciBkYXRlIGFuZCB0aW1lIG9mIHRoZSBldmVudCdzIGNyZWF0aW9uIChzZXQgYnkgdGhlIHBsYXRmb3JtIGR1cmluZyBjcmVhdGlvbikuXCIsXG4gICAgfSksXG4gICAgZ2V0RGF0ZVRvQmxvY2soe1xuICAgICAga2V5OiAnY3JlYXRlZFRvJyxcbiAgICAgIGxhYmVsOiAnQ3JlYXRlZCB0bycsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgXCJFbmQgZGF0ZSBvciBkYXRlIGFuZCB0aW1lIG9mIHRoZSBldmVudCdzIGNyZWF0aW9uIChzZXQgYnkgdGhlIHBsYXRmb3JtIGR1cmluZyBjcmVhdGlvbikuXCIsXG4gICAgfSksXG4gICAgZ2V0RGF0ZUZyb21CbG9jayh7XG4gICAgICBrZXk6ICdkYXRlRnJvbScsXG4gICAgICBsYWJlbDogJ0RhdGUgZnJvbScsXG4gICAgICBkZXNjcmlwdGlvbjogJ1N0YXJ0IGRhdGUgb3IgZGF0ZSBhbmQgdGltZSBvZiB0aGUgZXZlbnQgb2NjdXJyZW5jZSAocHJvdmlkZWQgYnkgdGhlIGRldmljZSkuJyxcbiAgICB9KSxcbiAgICBnZXREYXRlVG9CbG9jayh7XG4gICAgICBrZXk6ICdkYXRlVG8nLFxuICAgICAgbGFiZWw6ICdEYXRlIHRvJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRW5kIGRhdGUgb3IgZGF0ZSBhbmQgdGltZSBvZiB0aGUgZXZlbnQgb2NjdXJyZW5jZSAocHJvdmlkZWQgYnkgdGhlIGRldmljZSkuJyxcbiAgICB9KSxcbiAgICBnZXRUZXh0SW5wdXRCbG9jayh7XG4gICAgICBrZXk6ICdmcmFnbWVudFR5cGUnLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICdBIGNoYXJhY3RlcmlzdGljIHdoaWNoIGlkZW50aWZpZXMgYSBtYW5hZ2VkIG9iamVjdCBvciBldmVudCwgZm9yIGV4YW1wbGUsIGdlb2xvY2F0aW9uLCBlbGVjdHJpY2l0eSBzZW5zb3IsIHJlbGF5IHN0YXRlLicsXG4gICAgICBsYWJlbDogJ0ZyYWdtZW50IFR5cGUnLFxuICAgIH0pLFxuICAgIGdldFRleHRJbnB1dEJsb2NrKHtcbiAgICAgIGtleTogJ2ZyYWdtZW50VmFsdWUnLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiQWxsb3dzIGZpbHRlcmluZyBldmVudHMgYnkgdGhlIGZyYWdtZW50J3MgdmFsdWUsIGJ1dCBvbmx5IHdoZW4gcHJvdmlkZWQgdG9nZXRoZXIgd2l0aCBmcmFnbWVudFR5cGUgKG9ubHkgc3RyaW5nIHZhbHVlcylcIixcbiAgICAgIGxhYmVsOiAnRnJhZ21lbnQgVmFsdWUnLFxuICAgIH0pLFxuICAgIGdldERhdGVGcm9tQmxvY2soe1xuICAgICAga2V5OiAnbGFzdFVwZGF0ZWRGcm9tJyxcbiAgICAgIGxhYmVsOiAnTGFzdCB1cGRhdGVkIGZyb20nLFxuICAgICAgZGVzY3JpcHRpb246ICdTdGFydCBkYXRlIG9yIGRhdGUgYW5kIHRpbWUgb2YgdGhlIGxhc3QgdXBkYXRlIG1hZGUuJyxcbiAgICB9KSxcbiAgICBnZXREYXRlVG9CbG9jayh7XG4gICAgICBrZXk6ICdsYXN0VXBkYXRlZFRvJyxcbiAgICAgIGxhYmVsOiAnTGFzdCB1cGRhdGVkIHRvJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRW5kIGRhdGUgb3IgZGF0ZSBhbmQgdGltZSBvZiB0aGUgbGFzdCB1cGRhdGUgbWFkZS4nLFxuICAgIH0pLFxuICAgIHtcbiAgICAgIGtleTogJ3JldmVydCcsXG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgdGVtcGxhdGVPcHRpb25zOiB7XG4gICAgICAgIGxhYmVsOiAnUmV2ZXJ0JyxcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgJ0lmIHlvdSBhcmUgdXNpbmcgYSByYW5nZSBxdWVyeSAodGhhdCBpcywgYXQgbGVhc3Qgb25lIG9mIHRoZSBkYXRlRnJvbSBvciBkYXRlVG8gcGFyYW1ldGVycyBpcyBpbmNsdWRlZCBpbiB0aGUgcmVxdWVzdCksIHRoZW4gc2V0dGluZyByZXZlcnQ9dHJ1ZSB3aWxsIHNvcnQgdGhlIHJlc3VsdHMgYnkgdGhlIG9sZGVzdCBldmVudHMgZmlyc3QuIEJ5IGRlZmF1bHQsIHRoZSByZXN1bHRzIGFyZSBzb3J0ZWQgYnkgdGhlIG5ld2VzdCBldmVudHMgZmlyc3QuJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBnZXRUZXh0SW5wdXRCbG9jayh7XG4gICAgICBrZXk6ICd0eXBlJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIHR5cGUgb2YgZXZlbnQgdG8gc2VhcmNoIGZvci4nLFxuICAgICAgbGFiZWw6ICdUeXBlJyxcbiAgICB9KSxcbiAgXTtcbn1cbiJdfQ==