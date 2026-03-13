/**
 * Utility functions for creating and providing auto-mocked Angular services/classes for unit testing with Jest.
 *
 * @module auto-mock.helper
 */
/**
 * Automatically creates a mock object for the given class type.
 *
 * All methods are replaced with Jest mock functions (`jest.fn()`), and all properties are defined with a getter returning an empty string.
 *
 * @template T The type to mock.
 * @param obj The class constructor to mock.
 * @returns {T} The mocked instance of the class.
 */
export function autoMock(obj) {
    const res = {};
    const keys = Object.getOwnPropertyNames(obj.prototype);
    const allMethods = keys.filter((key) => {
        try {
            return typeof obj.prototype[key] === 'function';
        }
        catch (error) {
            return false;
        }
    });
    const allProperties = keys.filter((x) => !allMethods.includes(x));
    allMethods.forEach((method) => (res[method] = jest.fn()));
    allProperties.forEach((property) => {
        Object.defineProperty(res, property, {
            get: function () {
                return '';
            },
            configurable: true,
        });
    });
    return res;
}
/**
 * Provides an Angular provider for a mocked class using autoMock.
 * Example to mock the `InventoryService`:
 *
 * TestBed.configureTestingModule({
 *   providers: [provideMock(InventoryService)],
 * });
 *
 * @template T The type to mock.
 * @param type The class constructor to mock.
 * @returns {Provider} An Angular provider with the mock as useValue.
 */
export function provideMock(type) {
    const mock = autoMock(type);
    return { provide: type, useValue: mock };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1tb2NrLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL2F1dG8tbW9jay5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQU9IOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLFFBQVEsQ0FBSSxHQUE4QjtJQUN4RCxNQUFNLEdBQUcsR0FBRyxFQUFTLENBQUM7SUFFdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV2RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDckMsSUFBSSxDQUFDO1lBQ0gsT0FBTyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxDQUFDO1FBQ2xELENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTFELGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNqQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUU7WUFDbkMsR0FBRyxFQUFFO2dCQUNILE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQztZQUNELFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBSSxJQUErQjtJQUM1RCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQzNDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFV0aWxpdHkgZnVuY3Rpb25zIGZvciBjcmVhdGluZyBhbmQgcHJvdmlkaW5nIGF1dG8tbW9ja2VkIEFuZ3VsYXIgc2VydmljZXMvY2xhc3NlcyBmb3IgdW5pdCB0ZXN0aW5nIHdpdGggSmVzdC5cbiAqXG4gKiBAbW9kdWxlIGF1dG8tbW9jay5oZWxwZXJcbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3MgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudCAqL1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBdXRvbWF0aWNhbGx5IGNyZWF0ZXMgYSBtb2NrIG9iamVjdCBmb3IgdGhlIGdpdmVuIGNsYXNzIHR5cGUuXG4gKlxuICogQWxsIG1ldGhvZHMgYXJlIHJlcGxhY2VkIHdpdGggSmVzdCBtb2NrIGZ1bmN0aW9ucyAoYGplc3QuZm4oKWApLCBhbmQgYWxsIHByb3BlcnRpZXMgYXJlIGRlZmluZWQgd2l0aCBhIGdldHRlciByZXR1cm5pbmcgYW4gZW1wdHkgc3RyaW5nLlxuICpcbiAqIEB0ZW1wbGF0ZSBUIFRoZSB0eXBlIHRvIG1vY2suXG4gKiBAcGFyYW0gb2JqIFRoZSBjbGFzcyBjb25zdHJ1Y3RvciB0byBtb2NrLlxuICogQHJldHVybnMge1R9IFRoZSBtb2NrZWQgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXV0b01vY2s8VD4ob2JqOiBuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogVCB7XG4gIGNvbnN0IHJlcyA9IHt9IGFzIGFueTtcblxuICBjb25zdCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqLnByb3RvdHlwZSk7XG5cbiAgY29uc3QgYWxsTWV0aG9kcyA9IGtleXMuZmlsdGVyKChrZXkpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmoucHJvdG90eXBlW2tleV0gPT09ICdmdW5jdGlvbic7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGFsbFByb3BlcnRpZXMgPSBrZXlzLmZpbHRlcigoeCkgPT4gIWFsbE1ldGhvZHMuaW5jbHVkZXMoeCkpO1xuXG4gIGFsbE1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiAocmVzW21ldGhvZF0gPSBqZXN0LmZuKCkpKTtcblxuICBhbGxQcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcywgcHJvcGVydHksIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gcmVzIGFzIFQ7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYW4gQW5ndWxhciBwcm92aWRlciBmb3IgYSBtb2NrZWQgY2xhc3MgdXNpbmcgYXV0b01vY2suXG4gKiBFeGFtcGxlIHRvIG1vY2sgdGhlIGBJbnZlbnRvcnlTZXJ2aWNlYDpcbiAqXG4gKiBUZXN0QmVkLmNvbmZpZ3VyZVRlc3RpbmdNb2R1bGUoe1xuICogICBwcm92aWRlcnM6IFtwcm92aWRlTW9jayhJbnZlbnRvcnlTZXJ2aWNlKV0sXG4gKiB9KTtcbiAqXG4gKiBAdGVtcGxhdGUgVCBUaGUgdHlwZSB0byBtb2NrLlxuICogQHBhcmFtIHR5cGUgVGhlIGNsYXNzIGNvbnN0cnVjdG9yIHRvIG1vY2suXG4gKiBAcmV0dXJucyB7UHJvdmlkZXJ9IEFuIEFuZ3VsYXIgcHJvdmlkZXIgd2l0aCB0aGUgbW9jayBhcyB1c2VWYWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVNb2NrPFQ+KHR5cGU6IG5ldyAoLi4uYXJnczogYW55W10pID0+IFQpOiBQcm92aWRlciB7XG4gIGNvbnN0IG1vY2sgPSBhdXRvTW9jayh0eXBlKTtcblxuICByZXR1cm4geyBwcm92aWRlOiB0eXBlLCB1c2VWYWx1ZTogbW9jayB9O1xufVxuIl19