import { Component, Input } from "@angular/core";
import { EventService, IManagedObject, InventoryService } from "@c8y/client";
import { DEFAULT_CONFIG, MyLayer, PopoverAction, PopoverConfig } from "../layered-map-widget.model";
import { PopoverActionService } from "../service/popover-action.service";
import { latLng, LatLng } from "leaflet";
import { isEmpty } from "lodash";

@Component({
  selector: "popup-component",
  templateUrl: "./popup.component.html",
  providers: [PopoverActionService]
})
export class PopupComponent {
  constructor(private inventory: InventoryService, private events: EventService, private actions: PopoverActionService) {}
  
  private _content: { deviceId: string; layer: MyLayer };
  @Input() set content(value: { deviceId: string; layer: MyLayer }) {
    if (value?.layer.config.popoverConfig) {
      this.cfg = value.layer.config.popoverConfig;
    }
    this._content = value;
  }

  mo: IManagedObject;
  active = false;
  line: LatLng[] = [];
  lastUpdated: string;

  isLoading = false;

  cfg: PopoverConfig = DEFAULT_CONFIG;

  onShow(): void {
    
      this.isLoading = true;

    const promises = [this.fetchDevice()];
    if (this.cfg.showDate) {
      promises.push(this.fetchLatestDate());
    }

    Promise.all(promises).finally(() => this.isLoading = false);
  }

  private fetchDevice() {
    this.inventory.detail(this._content.deviceId).then((result) => {
      this.mo = result.data;
    });
  }

  private fetchLatestDate() {
    const eventFilter = {
      pageSize: 1, 
      withTotalPages: false, 
      fragmentType: 'c8y_Position',
      source: this._content.deviceId
   }
    this.events.list(eventFilter).then((result) => {
      if (!isEmpty(result.data)) {
        this.lastUpdated = result.data[0].time;
      } 
    })
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

  sendAction(action: PopoverAction, mo: IManagedObject) {
    this.actions.send(action, mo);
  }

  onHide(): void {}
}
