import { Component, Input } from '@angular/core';

@Component({
  selector: 'event-query-form',
  template: `<dynamic-query-form [filter]="filter" [params]="queryParams"></dynamic-query-form>`,
})
export class EventQueryFormComponent {
  @Input() filter = {};
  queryParams = [
    {
      title: 'createdFrom',
      type: 'date',
      description:
        "Start date or date and time of the event's creation (set by the platform during creation).",
    },
    {
      title: 'createdTo',
      type: 'date',
      description:
        "End date or date and time of the event's creation (set by the platform during creation).",
    },
    {
      title: 'dateFrom',
      type: 'date',
      description: 'Start date or date and time of the event occurrence (provided by the device).',
    },
    {
      title: 'dateTo',
      type: 'date',
      description: 'End date or date and time of the event occurrence (provided by the device).',
    },
    {
      title: 'fragmentType',
      type: 'string',
      description:
        'A characteristic which identifies a managed object or event, for example, geolocation, electricity sensor, relay state.',
    },
    {
      title: 'fragmentValue',
      type: 'string',
      description:
        "Allows filtering events by the fragment's value, but only when provided together with fragmentType (only string values)",
    },
    {
      title: 'lastUpdatedFrom',
      type: 'date',
      description: 'Start date or date and time of the last update made.',
    },
    {
      title: 'lastUpdatedTo',
      type: 'date',
      description: 'End date or date and time of the last update made.',
    },
    {
      title: 'revert',
      type: 'boolean',
      description:
        'If you are using a range query (that is, at least one of the dateFrom or dateTo parameters is included in the request), then setting revert=true will sort the results by the oldest events first. By default, the results are sorted by the newest events first.',
    },
    {
      title: 'type',
      type: 'string',
      description: 'The type of event to search for.',
    },
  ];
}
