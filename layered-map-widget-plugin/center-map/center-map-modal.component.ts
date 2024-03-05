import { AfterViewInit, Component, Input } from '@angular/core';
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

  @Input() center: {
    lat: number;
    long: number;
    zoomLevel: number;
  };

  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22,
        detectRetina: true,
      }),
    ],
    zoom: 10,
    center: latLng(0, 0),
    attributionControl: false,
  };
  map: LMap;

  constructor(public bsModalRef: BsModalRef, private geo: LocationGeocoderService) {}

  ngAfterViewInit(): void {
    if (this.map) {
      const { lat, long, zoomLevel } = this.center;
      if (lat && long && zoomLevel) {
        const bounds = new LatLng(lat, long);
        this.map.setView(bounds, zoomLevel);
      }
    }
  }

  onMapReady(map: LMap): void {
    this.map = map;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  onZoomChange(zoom: number): void {
    this.center.zoomLevel = zoom;
  }

  onCenterChange(center: LatLng): void {
    this.center.lat = center.lat;
    this.center.long = center.lng;
  }

  onUserChangedZoomLevel(): void {
    this.map.setZoom(this.center.zoomLevel);
  }

  async navigateToAddress(address: string): Promise<void> {
    const { lat, lon } = await this.geo.geoCode(address);
    if (!isNaN(lat) && !isNaN(lon)) {
      this.map.flyTo([lat, lon], this.center.zoomLevel, { duration: 1 });
    }
  }

  detectUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.center.lat = latitude;
        this.center.long = longitude;
        this.map.flyTo([latitude, longitude], this.center.zoomLevel, { duration: 1 });
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
    this.closeSubject.next(this.center);
  }
}
