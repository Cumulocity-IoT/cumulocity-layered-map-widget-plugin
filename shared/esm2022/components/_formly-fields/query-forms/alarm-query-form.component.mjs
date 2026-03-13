import { Component, Input } from '@angular/core';
import { Severity, AlarmStatus } from '@c8y/client';
import { CoreModule } from '@c8y/ngx-components';
import { DynamicQueryFormComponent } from './dynamic-query-form.component';
import { getDateFromBlock, getDateToBlock } from './formly-query-blocks';
import * as i0 from "@angular/core";
export class AlarmQueryFormComponent {
    constructor() {
        this.filter = {};
        this.queryParams = [
            getDateFromBlock({
                key: 'createdFrom',
                label: 'Created from',
                description: 'Start date or date and time of the alarm creation.',
            }),
            getDateToBlock({
                key: 'createdTo',
                label: 'Created to',
                description: 'End date or date and time of the alarm creation.',
            }),
            getDateFromBlock({
                key: 'dateFrom',
                label: 'Date from',
                description: 'Start date or date and time of the alarm occurrence.',
            }),
            getDateToBlock({
                key: 'dateTo',
                label: 'Date to',
                description: 'End date or date and time of the alarm occurrence.',
            }),
            {
                key: 'resolved',
                type: 'checkbox',
                templateOptions: {
                    label: 'Resolved',
                    description: 'When set to true, only alarms with status CLEARED will be fetched. When set to false, alarms with status ACTIVE or ACKNOWLEDGED will be fetched.',
                },
            },
            {
                key: 'type',
                type: 'input',
                templateOptions: {
                    label: 'Alarm Type(s)',
                    placeholder: 'Enter alarm types (comma separated)',
                    description: 'The type of alarm to search for (comma separated).',
                },
            },
            {
                key: 'severity',
                type: 'select',
                defaultValue: Severity.CRITICAL,
                templateOptions: {
                    label: 'Severity',
                    options: Object.keys(Severity).map((s) => ({ value: s, label: s })),
                },
            },
            {
                key: 'status',
                type: 'select',
                defaultValue: AlarmStatus.ACTIVE,
                templateOptions: {
                    label: 'Status',
                    options: Object.keys(AlarmStatus).map((s) => ({ value: s, label: s })),
                },
            },
        ];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AlarmQueryFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AlarmQueryFormComponent, isStandalone: true, selector: "ps-alarm-query-form", inputs: { filter: "filter" }, ngImport: i0, template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`, isInline: true, dependencies: [{ kind: "ngmodule", type: CoreModule }, { kind: "component", type: DynamicQueryFormComponent, selector: "ps-dynamic-query-form", inputs: ["filter", "params"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AlarmQueryFormComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ps-alarm-query-form',
                    template: `<ps-dynamic-query-form [filter]="filter" [params]="queryParams"
    ><ng-content></ng-content
  ></ps-dynamic-query-form>`,
                    standalone: true,
                    imports: [CoreModule, DynamicQueryFormComponent],
                }]
        }], propDecorators: { filter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm0tcXVlcnktZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9fZm9ybWx5LWZpZWxkcy9xdWVyeS1mb3Jtcy9hbGFybS1xdWVyeS1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQVV6RSxNQUFNLE9BQU8sdUJBQXVCO0lBUnBDO1FBU1csV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNyQixnQkFBVyxHQUF3QjtZQUNqQyxnQkFBZ0IsQ0FBQztnQkFDZixHQUFHLEVBQUUsYUFBYTtnQkFDbEIsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLFdBQVcsRUFBRSxvREFBb0Q7YUFDbEUsQ0FBQztZQUNGLGNBQWMsQ0FBQztnQkFDYixHQUFHLEVBQUUsV0FBVztnQkFDaEIsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLFdBQVcsRUFBRSxrREFBa0Q7YUFDaEUsQ0FBQztZQUNGLGdCQUFnQixDQUFDO2dCQUNmLEdBQUcsRUFBRSxVQUFVO2dCQUNmLEtBQUssRUFBRSxXQUFXO2dCQUNsQixXQUFXLEVBQUUsc0RBQXNEO2FBQ3BFLENBQUM7WUFDRixjQUFjLENBQUM7Z0JBQ2IsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSxvREFBb0Q7YUFDbEUsQ0FBQztZQUNGO2dCQUNFLEdBQUcsRUFBRSxVQUFVO2dCQUNmLElBQUksRUFBRSxVQUFVO2dCQUNoQixlQUFlLEVBQUU7b0JBQ2YsS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLFdBQVcsRUFDVCxrSkFBa0o7aUJBQ3JKO2FBQ0Y7WUFDRDtnQkFDRSxHQUFHLEVBQUUsTUFBTTtnQkFDWCxJQUFJLEVBQUUsT0FBTztnQkFDYixlQUFlLEVBQUU7b0JBQ2YsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLFdBQVcsRUFBRSxxQ0FBcUM7b0JBQ2xELFdBQVcsRUFBRSxvREFBb0Q7aUJBQ2xFO2FBQ0Y7WUFDRDtnQkFDRSxHQUFHLEVBQUUsVUFBVTtnQkFDZixJQUFJLEVBQUUsUUFBUTtnQkFDZCxZQUFZLEVBQUUsUUFBUSxDQUFDLFFBQVE7Z0JBQy9CLGVBQWUsRUFBRTtvQkFDZixLQUFLLEVBQUUsVUFBVTtvQkFDakIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDcEU7YUFDRjtZQUNEO2dCQUNFLEdBQUcsRUFBRSxRQUFRO2dCQUNiLElBQUksRUFBRSxRQUFRO2dCQUNkLFlBQVksRUFBRSxXQUFXLENBQUMsTUFBTTtnQkFDaEMsZUFBZSxFQUFFO29CQUNmLEtBQUssRUFBRSxRQUFRO29CQUNmLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3ZFO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7K0dBNURZLHVCQUF1QjttR0FBdkIsdUJBQXVCLDZHQU54Qjs7NEJBRWdCLDJEQUVoQixVQUFVLCtCQUFFLHlCQUF5Qjs7NEZBRXBDLHVCQUF1QjtrQkFSbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUU7OzRCQUVnQjtvQkFDMUIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSx5QkFBeUIsQ0FBQztpQkFDakQ7OEJBRVUsTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2V2ZXJpdHksIEFsYXJtU3RhdHVzIH0gZnJvbSAnQGM4eS9jbGllbnQnO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJ0BjOHkvbmd4LWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgRHluYW1pY1F1ZXJ5Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vZHluYW1pYy1xdWVyeS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgZ2V0RGF0ZUZyb21CbG9jaywgZ2V0RGF0ZVRvQmxvY2sgfSBmcm9tICcuL2Zvcm1seS1xdWVyeS1ibG9ja3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwcy1hbGFybS1xdWVyeS1mb3JtJyxcbiAgdGVtcGxhdGU6IGA8cHMtZHluYW1pYy1xdWVyeS1mb3JtIFtmaWx0ZXJdPVwiZmlsdGVyXCIgW3BhcmFtc109XCJxdWVyeVBhcmFtc1wiXG4gICAgPjxuZy1jb250ZW50PjwvbmctY29udGVudFxuICA+PC9wcy1keW5hbWljLXF1ZXJ5LWZvcm0+YCxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvcmVNb2R1bGUsIER5bmFtaWNRdWVyeUZvcm1Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBbGFybVF1ZXJ5Rm9ybUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGZpbHRlciA9IHt9O1xuICBxdWVyeVBhcmFtczogRm9ybWx5RmllbGRDb25maWdbXSA9IFtcbiAgICBnZXREYXRlRnJvbUJsb2NrKHtcbiAgICAgIGtleTogJ2NyZWF0ZWRGcm9tJyxcbiAgICAgIGxhYmVsOiAnQ3JlYXRlZCBmcm9tJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnU3RhcnQgZGF0ZSBvciBkYXRlIGFuZCB0aW1lIG9mIHRoZSBhbGFybSBjcmVhdGlvbi4nLFxuICAgIH0pLFxuICAgIGdldERhdGVUb0Jsb2NrKHtcbiAgICAgIGtleTogJ2NyZWF0ZWRUbycsXG4gICAgICBsYWJlbDogJ0NyZWF0ZWQgdG8nLFxuICAgICAgZGVzY3JpcHRpb246ICdFbmQgZGF0ZSBvciBkYXRlIGFuZCB0aW1lIG9mIHRoZSBhbGFybSBjcmVhdGlvbi4nLFxuICAgIH0pLFxuICAgIGdldERhdGVGcm9tQmxvY2soe1xuICAgICAga2V5OiAnZGF0ZUZyb20nLFxuICAgICAgbGFiZWw6ICdEYXRlIGZyb20nLFxuICAgICAgZGVzY3JpcHRpb246ICdTdGFydCBkYXRlIG9yIGRhdGUgYW5kIHRpbWUgb2YgdGhlIGFsYXJtIG9jY3VycmVuY2UuJyxcbiAgICB9KSxcbiAgICBnZXREYXRlVG9CbG9jayh7XG4gICAgICBrZXk6ICdkYXRlVG8nLFxuICAgICAgbGFiZWw6ICdEYXRlIHRvJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRW5kIGRhdGUgb3IgZGF0ZSBhbmQgdGltZSBvZiB0aGUgYWxhcm0gb2NjdXJyZW5jZS4nLFxuICAgIH0pLFxuICAgIHtcbiAgICAgIGtleTogJ3Jlc29sdmVkJyxcbiAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICB0ZW1wbGF0ZU9wdGlvbnM6IHtcbiAgICAgICAgbGFiZWw6ICdSZXNvbHZlZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICdXaGVuIHNldCB0byB0cnVlLCBvbmx5IGFsYXJtcyB3aXRoIHN0YXR1cyBDTEVBUkVEIHdpbGwgYmUgZmV0Y2hlZC4gV2hlbiBzZXQgdG8gZmFsc2UsIGFsYXJtcyB3aXRoIHN0YXR1cyBBQ1RJVkUgb3IgQUNLTk9XTEVER0VEIHdpbGwgYmUgZmV0Y2hlZC4nLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3R5cGUnLFxuICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgIHRlbXBsYXRlT3B0aW9uczoge1xuICAgICAgICBsYWJlbDogJ0FsYXJtIFR5cGUocyknLFxuICAgICAgICBwbGFjZWhvbGRlcjogJ0VudGVyIGFsYXJtIHR5cGVzIChjb21tYSBzZXBhcmF0ZWQpJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgdHlwZSBvZiBhbGFybSB0byBzZWFyY2ggZm9yIChjb21tYSBzZXBhcmF0ZWQpLicsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnc2V2ZXJpdHknLFxuICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICBkZWZhdWx0VmFsdWU6IFNldmVyaXR5LkNSSVRJQ0FMLFxuICAgICAgdGVtcGxhdGVPcHRpb25zOiB7XG4gICAgICAgIGxhYmVsOiAnU2V2ZXJpdHknLFxuICAgICAgICBvcHRpb25zOiBPYmplY3Qua2V5cyhTZXZlcml0eSkubWFwKChzKSA9PiAoeyB2YWx1ZTogcywgbGFiZWw6IHMgfSkpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3N0YXR1cycsXG4gICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgIGRlZmF1bHRWYWx1ZTogQWxhcm1TdGF0dXMuQUNUSVZFLFxuICAgICAgdGVtcGxhdGVPcHRpb25zOiB7XG4gICAgICAgIGxhYmVsOiAnU3RhdHVzJyxcbiAgICAgICAgb3B0aW9uczogT2JqZWN0LmtleXMoQWxhcm1TdGF0dXMpLm1hcCgocykgPT4gKHsgdmFsdWU6IHMsIGxhYmVsOiBzIH0pKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgXTtcbn1cbiJdfQ==