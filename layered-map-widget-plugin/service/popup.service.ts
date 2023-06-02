import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
} from "@angular/core";
import { PopupComponent } from "../popup/popup.component";
import { MyLayer } from "../layered-map-widget.model";
import { Marker } from "leaflet";
import { get } from "lodash";

@Injectable({ providedIn: "root" })
export class PopUpService {
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  getPopup(popupData: { deviceId: string; layer: MyLayer }): {
    html: HTMLElement;
    ref: ComponentRef<PopupComponent>;
  } {
    // Create element
    const popup = document.createElement("popup-component");

    // Create the component and wire it up with the element
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const popupComponentRef = factory.create(this.injector, [], popup);

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(popupComponentRef.hostView);

    // Set the message
    popupComponentRef.instance.content = popupData;

    // Return rendered Component
    return { html: popup, ref: popupComponentRef };
  }

  getPopupComponent(marker: Marker<any>): PopupComponent {
    const popup = get(marker.getPopup(), "ref") as ComponentRef<PopupComponent>;
    return popup.instance;
  }
}
