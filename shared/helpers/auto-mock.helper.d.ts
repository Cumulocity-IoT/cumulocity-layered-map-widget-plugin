/**
 * Utility functions for creating and providing auto-mocked Angular services/classes for unit testing with Jest.
 *
 * @module auto-mock.helper
 */
import { Provider } from '@angular/core';
/**
 * Automatically creates a mock object for the given class type.
 *
 * All methods are replaced with Jest mock functions (`jest.fn()`), and all properties are defined with a getter returning an empty string.
 *
 * @template T The type to mock.
 * @param obj The class constructor to mock.
 * @returns {T} The mocked instance of the class.
 */
export declare function autoMock<T>(obj: new (...args: any[]) => T): T;
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
export declare function provideMock<T>(type: new (...args: any[]) => T): Provider;
