import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FetchClient } from '@c8y/client';
import { throttle } from '@c8y/ngx-components';
import { isArray, isEmpty } from 'lodash';
import * as i0 from "@angular/core";
export class LocationGeocoderService {
    constructor() {
        this.geoCodeSearchUrl = `https://nominatim.openstreetmap.org`;
    }
    async geoCode(address) {
        const response = await new FetchClient(`${this.geoCodeSearchUrl}`).fetch(`search?city=${address}&format=json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        const data = (await response.json());
        if (isArray(data) && !isEmpty(data)) {
            const { lat, lon } = data[0];
            return { lat: parseFloat(lat), lon: parseFloat(lon) };
        }
        return undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocationGeocoderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocationGeocoderService }); }
}
__decorate([
    throttle(200)
], LocationGeocoderService.prototype, "geoCode", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: LocationGeocoderService, decorators: [{
            type: Injectable
        }], propDecorators: { geoCode: [] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24tZ2VvY29kZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9sb2NhdGlvbi1nZW9jb2Rlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sUUFBUSxDQUFDOztBQW1CMUMsTUFBTSxPQUFPLHVCQUF1QjtJQURwQztRQUVFLHFCQUFnQixHQUFHLHFDQUFxQyxDQUFDO0tBd0IxRDtJQXJCTyxBQUFOLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZTtRQUMzQixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQ3RFLGVBQWUsT0FBTyxjQUFjLEVBQ3BDO1lBQ0UsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsTUFBTSxFQUFFLGtCQUFrQjthQUMzQjtTQUNGLENBQ0YsQ0FBQztRQUVGLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQTRCLENBQUM7UUFFaEUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNwQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDeEQsQ0FBQztRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7K0dBeEJVLHVCQUF1QjttSEFBdkIsdUJBQXVCOztBQUk1QjtJQURMLFFBQVEsQ0FBQyxHQUFHLENBQUM7c0RBcUJiOzRGQXhCVSx1QkFBdUI7a0JBRG5DLFVBQVU7OEJBS0gsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZldGNoQ2xpZW50IH0gZnJvbSAnQGM4eS9jbGllbnQnO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICdAYzh5L25neC1jb21wb25lbnRzJztcbmltcG9ydCB7IGlzQXJyYXksIGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbnRlcmZhY2UgTm9taW5hdGltTG9jYXRpb25EYXRhIHtcbiAgcGxhY2VfaWQ6IG51bWJlcjtcbiAgbGljZW5jZTogc3RyaW5nO1xuICBvc21fdHlwZTogc3RyaW5nO1xuICBvc21faWQ6IG51bWJlcjtcbiAgbGF0OiBzdHJpbmc7XG4gIGxvbjogc3RyaW5nO1xuICBjbGFzczogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHBsYWNlX3Jhbms6IG51bWJlcjtcbiAgaW1wb3J0YW5jZTogbnVtYmVyO1xuICBhZGRyZXNzdHlwZTogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGRpc3BsYXlfbmFtZTogc3RyaW5nO1xuICBib3VuZGluZ2JveDogW3N0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZ107XG59XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYXRpb25HZW9jb2RlclNlcnZpY2Uge1xuICBnZW9Db2RlU2VhcmNoVXJsID0gYGh0dHBzOi8vbm9taW5hdGltLm9wZW5zdHJlZXRtYXAub3JnYDtcblxuICBAdGhyb3R0bGUoMjAwKVxuICBhc3luYyBnZW9Db2RlKGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8eyBsYXQ6IG51bWJlcjsgbG9uOiBudW1iZXIgfSB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbmV3IEZldGNoQ2xpZW50KGAke3RoaXMuZ2VvQ29kZVNlYXJjaFVybH1gKS5mZXRjaChcbiAgICAgIGBzZWFyY2g/Y2l0eT0ke2FkZHJlc3N9JmZvcm1hdD1qc29uYCxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IGRhdGEgPSAoYXdhaXQgcmVzcG9uc2UuanNvbigpKSBhcyBOb21pbmF0aW1Mb2NhdGlvbkRhdGFbXTtcblxuICAgIGlmIChpc0FycmF5KGRhdGEpICYmICFpc0VtcHR5KGRhdGEpKSB7XG4gICAgICBjb25zdCB7IGxhdCwgbG9uIH0gPSBkYXRhWzBdO1xuICAgICAgcmV0dXJuIHsgbGF0OiBwYXJzZUZsb2F0KGxhdCksIGxvbjogcGFyc2VGbG9hdChsb24pIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIl19