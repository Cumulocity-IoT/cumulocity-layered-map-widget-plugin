import { ApplicationRef, ComponentRef, createComponent, Injectable } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { MyLayer } from '../layered-map-widget.model';
import { Marker } from 'leaflet';
import { get } from 'lodash';

@Injectable({ providedIn: 'root' })
export class PopUpService {
  constructor(private applicationRef: ApplicationRef) {}

  getPopup(popupData: { deviceId: string; layer: MyLayer }): {
    html: HTMLElement;
    ref: ComponentRef<PopupComponent>;
  } {
    const popup = document.createElement('popup-component');

    const popupComponentRef = createComponent(PopupComponent, {
      environmentInjector: this.applicationRef.injector,
      hostElement: popup,
    });

    this.applicationRef.attachView(popupComponentRef.hostView);
    popupComponentRef.instance.content = popupData;

    return { html: popup, ref: popupComponentRef };
  }

  getPopupComponent(marker: Marker): PopupComponent {
    const popup = get(marker.getPopup(), 'ref') as ComponentRef<PopupComponent>;
    return popup.instance;
  }
}
