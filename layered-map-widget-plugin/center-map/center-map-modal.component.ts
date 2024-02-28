import { AfterViewInit, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalLabels } from '@c8y/ngx-components';
import { LatLng, latLng, Map as LMap, MapOptions, tileLayer } from 'leaflet';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocationGeocoderService } from '../service/location-geocoder.service';

@Component({
  providers: [LocationGeocoderService],
  styleUrls: ['./center-map-modal.component.less'],
  templateUrl: './center-map-modal.component.html',
})
export class CenterMapModalComponent implements AfterViewInit {
  title = 'Configure your maps bounds and zoom-level';
  closeSubject: Subject<{
    lat: number;
    long: number;
    zoomLevel: number;
  }> = new Subject();
  labels: ModalLabels = {
    ok: 'Save',
    cancel: 'Cancel',
  };

  manualCenter = {
    lat: 0,
    long: 0,
    zoomLevel: 10,
  };

  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 22,
        detectRetina: true,
      }),
    ],
    zoom: this.manualCenter.zoomLevel,
    center: latLng(this.manualCenter.lat ?? 0, this.manualCenter.long ?? 0),
    attributionControl: false,
  };
  map: LMap;

  constructor(public bsModalRef: BsModalRef, private geo: LocationGeocoderService) {}

  setCenter(center: { lat: number; long: number; zoomLevel: number }) {
    this.manualCenter = center;
    this.map.setView(latLng(center.lat, center.long), center.zoomLevel);
    this.map.invalidateSize();
  }

  ngAfterViewInit(): void {
    this.map.invalidateSize();
  }

  onMapReady(map: LMap): void {
    this.map = map;
  }

  onZoomChange(zoom: number): void {
    this.manualCenter.zoomLevel = zoom;
  }

  onCenterChange(center: LatLng): void {
    this.manualCenter.lat = center.lat;
    this.manualCenter.long = center.lng;
  }

  onUserChangedZoomLevel(): void {
    this.map.setZoom(this.manualCenter.zoomLevel);
  }

  async navigateToAddress(address: string): Promise<void> {
    const coords = await this.geo.geoCode(address);
    if (coords !== null) {
      this.map.flyTo(coords, this.manualCenter.zoomLevel, { duration: 1 });
    }
  }

  detectUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.manualCenter.lat = latitude;
        this.manualCenter.long = longitude;
        this.map.flyTo([latitude, longitude], this.manualCenter.zoomLevel, { duration: 1 });
      });
    }
  }

  // - MODAL section

  // called if cancel is pressed
  onDismiss(): void {
    this.closeSubject.next(null);
  }

  // called if save is pressed
  onClose(): void {
    this.closeSubject.next(this.manualCenter);
  }
}
