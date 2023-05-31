import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IManagedObject } from "@c8y/client";
import { InventoryService } from "@c8y/ngx-components/api";
import { has } from "lodash-es";

@Component({ template: "", selector: "sub-device-resolver" })
export class SubDeviceResolverComponent {
  @Input() set device(mo: IManagedObject) {
    if (!mo) {
      return;
    }
    this.resolveSubDevices(mo);
  }

  @Output() subDevices = new EventEmitter<IManagedObject[]>();

  constructor(private inventory: InventoryService) {}

  private async resolveSubDevices(mo: IManagedObject) {
    let deviceMOs: IManagedObject[];
    if (has(mo, "c8y_IsDeviceGroup")) {
      deviceMOs = await this.getDevicesOfGroup(mo);
    } else {
      deviceMOs = [mo];
    }
    this.subDevices.emit(deviceMOs);
  }

  private async getDevicesOfGroup(
    group: IManagedObject
  ): Promise<IManagedObject[]> {
    const filter = {
      pageSize: 50,
      query: "$filter=(has(c8y_IsDevice))",
      withTotalPages: false,
    };
    const { data } = await this.inventory.childAssetsList(group.id, filter);

    return data;
  }
}
