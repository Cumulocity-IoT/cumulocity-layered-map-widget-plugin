export declare const OPERATION_SCHEMA: {
    readonly $schema: "http://json-schema.org/draft-07/schema#";
    readonly title: "IOperation";
    readonly type: "object";
    readonly required: readonly [];
    readonly properties: {
        readonly id: {
            readonly description: "Identifier for operation";
            readonly type: readonly ["string", "number"];
        };
        readonly deviceId: {
            readonly type: "string";
            readonly description: "Identifies the target device on which this operation should be performed";
        };
        readonly status: {
            readonly description: "Status of operation, see [[OperationStatus]]";
            readonly allOf: readonly [{
                readonly $ref: "#/definitions/OperationStatus";
            }];
        };
    };
    readonly additionalProperties: true;
    readonly definitions: {
        readonly OperationStatus: {
            readonly description: "Placeholder for OperationStatus enum or type";
            readonly type: "string";
        };
    };
};
