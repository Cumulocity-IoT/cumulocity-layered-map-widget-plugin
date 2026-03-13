export declare const EVENT_SCHEMA: {
    readonly $schema: "http://json-schema.org/draft-07/schema#";
    readonly title: "IEvent";
    readonly type: "object";
    readonly required: readonly ["type", "time", "text"];
    readonly properties: {
        readonly source: {
            readonly description: "The ManagedObject that the event originated from, see [[ISource]]";
            readonly allOf: readonly [{
                readonly $ref: "#/definitions/ISource";
            }];
        };
        readonly type: {
            readonly type: "string";
            readonly description: "Identifies the type of this event";
        };
        readonly time: {
            readonly type: "string";
            readonly description: "Time of the event";
            readonly format: "date-time";
        };
        readonly text: {
            readonly type: "string";
            readonly description: "Text description of the event";
        };
        readonly id: {
            readonly description: "Uniquely identifies an event";
            readonly type: readonly ["string", "number"];
        };
        readonly self: {
            readonly type: "string";
            readonly description: "Link to this resource";
            readonly format: "uri";
        };
        readonly creationTime: {
            readonly type: "string";
            readonly description: "Time when event was created in the database";
            readonly format: "date-time";
        };
    };
    readonly additionalProperties: true;
    readonly definitions: {
        readonly ISource: {
            readonly type: "object";
            readonly description: "Placeholder for ISource definition";
            readonly required: readonly ["id"];
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly self: {
                    readonly type: "string";
                    readonly format: "uri";
                };
            };
        };
    };
};
