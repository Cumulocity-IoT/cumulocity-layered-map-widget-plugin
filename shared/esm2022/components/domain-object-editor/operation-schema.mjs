export const OPERATION_SCHEMA = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'IOperation',
    type: 'object',
    required: [],
    properties: {
        id: {
            description: 'Identifier for operation',
            type: ['string', 'number'],
        },
        deviceId: {
            type: 'string',
            description: 'Identifies the target device on which this operation should be performed',
        },
        status: {
            description: 'Status of operation, see [[OperationStatus]]',
            allOf: [
                {
                    $ref: '#/definitions/OperationStatus',
                },
            ],
        },
    },
    additionalProperties: true,
    definitions: {
        OperationStatus: {
            description: 'Placeholder for OperationStatus enum or type',
            type: 'string',
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9uLXNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2RvbWFpbi1vYmplY3QtZWRpdG9yL29wZXJhdGlvbi1zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUc7SUFDOUIsT0FBTyxFQUFFLHlDQUF5QztJQUNsRCxLQUFLLEVBQUUsWUFBWTtJQUNuQixJQUFJLEVBQUUsUUFBUTtJQUNkLFFBQVEsRUFBRSxFQUFFO0lBQ1osVUFBVSxFQUFFO1FBQ1YsRUFBRSxFQUFFO1lBQ0YsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1NBQzNCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsMEVBQTBFO1NBQ3hGO1FBQ0QsTUFBTSxFQUFFO1lBQ04sV0FBVyxFQUFFLDhDQUE4QztZQUMzRCxLQUFLLEVBQUU7Z0JBQ0w7b0JBQ0UsSUFBSSxFQUFFLCtCQUErQjtpQkFDdEM7YUFDRjtTQUNGO0tBQ0Y7SUFDRCxvQkFBb0IsRUFBRSxJQUFJO0lBQzFCLFdBQVcsRUFBRTtRQUNYLGVBQWUsRUFBRTtZQUNmLFdBQVcsRUFBRSw4Q0FBOEM7WUFDM0QsSUFBSSxFQUFFLFFBQVE7U0FDZjtLQUNGO0NBQ08sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBPUEVSQVRJT05fU0NIRU1BID0ge1xuICAkc2NoZW1hOiAnaHR0cDovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9zY2hlbWEjJyxcbiAgdGl0bGU6ICdJT3BlcmF0aW9uJyxcbiAgdHlwZTogJ29iamVjdCcsXG4gIHJlcXVpcmVkOiBbXSxcbiAgcHJvcGVydGllczoge1xuICAgIGlkOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0lkZW50aWZpZXIgZm9yIG9wZXJhdGlvbicsXG4gICAgICB0eXBlOiBbJ3N0cmluZycsICdudW1iZXInXSxcbiAgICB9LFxuICAgIGRldmljZUlkOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnSWRlbnRpZmllcyB0aGUgdGFyZ2V0IGRldmljZSBvbiB3aGljaCB0aGlzIG9wZXJhdGlvbiBzaG91bGQgYmUgcGVyZm9ybWVkJyxcbiAgICB9LFxuICAgIHN0YXR1czoge1xuICAgICAgZGVzY3JpcHRpb246ICdTdGF0dXMgb2Ygb3BlcmF0aW9uLCBzZWUgW1tPcGVyYXRpb25TdGF0dXNdXScsXG4gICAgICBhbGxPZjogW1xuICAgICAgICB7XG4gICAgICAgICAgJHJlZjogJyMvZGVmaW5pdGlvbnMvT3BlcmF0aW9uU3RhdHVzJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbiAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHRydWUsXG4gIGRlZmluaXRpb25zOiB7XG4gICAgT3BlcmF0aW9uU3RhdHVzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ1BsYWNlaG9sZGVyIGZvciBPcGVyYXRpb25TdGF0dXMgZW51bSBvciB0eXBlJyxcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gIH0sXG59IGFzIGNvbnN0O1xuIl19