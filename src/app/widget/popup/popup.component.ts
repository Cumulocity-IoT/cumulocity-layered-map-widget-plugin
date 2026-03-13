import { Component, Input } from '@angular/core';
import { EventService, IManagedObject, InventoryService } from '@c8y/client';
import { DEFAULT_CONFIG, MyLayer, PopoverAction, PopoverConfig } from '../layered-map-widget.model';
import { PopoverActionService } from '../service/popover-action.service';
import { latLng, LatLng } from 'leaflet';
import { isEmpty } from 'lodash';
import { ActionIconPipe } from './action-icon.pipe';
import { CoreModule } from '@c8y/ngx-components';
import { AlarmDisplayComponent } from './alarm-display/alarm-display.component';

@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  providers: [PopoverActionService],
  standalone: true,
  imports: [CoreModule, AlarmDisplayComponent, ActionIconPipe],

})
export class PopupComponent {
  constructor(
    private inventory: InventoryService,
    private events: EventService,
    private actions: PopoverActionService
  ) {}

  private _content!: { deviceId: string; layer: MyLayer };
  @Input() set content(value: { deviceId: string; layer: MyLayer }) {
    if (value?.layer.config.popoverConfig) {
      this.cfg = value.layer.config.popoverConfig;
    }
    this._content = value;
  }

  mo?: IManagedObject;
  active = false;
  line: LatLng[] = [];
  lastUpdated?: string;

  isLoading = false;

  cfg: PopoverConfig = DEFAULT_CONFIG;

  onShow(): void {
    this.isLoading = true;

    const promises = [this.fetchDevice()];

    if (this.cfg.showDate) {
      promises.push(this.fetchLatestDate());
    }

    void Promise.all(promises).finally(() => (this.isLoading = false));
  }

  private fetchDevice(): Promise<void> {
    return this.inventory.detail(this._content.deviceId).then((result) => {
      this.mo = result.data;
    });
  }

  private fetchLatestDate(): Promise<void> {
    const eventFilter = {
      pageSize: 1,
      withTotalPages: false,
      fragmentType: 'c8y_Position',
      source: this._content.deviceId,
    };

    return this.events.list(eventFilter).then((result) => {
      if (!isEmpty(result.data)) {
        this.lastUpdated = result.data[0].time;
      }
    });
  }

  toggleActive(): void {
    this.active = !this.active;
    this.line = [];
  }

  onUpdate(mo: IManagedObject): void {
    this.lastUpdated = mo.lastUpdated;

    if (this.active) {
      const newCoord = latLng(mo['c8y_Position'] as { lat: number; lng: number });

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
    void this.actions.send(action, mo);
  }

  onHide(): void {}
}
