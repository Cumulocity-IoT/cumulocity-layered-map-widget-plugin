export const EVENT_SCHEMA = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'IEvent',
    type: 'object',
    required: ['type', 'time', 'text'],
    properties: {
        source: {
            description: 'The ManagedObject that the event originated from, see [[ISource]]',
            allOf: [
                {
                    $ref: '#/definitions/ISource',
                },
            ],
        },
        type: {
            type: 'string',
            description: 'Identifies the type of this event',
        },
        time: {
            type: 'string',
            description: 'Time of the event',
            format: 'date-time',
        },
        text: {
            type: 'string',
            description: 'Text description of the event',
        },
        id: {
            description: 'Uniquely identifies an event',
            type: ['string', 'number'],
        },
        self: {
            type: 'string',
            description: 'Link to this resource',
            format: 'uri',
        },
        creationTime: {
            type: 'string',
            description: 'Time when event was created in the database',
            format: 'date-time',
        },
    },
    additionalProperties: true,
    definitions: {
        ISource: {
            type: 'object',
            description: 'Placeholder for ISource definition',
            required: ['id'],
            properties: {
                id: {
                    type: 'string',
                },
                name: {
                    type: 'string',
                },
                self: {
                    type: 'string',
                    format: 'uri',
                },
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZG9tYWluLW9iamVjdC1lZGl0b3IvZXZlbnQtc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRztJQUMxQixPQUFPLEVBQUUseUNBQXlDO0lBQ2xELEtBQUssRUFBRSxRQUFRO0lBQ2YsSUFBSSxFQUFFLFFBQVE7SUFDZCxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUNsQyxVQUFVLEVBQUU7UUFDVixNQUFNLEVBQUU7WUFDTixXQUFXLEVBQUUsbUVBQW1FO1lBQ2hGLEtBQUssRUFBRTtnQkFDTDtvQkFDRSxJQUFJLEVBQUUsdUJBQXVCO2lCQUM5QjthQUNGO1NBQ0Y7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSxtQ0FBbUM7U0FDakQ7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsTUFBTSxFQUFFLFdBQVc7U0FDcEI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSwrQkFBK0I7U0FDN0M7UUFDRCxFQUFFLEVBQUU7WUFDRixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7U0FDM0I7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsTUFBTSxFQUFFLEtBQUs7U0FDZDtRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLDZDQUE2QztZQUMxRCxNQUFNLEVBQUUsV0FBVztTQUNwQjtLQUNGO0lBQ0Qsb0JBQW9CLEVBQUUsSUFBSTtJQUMxQixXQUFXLEVBQUU7UUFDWCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2hCLFVBQVUsRUFBRTtnQkFDVixFQUFFLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtvQkFDZCxNQUFNLEVBQUUsS0FBSztpQkFDZDthQUNGO1NBQ0Y7S0FDRjtDQUNPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgRVZFTlRfU0NIRU1BID0ge1xuICAkc2NoZW1hOiAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjJyxcbiAgdGl0bGU6ICdJRXZlbnQnLFxuICB0eXBlOiAnb2JqZWN0JyxcbiAgcmVxdWlyZWQ6IFsndHlwZScsICd0aW1lJywgJ3RleHQnXSxcbiAgcHJvcGVydGllczoge1xuICAgIHNvdXJjZToge1xuICAgICAgZGVzY3JpcHRpb246ICdUaGUgTWFuYWdlZE9iamVjdCB0aGF0IHRoZSBldmVudCBvcmlnaW5hdGVkIGZyb20sIHNlZSBbW0lTb3VyY2VdXScsXG4gICAgICBhbGxPZjogW1xuICAgICAgICB7XG4gICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvSVNvdXJjZScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZXNjcmlwdGlvbjogJ0lkZW50aWZpZXMgdGhlIHR5cGUgb2YgdGhpcyBldmVudCcsXG4gICAgfSxcbiAgICB0aW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGltZSBvZiB0aGUgZXZlbnQnLFxuICAgICAgZm9ybWF0OiAnZGF0ZS10aW1lJyxcbiAgICB9LFxuICAgIHRleHQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZGVzY3JpcHRpb246ICdUZXh0IGRlc2NyaXB0aW9uIG9mIHRoZSBldmVudCcsXG4gICAgfSxcbiAgICBpZDoge1xuICAgICAgZGVzY3JpcHRpb246ICdVbmlxdWVseSBpZGVudGlmaWVzIGFuIGV2ZW50JyxcbiAgICAgIHR5cGU6IFsnc3RyaW5nJywgJ251bWJlciddLFxuICAgIH0sXG4gICAgc2VsZjoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZXNjcmlwdGlvbjogJ0xpbmsgdG8gdGhpcyByZXNvdXJjZScsXG4gICAgICBmb3JtYXQ6ICd1cmknLFxuICAgIH0sXG4gICAgY3JlYXRpb25UaW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGltZSB3aGVuIGV2ZW50IHdhcyBjcmVhdGVkIGluIHRoZSBkYXRhYmFzZScsXG4gICAgICBmb3JtYXQ6ICdkYXRlLXRpbWUnLFxuICAgIH0sXG4gIH0sXG4gIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB0cnVlLFxuICBkZWZpbml0aW9uczoge1xuICAgIElTb3VyY2U6IHtcbiAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgZGVzY3JpcHRpb246ICdQbGFjZWhvbGRlciBmb3IgSVNvdXJjZSBkZWZpbml0aW9uJyxcbiAgICAgIHJlcXVpcmVkOiBbJ2lkJ10sXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZjoge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIGZvcm1hdDogJ3VyaScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59IGFzIGNvbnN0O1xuIl19