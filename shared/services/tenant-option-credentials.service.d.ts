import { TenantOptionsService } from '@c8y/client';
import * as i0 from "@angular/core";
export declare class TenantOptionCredentialsService {
    private tenantOptions;
    private readonly CATEGORY;
    constructor(tenantOptions: TenantOptionsService);
    /**
     * Saves the provided credentials and returns a token.
     * @param credentials - The credentials to be saved.
     * @returns A promise that resolves to the generated token.
     */
    saveCredentials(credentials: {
        username: string;
        password: string;
    }): Promise<string>;
    /**
     * Retrieves the credentials associated with the provided token.
     * @param token - The token associated with the credentials.
     * @returns A promise that resolves to the username and password.
     */
    getCredentials(token: string): Promise<{
        username: string;
        password: string;
    }>;
    /**
     * Deletes the credentials associated with the given token.
     * @param {string} token - The token for which the credentials should be deleted.
     * @returns {Promise<void>} - A promise that resolves when the credentials are successfully deleted.
     */
    deleteCredentials(token: string): Promise<[import("@c8y/client").IResult<null>, import("@c8y/client").IResult<null>]>;
    clearAllCredentials(): Promise<Promise<import("@c8y/client").IResult<null>>[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TenantOptionCredentialsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TenantOptionCredentialsService>;
}
