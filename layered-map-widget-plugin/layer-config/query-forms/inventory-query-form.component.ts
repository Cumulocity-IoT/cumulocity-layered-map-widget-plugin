import { Component, Input } from '@angular/core';

@Component({
  selector: 'inventory-query-form',
  template: `<dynamic-query-form [filter]="filter" [params]="queryParams"></dynamic-query-form>`,
})
export class InventoryQueryFormComponent {
  @Input() filter = {};
  queryParams = [
    {
      title: 'fragmentType',
      type: 'string',
      description:
        'A characteristic which identifies a managed object or event, for example, geolocation, electricity sensor, relay state.',
    },
    {
      title: 'ids',
      type: 'string',
      description: 'The managed object IDs to search for (comma separated).',
    },
    {
      title: 'owner',
      type: 'string',
      description: 'Username of the owner of the managed objects.',
    },
    {
      title: 'query',
      type: 'string',
      description: 'Use query language to perform operations and/or filter the results. ',
    },
    {
      title: 'text',
      type: 'string',
      description:
        'Search for managed objects where any property value is equal to the given one. Only string values are supported.',
    },
    {
      title: 'type',
      type: 'string',
      description: 'The type of event to search for.',
    },
  ];
}
