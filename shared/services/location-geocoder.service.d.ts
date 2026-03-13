import * as i0 from "@angular/core";
export declare class LocationGeocoderService {
    geoCodeSearchUrl: string;
    geoCode(address: string): Promise<{
        lat: number;
        lon: number;
    } | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocationGeocoderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocationGeocoderService>;
}
