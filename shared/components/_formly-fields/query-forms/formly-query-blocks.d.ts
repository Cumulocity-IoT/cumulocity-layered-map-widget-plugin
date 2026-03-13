import { FormlyFieldConfig } from '@ngx-formly/core';
/**
 * Supported relative date presets used by query-form select fields.
 */
export type FormlyDateValue = 'today' | 'now' | 'this-week' | 'week-ago' | 'this-month' | 'month-ago';
/**
 * Type guard to check whether a string matches a supported date preset.
 */
export declare function isFormlyDateValue(value: string): value is FormlyDateValue;
/**
 * Shared select options for date-based query blocks.
 */
export declare const DATE_OPTIONS: readonly [{
    readonly value: "today";
    readonly label: "Today";
}, {
    readonly value: "now";
    readonly label: "Now";
}, {
    readonly value: "this-week";
    readonly label: "This week";
}, {
    readonly value: "week-ago";
    readonly label: "A week ago";
}, {
    readonly value: "this-month";
    readonly label: "This month";
}, {
    readonly value: "month-ago";
    readonly label: "A month ago";
}];
/**
 * Creates a Formly "from" date select block with a default of `today`.
 */
export declare function getDateFromBlock(meta: {
    key: string;
    label: string;
    description: string;
}): FormlyFieldConfig;
/**
 * Creates a Formly "to" date select block with a default of `now`.
 */
export declare function getDateToBlock(meta: {
    key: string;
    label: string;
    description: string;
}): FormlyFieldConfig;
/**
 * Creates a Formly text input block for free-form query values.
 */
export declare function getTextInputBlock(meta: {
    key: string;
    label: string;
    description: string;
    placeholder?: string;
}): {
    key: string;
    type: string;
    templateOptions: {
        label: string;
        placeholder: string;
        description: string;
    };
};
/**
 * Converts a relative date preset into an absolute date value.
 */
export declare function getDateFromValue(value: FormlyDateValue): Date;
/**
 * Replaces supported date presets in an object with ISO timestamp strings.
 */
export declare function normalizeQueryFilter(params: object): object;
