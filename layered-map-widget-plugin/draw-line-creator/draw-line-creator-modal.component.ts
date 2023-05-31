import { AfterViewInit, Component } from "@angular/core";
import { Subject } from "rxjs";
import { ModalLabels } from "@c8y/ngx-components";
import {
  latLng,
  LatLng,
  LeafletMouseEvent,
  Map as LMap,
  MapOptions,
  polyline,
  Polyline,
  tileLayer,
} from "leaflet";
import { isEmpty } from "lodash-es";
import { BsModalRef } from "ngx-bootstrap/modal";
import { LocationGeocoderService } from "../service/location-geocoder.service";
import { ITrack } from "../layered-map-widget.model";

@Component({
  providers: [LocationGeocoderService],
  templateUrl: "./draw-line-creator-modal.component.html",
  styleUrls: ["./draw-line-creator-modal.component.less"],
})
export class DrawLineCreatorModalComponent implements AfterViewInit {
  title = "Create track";
  closeSubject: Subject<ITrack | null> = new Subject();
  labels: ModalLabels = {
    ok: "Create",
    cancel: "Cancel",
  };

  isDrawingLine = false;
  mouseLines: Polyline[] = [];

  coordinates: LatLng[] = [];
  line: Polyline;
  mouseMoveLine: Polyline;

  trackName: string;

  options: MapOptions = {
    layers: [
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        opacity: 0.7,
        maxZoom: 22,
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
    private geo: LocationGeocoderService
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

  async navigateToAddress(address: string): Promise<void> {
    const coords = await this.geo.geoCode(address);
    if (coords !== null) {
      this.map.flyTo(coords, 17, { duration: 1 });
    }
  }

  startDrawingLine(): void {
    this.isDrawingLine = true;
    document.getElementById("draw-line-map").style.cursor = "crosshair";
    this.map.dragging.disable();
  }

  pauseDrawingLine(): void {
    this.isDrawingLine = false;
    document.getElementById("draw-line-map").style.cursor = "";
    this.map.dragging.enable();
  }

  resetLine(): void {
    this.coordinates = [];
    if (!isEmpty(this.mouseLines)) {
      this.mouseLines.forEach((line) => line.removeFrom(this.map));
      this.mouseLines = [];
    }
    if (this.mouseMoveLine) {
      this.mouseMoveLine.removeFrom(this.map);
      this.mouseMoveLine = null;
    }
  }

  onMouseDown(event: LeafletMouseEvent): void {
    if (this.isDrawingLine) {
      this.coordinates.push(event.latlng);
      const length = this.coordinates.length;
      if (length > 1) {
        const line = polyline([this.coordinates[length - 2], event.latlng]);
        line.addTo(this.map);
        this.mouseLines.push(line);
      }
    }
  }

  onMouseMove(event: LeafletMouseEvent): void {
    if (this.isDrawingLine) {
      if (!isEmpty(this.coordinates)) {
        const last = this.coordinates[this.coordinates.length - 1];
        if (this.mouseMoveLine) {
          this.mouseMoveLine.removeFrom(this.map);
        }
        this.mouseMoveLine = polyline([last, event.latlng]);
        this.mouseMoveLine.addTo(this.map);
      }
    }
  }

  onMouseOut(): void {
    if (this.isDrawingLine && this.mouseMoveLine) {
      this.mouseMoveLine.removeFrom(this.map);
      this.mouseMoveLine = null;
    }
  }

  // - MODAL section

  // called if cancel is pressed
  onDismiss(): void {
    this.closeSubject.next(null);
  }

  // called if save is pressed
  onClose(): void {
    this.pauseDrawingLine();

    this.closeSubject.next({
      name: this.trackName,
      coords: this.coordinates,
      createDate: new Date(),
    });
  }
}
