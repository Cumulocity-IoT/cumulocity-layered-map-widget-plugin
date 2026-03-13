import { Component, Input } from '@angular/core';
import { CoreModule } from '@c8y/ngx-components';
import { DynamicQueryFormComponent } from './dynamic-query-form.component';
import { getTextInputBlock } from './formly-query-blocks';
import * as i0 from "@angular/core";
export class InventoryQueryFormComponent {
    constructor() {
        this.filter = {};
        this.queryParams = [
            getTextInputBlock({
                key: 'fragmentType',
                description: 'A characteristic which identifies a managed object or event, for example, geolocation, electricity sensor, relay state.',
                label: 'Fragment Type',
            }),
            getTextInputBlock({
                key: 'ids',
                description: 'The managed object IDs to search for (comma separated).',
                label: 'Ids',
            }),
            getTextInputBlock({
                key: 'owner',
                description: 'Username of the owner of the managed objects.',
                label: 'Owner',
            }),
            getTextInputBlock({
                key: 'query',
                description: 'Use query language to perform operations and/or filter the results. See: https://cumulocity.com/api/core/#tag/Query-language',
                label: 'Query',
            }),
            getTextInputBlock({
                key: 'text',
                description: 'Search for managed objects where any property value is equal to the given one. Only string values are supported.',
                label: 'Text',
            }),
            getTextInputBlock({
                key: 'type',
                description: 'The type of event to search for.',
                label: 'Type',
            }),
        ];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: InventoryQueryFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: InventoryQueryFormComponent, isStandalone: true, selector: "ps-inventory-query-form", inputs: { filter: "filter" }, ngImport: i0, template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`, isInline: true, dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "component", type: DynamicQueryFormComponent, selector: "ps-dynamic-query-form", inputs: ["filter", "params"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: InventoryQueryFormComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ps-inventory-query-form',
                    template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`,
                    standalone: true,
                    imports: [CoreModule, DynamicQueryFormComponent],
                }]
        }], propDecorators: { filter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LXF1ZXJ5LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvX2Zvcm1seS1maWVsZHMvcXVlcnktZm9ybXMvaW52ZW50b3J5LXF1ZXJ5LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFVMUQsTUFBTSxPQUFPLDJCQUEyQjtJQVJ4QztRQVNXLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDckIsZ0JBQVcsR0FBRztZQUNaLGlCQUFpQixDQUFDO2dCQUNoQixHQUFHLEVBQUUsY0FBYztnQkFDbkIsV0FBVyxFQUNULHlIQUF5SDtnQkFDM0gsS0FBSyxFQUFFLGVBQWU7YUFDdkIsQ0FBQztZQUVGLGlCQUFpQixDQUFDO2dCQUNoQixHQUFHLEVBQUUsS0FBSztnQkFDVixXQUFXLEVBQUUseURBQXlEO2dCQUN0RSxLQUFLLEVBQUUsS0FBSzthQUNiLENBQUM7WUFFRixpQkFBaUIsQ0FBQztnQkFDaEIsR0FBRyxFQUFFLE9BQU87Z0JBQ1osV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsS0FBSyxFQUFFLE9BQU87YUFDZixDQUFDO1lBRUYsaUJBQWlCLENBQUM7Z0JBQ2hCLEdBQUcsRUFBRSxPQUFPO2dCQUNaLFdBQVcsRUFDVCw4SEFBOEg7Z0JBQ2hJLEtBQUssRUFBRSxPQUFPO2FBQ2YsQ0FBQztZQUVGLGlCQUFpQixDQUFDO2dCQUNoQixHQUFHLEVBQUUsTUFBTTtnQkFDWCxXQUFXLEVBQ1Qsa0hBQWtIO2dCQUNwSCxLQUFLLEVBQUUsTUFBTTthQUNkLENBQUM7WUFFRixpQkFBaUIsQ0FBQztnQkFDaEIsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsV0FBVyxFQUFFLGtDQUFrQztnQkFDL0MsS0FBSyxFQUFFLE1BQU07YUFDZCxDQUFDO1NBQ0gsQ0FBQztLQUNIOytHQTFDWSwyQkFBMkI7bUdBQTNCLDJCQUEyQixpSEFONUI7OzRCQUVnQiwyREFFaEIsVUFBVSwrQkFBRSx5QkFBeUI7OzRGQUVwQywyQkFBMkI7a0JBUnZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFOzs0QkFFZ0I7b0JBQzFCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUseUJBQXlCLENBQUM7aUJBQ2pEOzhCQUVVLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYzh5L25neC1jb21wb25lbnRzJztcbmltcG9ydCB7IER5bmFtaWNRdWVyeUZvcm1Db21wb25lbnQgfSBmcm9tICcuL2R5bmFtaWMtcXVlcnktZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgZ2V0VGV4dElucHV0QmxvY2sgfSBmcm9tICcuL2Zvcm1seS1xdWVyeS1ibG9ja3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwcy1pbnZlbnRvcnktcXVlcnktZm9ybScsXG4gIHRlbXBsYXRlOiBgPHBzLWR5bmFtaWMtcXVlcnktZm9ybSBbZmlsdGVyXT1cImZpbHRlclwiIFtwYXJhbXNdPVwicXVlcnlQYXJhbXNcIlxuICAgID48bmctY29udGVudD48L25nLWNvbnRlbnRcbiAgPjwvcHMtZHluYW1pYy1xdWVyeS1mb3JtPmAsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb3JlTW9kdWxlLCBEeW5hbWljUXVlcnlGb3JtQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgSW52ZW50b3J5UXVlcnlGb3JtQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZmlsdGVyID0ge307XG4gIHF1ZXJ5UGFyYW1zID0gW1xuICAgIGdldFRleHRJbnB1dEJsb2NrKHtcbiAgICAgIGtleTogJ2ZyYWdtZW50VHlwZScsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ0EgY2hhcmFjdGVyaXN0aWMgd2hpY2ggaWRlbnRpZmllcyBhIG1hbmFnZWQgb2JqZWN0IG9yIGV2ZW50LCBmb3IgZXhhbXBsZSwgZ2VvbG9jYXRpb24sIGVsZWN0cmljaXR5IHNlbnNvciwgcmVsYXkgc3RhdGUuJyxcbiAgICAgIGxhYmVsOiAnRnJhZ21lbnQgVHlwZScsXG4gICAgfSksXG5cbiAgICBnZXRUZXh0SW5wdXRCbG9jayh7XG4gICAgICBrZXk6ICdpZHMnLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgbWFuYWdlZCBvYmplY3QgSURzIHRvIHNlYXJjaCBmb3IgKGNvbW1hIHNlcGFyYXRlZCkuJyxcbiAgICAgIGxhYmVsOiAnSWRzJyxcbiAgICB9KSxcblxuICAgIGdldFRleHRJbnB1dEJsb2NrKHtcbiAgICAgIGtleTogJ293bmVyJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVXNlcm5hbWUgb2YgdGhlIG93bmVyIG9mIHRoZSBtYW5hZ2VkIG9iamVjdHMuJyxcbiAgICAgIGxhYmVsOiAnT3duZXInLFxuICAgIH0pLFxuXG4gICAgZ2V0VGV4dElucHV0QmxvY2soe1xuICAgICAga2V5OiAncXVlcnknLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICdVc2UgcXVlcnkgbGFuZ3VhZ2UgdG8gcGVyZm9ybSBvcGVyYXRpb25zIGFuZC9vciBmaWx0ZXIgdGhlIHJlc3VsdHMuIFNlZTogaHR0cHM6Ly9jdW11bG9jaXR5LmNvbS9hcGkvY29yZS8jdGFnL1F1ZXJ5LWxhbmd1YWdlJyxcbiAgICAgIGxhYmVsOiAnUXVlcnknLFxuICAgIH0pLFxuXG4gICAgZ2V0VGV4dElucHV0QmxvY2soe1xuICAgICAga2V5OiAndGV4dCcsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ1NlYXJjaCBmb3IgbWFuYWdlZCBvYmplY3RzIHdoZXJlIGFueSBwcm9wZXJ0eSB2YWx1ZSBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gb25lLiBPbmx5IHN0cmluZyB2YWx1ZXMgYXJlIHN1cHBvcnRlZC4nLFxuICAgICAgbGFiZWw6ICdUZXh0JyxcbiAgICB9KSxcblxuICAgIGdldFRleHRJbnB1dEJsb2NrKHtcbiAgICAgIGtleTogJ3R5cGUnLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgdHlwZSBvZiBldmVudCB0byBzZWFyY2ggZm9yLicsXG4gICAgICBsYWJlbDogJ1R5cGUnLFxuICAgIH0pLFxuICBdO1xufVxuIl19