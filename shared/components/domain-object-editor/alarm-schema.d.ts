export declare const ALARM_SCHEMA: {
    readonly $schema: "http://json-schema.org/draft-07/schema#";
    readonly title: "IAlarm";
    readonly type: "object";
    readonly required: readonly ["severity", "type", "time", "text"];
    readonly properties: {
        readonly severity: {
            readonly description: "Specifies the severity of an alarm";
            readonly allOf: readonly [{
                readonly $ref: "#/definitions/SeverityType";
            }];
        };
        readonly source: {
            readonly description: "Specifies which device has the alarm";
            readonly allOf: readonly [{
                readonly $ref: "#/definitions/ISource";
            }];
        };
        readonly type: {
            readonly type: "string";
            readonly description: "Type of the alarm";
        };
        readonly time: {
            readonly type: "string";
            readonly description: "Time when the alarm occurred";
            readonly format: "date-time";
        };
        readonly text: {
            readonly type: "string";
            readonly description: "Alarm text";
        };
        readonly id: {
            readonly description: "Identifier of the alarm";
            readonly type: readonly ["string", "number"];
        };
        readonly status: {
            readonly description: "Current status of the alarm";
            readonly allOf: readonly [{
                readonly $ref: "#/definitions/AlarmStatusType";
            }];
        };
        readonly count: {
            readonly type: "number";
            readonly description: "How many times the same alarm appeared";
        };
        readonly name: {
            readonly type: "string";
            readonly description: "Name of the alarm";
        };
        readonly history: {
            readonly type: "object";
            readonly description: "Object with audit records as array";
        };
        readonly self: {
            readonly type: "string";
            readonly description: "Self link to the alarm";
        };
        readonly creationTime: {
            readonly type: "string";
            readonly description: "When was the alarm created as first instance";
            readonly format: "date-time";
        };
        readonly firstOccurrenceTime: {
            readonly type: "string";
            readonly description: "The time when the alarm first occurred";
            readonly format: "date-time";
        };
    };
    readonly additionalProperties: true;
    readonly definitions: {
        readonly SeverityType: {
            readonly type: "string";
            readonly enum: readonly ["CRITICAL", "MAJOR", "MINOR", "WARNING"];
        };
        readonly AlarmStatusType: {
            readonly type: "string";
            readonly enum: readonly ["ACKNOWLEDGED", "CLEARED", "ACTIVE"];
        };
        readonly ISource: {
            readonly type: "object";
            readonly description: "Placeholder for ISource definition";
        };
    };
};
