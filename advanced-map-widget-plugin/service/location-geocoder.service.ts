import { Injectable } from "@angular/core";
import { FetchClient } from "@c8y/client";
import { LatLng } from "leaflet";
import { isEmpty } from "lodash-es";

@Injectable()
export class LocationGeocoderService {
  mapKey = "MgOKczqMYTkXK5jiMgEYGvjnTHf562mA";
  geoCodeSearchUrl = `http://www.mapquestapi.com/geocoding/v1/address`;

  constructor() {}

  async geoCode(address: string): Promise<LatLng | null> {
    const response = await new FetchClient(this.geoCodeSearchUrl).fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ location: address, maxResults: 1 }),
      params: {
        key: this.mapKey,
      },
    });

    const data = (await response.json()) as {
      results: [{ locations: [{ latLng: { lat: number; lng: number } }] }];
    };
    if (!isEmpty(data?.results) && !isEmpty(data.results[0]?.locations)) {
      const { lat, lng } = data.results[0].locations[0].latLng;
      return new LatLng(lat, lng);
    }

    return null;
  }
}
