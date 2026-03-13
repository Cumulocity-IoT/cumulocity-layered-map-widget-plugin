export const ALARM_SCHEMA = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'IAlarm',
    type: 'object',
    required: ['severity', 'type', 'time', 'text'],
    properties: {
        severity: {
            description: 'Specifies the severity of an alarm',
            allOf: [
                {
                    $ref: '#/definitions/SeverityType',
                },
            ],
        },
        source: {
            description: 'Specifies which device has the alarm',
            allOf: [
                {
                    $ref: '#/definitions/ISource',
                },
            ],
        },
        type: {
            type: 'string',
            description: 'Type of the alarm',
        },
        time: {
            type: 'string',
            description: 'Time when the alarm occurred',
            format: 'date-time',
        },
        text: {
            type: 'string',
            description: 'Alarm text',
        },
        id: {
            description: 'Identifier of the alarm',
            type: ['string', 'number'],
        },
        status: {
            description: 'Current status of the alarm',
            allOf: [
                {
                    $ref: '#/definitions/AlarmStatusType',
                },
            ],
        },
        count: {
            type: 'number',
            description: 'How many times the same alarm appeared',
        },
        name: {
            type: 'string',
            description: 'Name of the alarm',
        },
        history: {
            type: 'object',
            description: 'Object with audit records as array',
        },
        self: {
            type: 'string',
            description: 'Self link to the alarm',
        },
        creationTime: {
            type: 'string',
            description: 'When was the alarm created as first instance',
            format: 'date-time',
        },
        firstOccurrenceTime: {
            type: 'string',
            description: 'The time when the alarm first occurred',
            format: 'date-time',
        },
    },
    additionalProperties: true,
    definitions: {
        SeverityType: {
            type: 'string',
            enum: ['CRITICAL', 'MAJOR', 'MINOR', 'WARNING'],
        },
        AlarmStatusType: {
            type: 'string',
            enum: ['ACKNOWLEDGED', 'CLEARED', 'ACTIVE'],
        },
        ISource: {
            type: 'object',
            description: 'Placeholder for ISource definition',
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm0tc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZG9tYWluLW9iamVjdC1lZGl0b3IvYWxhcm0tc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRztJQUMxQixPQUFPLEVBQUUseUNBQXlDO0lBQ2xELEtBQUssRUFBRSxRQUFRO0lBQ2YsSUFBSSxFQUFFLFFBQVE7SUFDZCxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDOUMsVUFBVSxFQUFFO1FBQ1YsUUFBUSxFQUFFO1lBQ1IsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxLQUFLLEVBQUU7Z0JBQ0w7b0JBQ0UsSUFBSSxFQUFFLDRCQUE0QjtpQkFDbkM7YUFDRjtTQUNGO1FBQ0QsTUFBTSxFQUFFO1lBQ04sV0FBVyxFQUFFLHNDQUFzQztZQUNuRCxLQUFLLEVBQUU7Z0JBQ0w7b0JBQ0UsSUFBSSxFQUFFLHVCQUF1QjtpQkFDOUI7YUFDRjtTQUNGO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsbUJBQW1CO1NBQ2pDO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsOEJBQThCO1lBQzNDLE1BQU0sRUFBRSxXQUFXO1NBQ3BCO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsWUFBWTtTQUMxQjtRQUNELEVBQUUsRUFBRTtZQUNGLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztTQUMzQjtRQUNELE1BQU0sRUFBRTtZQUNOLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsS0FBSyxFQUFFO2dCQUNMO29CQUNFLElBQUksRUFBRSwrQkFBK0I7aUJBQ3RDO2FBQ0Y7U0FDRjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLHdDQUF3QztTQUN0RDtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLG1CQUFtQjtTQUNqQztRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLG9DQUFvQztTQUNsRDtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLHdCQUF3QjtTQUN0QztRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLDhDQUE4QztZQUMzRCxNQUFNLEVBQUUsV0FBVztTQUNwQjtRQUNELG1CQUFtQixFQUFFO1lBQ25CLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLHdDQUF3QztZQUNyRCxNQUFNLEVBQUUsV0FBVztTQUNwQjtLQUNGO0lBQ0Qsb0JBQW9CLEVBQUUsSUFBSTtJQUMxQixXQUFXLEVBQUU7UUFDWCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQztTQUNoRDtRQUNELGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxRQUFRO1lBQ2QsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7U0FDNUM7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSxvQ0FBb0M7U0FDbEQ7S0FDRjtDQUNPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQUxBUk1fU0NIRU1BID0ge1xuICAkc2NoZW1hOiAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjJyxcbiAgdGl0bGU6ICdJQWxhcm0nLFxuICB0eXBlOiAnb2JqZWN0JyxcbiAgcmVxdWlyZWQ6IFsnc2V2ZXJpdHknLCAndHlwZScsICd0aW1lJywgJ3RleHQnXSxcbiAgcHJvcGVydGllczoge1xuICAgIHNldmVyaXR5OiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ1NwZWNpZmllcyB0aGUgc2V2ZXJpdHkgb2YgYW4gYWxhcm0nLFxuICAgICAgYWxsT2Y6IFtcbiAgICAgICAge1xuICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL1NldmVyaXR5VHlwZScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgc291cmNlOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ1NwZWNpZmllcyB3aGljaCBkZXZpY2UgaGFzIHRoZSBhbGFybScsXG4gICAgICBhbGxPZjogW1xuICAgICAgICB7XG4gICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvSVNvdXJjZScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZXNjcmlwdGlvbjogJ1R5cGUgb2YgdGhlIGFsYXJtJyxcbiAgICB9LFxuICAgIHRpbWU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZGVzY3JpcHRpb246ICdUaW1lIHdoZW4gdGhlIGFsYXJtIG9jY3VycmVkJyxcbiAgICAgIGZvcm1hdDogJ2RhdGUtdGltZScsXG4gICAgfSxcbiAgICB0ZXh0OiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQWxhcm0gdGV4dCcsXG4gICAgfSxcbiAgICBpZDoge1xuICAgICAgZGVzY3JpcHRpb246ICdJZGVudGlmaWVyIG9mIHRoZSBhbGFybScsXG4gICAgICB0eXBlOiBbJ3N0cmluZycsICdudW1iZXInXSxcbiAgICB9LFxuICAgIHN0YXR1czoge1xuICAgICAgZGVzY3JpcHRpb246ICdDdXJyZW50IHN0YXR1cyBvZiB0aGUgYWxhcm0nLFxuICAgICAgYWxsT2Y6IFtcbiAgICAgICAge1xuICAgICAgICAgICRyZWY6ICcjL2RlZmluaXRpb25zL0FsYXJtU3RhdHVzVHlwZScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgY291bnQ6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgZGVzY3JpcHRpb246ICdIb3cgbWFueSB0aW1lcyB0aGUgc2FtZSBhbGFybSBhcHBlYXJlZCcsXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnTmFtZSBvZiB0aGUgYWxhcm0nLFxuICAgIH0sXG4gICAgaGlzdG9yeToge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBkZXNjcmlwdGlvbjogJ09iamVjdCB3aXRoIGF1ZGl0IHJlY29yZHMgYXMgYXJyYXknLFxuICAgIH0sXG4gICAgc2VsZjoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZXNjcmlwdGlvbjogJ1NlbGYgbGluayB0byB0aGUgYWxhcm0nLFxuICAgIH0sXG4gICAgY3JlYXRpb25UaW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnV2hlbiB3YXMgdGhlIGFsYXJtIGNyZWF0ZWQgYXMgZmlyc3QgaW5zdGFuY2UnLFxuICAgICAgZm9ybWF0OiAnZGF0ZS10aW1lJyxcbiAgICB9LFxuICAgIGZpcnN0T2NjdXJyZW5jZVRpbWU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgZGVzY3JpcHRpb246ICdUaGUgdGltZSB3aGVuIHRoZSBhbGFybSBmaXJzdCBvY2N1cnJlZCcsXG4gICAgICBmb3JtYXQ6ICdkYXRlLXRpbWUnLFxuICAgIH0sXG4gIH0sXG4gIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB0cnVlLFxuICBkZWZpbml0aW9uczoge1xuICAgIFNldmVyaXR5VHlwZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBlbnVtOiBbJ0NSSVRJQ0FMJywgJ01BSk9SJywgJ01JTk9SJywgJ1dBUk5JTkcnXSxcbiAgICB9LFxuICAgIEFsYXJtU3RhdHVzVHlwZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBlbnVtOiBbJ0FDS05PV0xFREdFRCcsICdDTEVBUkVEJywgJ0FDVElWRSddLFxuICAgIH0sXG4gICAgSVNvdXJjZToge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBkZXNjcmlwdGlvbjogJ1BsYWNlaG9sZGVyIGZvciBJU291cmNlIGRlZmluaXRpb24nLFxuICAgIH0sXG4gIH0sXG59IGFzIGNvbnN0O1xuIl19