import { Injectable } from "@angular/core";
import { IEvent, EventService } from "@c8y/client";
import { has, isEmpty } from "lodash-es";
import { LatLng, polyline, Polyline } from "leaflet";
import { ILayeredMapWidgetConfig, ITrack } from "../layered-map-widget.model";

export interface ILocationUpdateEvent extends IEvent {
  c8y_Position: {
    accuracy: number;
    alt: number;
    lat: number;
    lng: number;
  };
  type: "c8y_LocationUpdate";
}

@Injectable()
export class LayeredMapWidgetService {
  constructor(private eventService: EventService) {}

  getTrack(config: ILayeredMapWidgetConfig): ITrack | null {
    if (
      has(config, "selectedTrack") &&
      has(config, "tracks") &&
      config.selectedTrack !== null &&
      !isEmpty(config.tracks)
    ) {
      return config.tracks.find((t) => t.name === config.selectedTrack);
    }
    return null;
  }

  createLines(coords: LatLng[]): Polyline[] {
    const last = coords.length - 1;
    const circuit: Polyline[] = [];
    for (let i = 0; i < last; i++) {
      const line = polyline([coords[i], coords[i + 1]]);
      circuit.push(line);
    }
    return circuit;
  }

  async fetchCoordinates(startDate: string, endDate: string, deviceId: number) {
    const events = await this.fetchHistoricEvents(startDate, endDate, deviceId);
    if (isEmpty(events)) {
      return null;
    }
    const coords = events
      .map((e) => e.c8y_Position)
      .map((pos) => new LatLng(pos.lat, pos.lng, pos.alt));
    return coords;
  }

  private fetchHistoricEvents(
    startDate: string,
    endDate: string,
    deviceId: number
  ): Promise<ILocationUpdateEvent[]> {
    const filter = {
      dateFrom: startDate,
      dateTo: endDate,
      fragmentType: "c8y_Position",
      pageSize: 2000,
      revert: true,
      source: deviceId,
    };
    return this.eventService
      .list(filter)
      .then((result) => result.data as ILocationUpdateEvent[]);
  }
}
