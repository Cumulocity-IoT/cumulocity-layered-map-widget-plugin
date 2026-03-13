import { AfterViewInit, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { IManagedObject } from '@c8y/client';
import { ModalLabels } from '@c8y/ngx-components';
import { latLng, LatLng, Map as LMap, MapOptions, polyline, Polyline, tileLayer } from 'leaflet';
import { LayeredMapWidgetService } from '../service/layered-map-widget.service';
import { isEmpty } from 'lodash';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ITrack } from '../layered-map-widget.model';

type IEventsForm = {
  deviceId: number | null;
  startDate: Date | null;
  startTime: Date | null;
  endDate: Date | null;
  endTime: Date | null;
  trackName: string;
};

@Component({
  providers: [LayeredMapWidgetService],
  templateUrl: './event-line-creator-modal.component.html',
  styleUrls: ['./event-line-creator-modal.component.less'],
  standalone: false,
})
export class EventLineCreatorModalComponent implements AfterViewInit {
  title = 'Create track';
  closeSubject: Subject<ITrack | null> = new Subject();
  labels: ModalLabels = { ok: 'Create', cancel: 'Cancel' };
  text = 'No coordinates loaded yet.';

  items: { id: string; name: string }[] = [];

  isDrawingLine = false;
  mouseLines: Polyline[] = [];

  coordinates: LatLng[] = [];
  line: Polyline | undefined;

  eventsForm: IEventsForm = {
    deviceId: null,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    trackName: '',
  };

  isLoadingEvents = false;

  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 22,
        maxNativeZoom: 19,
        detectRetina: true,
      }),
    ],
    zoom: 1,
    center: latLng(0, 0),
    attributionControl: false,
  };

  map: LMap | undefined;

  constructor(
    public bsModalRef: BsModalRef,
    private trackService: LayeredMapWidgetService
  ) {}

  ngAfterViewInit(): void {
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  onMapReady(map: LMap): void {
    this.map = map;
  }

  userAppliedCircuitDevice(devices: IManagedObject[]): void {
    this.eventsForm.deviceId = +devices[0].id;
  }

  async onReload() {
    this.isLoadingEvents = true;
    const f = this.eventsForm;

    if (!f.startDate || !f.startTime || !f.endDate || !f.endTime) {
      this.text = 'Please provide valid start and end dates and times.';
      this.isLoadingEvents = false;

      return;
    }

    if (f.deviceId === null) {
      this.text = 'Please select a device.';
      this.isLoadingEvents = false;

      return;
    }
    const startDateAndTime = new Date(
      f.startDate.getFullYear(),
      f.startDate.getMonth(),
      f.startDate.getDate(),
      f.startTime.getHours(),
      f.startTime.getMinutes(),
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
    const coords = await this.trackService.fetchCoordinates(
      startDateAndTime,
      endDateAndTime,
      f.deviceId
    );

    this.isLoadingEvents = false;

    if (isEmpty(coords)) {
      this.text = 'Could not find any coordinates for timeframe.';

      return;
    }

    if (this.line && this.map) {
      this.line.removeFrom(this.map);
      this.line = polyline(coords ?? []);
      this.line.addTo(this.map);
      this.map.fitBounds(this.line.getBounds());

      this.coordinates = coords ?? [];
      this.text = `Loaded ${(coords ?? []).length} coordinates.`;
    }
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
