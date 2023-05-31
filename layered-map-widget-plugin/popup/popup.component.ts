import { Component, Input } from "@angular/core";
import { IEvent, IManagedObject, InventoryService } from "@c8y/client";
import { MyLayer } from "layered-map-widget-plugin/layered-map-widget.model";
import { latLng, LatLng } from "leaflet";
import { isEmpty } from "lodash-es";

@Component({
  selector: "popup-component",
  templateUrl: "./popup.component.html",
})
export class PopupComponent {
  constructor(private inventory: InventoryService) {}
  @Input() content: { deviceId: string; layer: MyLayer };
  mo: IManagedObject;
  active = false;
  line: LatLng[] = [];
  lastUpdated: string;

  onShow(): void {
    this.inventory.detail(this.content.deviceId).then((result) => {
      this.mo = result.data;
      this.lastUpdated = this.mo.lastUpdated;
    });
  }

  toggleActive(): void {
    this.active = !this.active;
    this.line = [];
  }

  onUpdate(mo: IManagedObject): void {
    this.lastUpdated = mo.lastUpdated;
    if (this.active) {
      const newCoord = latLng(mo.c8y_Position);
      if (isEmpty(this.line)) {
        this.line.push(newCoord);
      } else {
        const latestCoord = this.line[this.line.length - 1];
        if (latestCoord.distanceTo(newCoord) > 0) {
          this.line.push(newCoord);
        }
      }
    }
  }

  onHide(): void {}
}
