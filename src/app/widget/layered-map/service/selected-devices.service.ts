import { Injectable } from '@angular/core';
import { IManagedObject, InventoryService } from '@c8y/client';
import { has } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class SelectedDevicesService {
  constructor(private inventory: InventoryService) {}

  async getDevices(input: IManagedObject | { id: string }) {
    let deviceMOs: IManagedObject[];
    let mo: IManagedObject;
    if (!has(input, 'name') || !has(input, 'type')) {
      mo = (await this.inventory.detail(input.id)).data;
    } else {
      mo = input as IManagedObject;
    }

    if (has(mo, 'c8y_IsDeviceGroup')) {
      deviceMOs = await this.getDevicesOfGroup(mo);
    } else {
      deviceMOs = [mo];
    }
    return deviceMOs;
  }

  private async getDevicesOfGroup(group: IManagedObject): Promise<IManagedObject[]> {
    const filter = {
      pageSize: 2000,
      query: '$filter=(has(c8y_IsDevice))',
      withTotalPages: false,
    };
    const { data } = await this.inventory.childAssetsList(group.id, filter);
    return data;
  }
}
