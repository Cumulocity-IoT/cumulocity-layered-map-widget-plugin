import { Injectable } from "@angular/core";
import { IManagedObject, InventoryService } from "@c8y/client";
import { has } from "lodash-es";

@Injectable()
export class SelectedDevicesService {
  constructor(private inventory: InventoryService) {}

  async getDevices(device: IManagedObject) {
    let deviceMOs: IManagedObject[];
    if (!has(device, "name") || !has(device, "type")) {
      device = (await this.inventory.detail(device.id)).data;
    }

    if (has(device, "c8y_IsDeviceGroup")) {
      deviceMOs = await this.getDevicesOfGroup(device);
    } else {
      deviceMOs = [device];
    }
    return deviceMOs;
  }

  private async getDevicesOfGroup(
    group: IManagedObject
  ): Promise<IManagedObject[]> {
    const filter = {
      pageSize: 2000,
      query: "$filter=(has(c8y_IsDevice))",
      withTotalPages: false,
    };
    const { data } = await this.inventory.childAssetsList(group.id, filter);
    return data;
  }
}
