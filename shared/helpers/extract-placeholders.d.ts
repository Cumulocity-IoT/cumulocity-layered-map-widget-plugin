/**
 * Recursively walks an object/array and extracts unique template placeholders
 * of the form `{{ ... }}` along with the path where they were found.
 * Returns placeholders in encounter order.
 */
export declare function extractPlaceholdersFromObject(obj: unknown): {
    key: string;
    path: string;
}[];
export declare function removePlaceholders(obj: object): void;
