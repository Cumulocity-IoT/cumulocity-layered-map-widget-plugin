import { FetchClient, IFetchOptions, IFetchResponse } from '@c8y/client';
import * as i0 from "@angular/core";
export declare class MicroserviceService {
    private fetch;
    GET_OPTIONS: IFetchOptions;
    POST_OPTIONS: IFetchOptions;
    PUT_OPTIONS: IFetchOptions;
    DELETE_OPTIONS: IFetchOptions;
    defaultResponseHandler: (response: IFetchResponse) => Promise<unknown>;
    constructor(fetch: FetchClient);
    get(url: string, responseHandler?: (response: IFetchResponse) => Promise<unknown>): Promise<unknown>;
    post(url: string, data: unknown, responseHandler?: (response: IFetchResponse) => Promise<unknown>): Promise<unknown>;
    put(url: string, data: unknown, responseHandler?: (response: IFetchResponse) => Promise<unknown>): Promise<unknown>;
    delete(url: string): Promise<IFetchResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MicroserviceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MicroserviceService>;
}
