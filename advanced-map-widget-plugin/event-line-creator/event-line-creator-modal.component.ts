import { AfterViewInit, Component } from "@angular/core";
import { Subject } from "rxjs";
import { IManagedObject } from "@c8y/client";
import { ModalLabels } from "@c8y/ngx-components";
import {
  latLng,
  LatLng,
  Map as LMap,
  MapOptions,
  polyline,
  Polyline,
  tileLayer,
} from "leaflet";
import { AdvancedMapWidgetService } from "../service/advanced-map-widget.service";
import { isEmpty } from "lodash-es";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ITrack } from "../advanced-map-widget.model";

type IEventsForm = {
  deviceId: number;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  trackName: string;
};

@Component({
  providers: [AdvancedMapWidgetService],
  templateUrl: "./event-line-creator-modal.component.html",
  styleUrls: ["./event-line-creator-modal.component.less"],
})
export class EventLineCreatorModalComponent implements AfterViewInit {
  title = "Create track";
  closeSubject: Subject<ITrack | null> = new Subject();
  labels: ModalLabels = { ok: "Create", cancel: "Cancel" };
  text = "No coordinates loaded yet.";

  items: { id: string; name: string }[] = [];

  isDrawingLine = false;
  mouseLines: Polyline[] = [];

  coordinates: LatLng[] = [];
  line: Polyline;

  eventsForm: IEventsForm = {
    deviceId: null,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    trackName: null,
  };
  isLoadingEvents = false;

  options: MapOptions = {
    layers: [
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        opacity: 0.7,
        maxZoom: 19,
        detectRetina: true,
      }),
    ],
    zoom: 1,
    center: latLng(0, 0),
    attributionControl: false,
  };
  map: LMap;

  constructor(
    public bsModalRef: BsModalRef,
    private trackService: AdvancedMapWidgetService
  ) {}

  ngAfterViewInit(): void {
    this.map.invalidateSize();
  }

  onMapReady(map: LMap): void {
    this.map = map;
  }

  onResized(): void {
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  userAppliedCircuitDevice(devices: IManagedObject[]): void {
    this.eventsForm.deviceId = +devices[0].id;
  }

  async onReload() {
    this.isLoadingEvents = true;
    const f = this.eventsForm;
    const startDateAndTime = new Date(
      f.startDate.getFullYear(),
      f.startDate.getMonth(),
      f.startDate.getDate(),
      f.startTime.getHours(),
      f.startDate.getMinutes(),
      f.startTime.getSeconds()
    ).toISOString();
    const endDateAndTime = new Date(
      f.endDate.getFullYear(),
      f.endDate.getMonth(),
      f.endDate.getDate(),
      f.endTime.getHours(),
      f.endTime.getMinutes(),
      f.endTime.getSeconds()
    ).toISOString();
    let coords = await this.trackService.fetchCoordinates(
      startDateAndTime,
      endDateAndTime,
      f.deviceId
    );
    this.isLoadingEvents = false;
    if (isEmpty(coords)) {
      this.text = "Could not find any coordinates for timeframe.";
      return;
    }

    if (this.line) {
      this.line.removeFrom(this.map);
    }
    this.line = polyline(coords);
    this.line.addTo(this.map);
    this.map.fitBounds(this.line.getBounds());

    this.coordinates = coords;
    this.text = `Loaded ${coords.length} coordinates.`;
  }

  // - MODAL section

  // called if cancel is pressed
  onDismiss(): void {
    this.closeSubject.next(null);
  }

  // called if save is pressed
  onClose(): void {
    this.closeSubject.next({
      name: this.eventsForm.trackName,
      coords: this.coordinates,
      createDate: new Date(),
    });
  }
}
