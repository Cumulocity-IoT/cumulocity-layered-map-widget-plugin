import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { ModalLabels } from '@c8y/ngx-components';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocationGeocoderService } from '../service/location-geocoder.service';
import type * as L from 'leaflet';
import { isNil } from 'lodash';
import { MapService } from '@c8y/ngx-components/map';

@Component({
  providers: [LocationGeocoderService],
  styleUrls: ['./center-map-modal.component.less'],
  templateUrl: './center-map-modal.component.html',
})
export class CenterMapModalComponent implements AfterViewInit, OnDestroy {
  leaf!: typeof L;
  map?: L.Map;
  @ViewChild('centerMap', { read: ElementRef, static: true }) mapReference!: ElementRef;
  private destroy$ = new Subject<void>();

  title = 'Configure your maps bounds and zoom-level';
  closeSubject: Subject<
    | {
        lat: number;
        long: number;
        zoomLevel: number;
      }
    | undefined
  > = new Subject();
  labels: ModalLabels = {
    ok: 'Save',
    cancel: 'Cancel',
  };

  @Input() center!: {
    lat: number;
    long: number;
    zoomLevel: number;
  };

  constructor(public bsModalRef: BsModalRef, private geo: LocationGeocoderService, private mapService: MapService) {}

  async ngAfterViewInit() {
    this.leaf = await this.mapService.getLeaflet();
    const options: L.MapOptions = {
      zoom: 15,
      layers: [
        this.leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 22,
          detectRetina: true,
        }),
      ],
      center: this.leaf.latLng(51.23544, 6.79599), // Düsseldorf
      attributionControl: false,
      scrollWheelZoom: false,
    };
    this.map = this.leaf.map(this.mapReference.nativeElement, options).setView(this.leaf.latLng(51.505, -0.09), 13);

    const { lat, long, zoomLevel } = this.center;
    if (lat && long && zoomLevel) {
      const bounds = this.leaf.latLng(lat, long);
      this.map.setView(bounds, zoomLevel);
    }

    fromEvent<L.LeafletEvent>(this.map, 'zoomend')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const zoom = this.map!.getZoom();
        this.center.zoomLevel = zoom;
      });

    fromEvent<L.DragEndEvent>(this.map, 'dragend')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const center = this.map!.getCenter();
        this.center.lat = center.lat;
        this.center.long = center.lng;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMapReady(map: L.Map): void {
    this.map = map;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  onUserChangedZoomLevel(): void {
    this.map?.setZoom(this.center.zoomLevel);
  }

  async navigateToAddress(address: string): Promise<void> {
    const { lat, lon } = await this.geo.geoCode(address);
    if (!isNil(lat) && !isNaN(lat) && !isNil(lon) && !isNaN(lon)) {
      this.map?.flyTo([lat, lon], this.center.zoomLevel, { duration: 1 });
      this.center.lat = lat;
      this.center.long = lon;
    }
  }

  detectUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.center.lat = latitude;
        this.center.long = longitude;
        this.map?.flyTo([latitude, longitude], this.center.zoomLevel, { duration: 1 });
      });
    }
  }

  // - MODAL section

  // called if cancel is pressed
  onDismiss(): void {
    this.closeSubject.next(undefined);
  }

  // called if save is pressed
  onClose(): void {
    this.closeSubject.next(this.center);
  }
}
