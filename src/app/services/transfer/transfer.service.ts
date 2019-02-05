import {Injectable} from '@angular/core';

import {TransferItem} from '../../models/transferItem';
import {LocalStorageHelperService} from '../local-storage-helper/local-storage-helper.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  transferItems: TransferItem[] = [];
  currentId: number;
  preload: number;

  constructor(private localStorageService: LocalStorageHelperService) {
    this.currentId = 0;
    this.preload = -1;

    localStorageService.getData()
      .subscribe(data => {
        if (data.length) {
          this.transferItems = data;
          this.currentId = data[data.length - 1].id + 1;
        }
      });
  }

  // Поиск индекса в массиве transferItems по id записи
  private findIndexById(transferId: number): number {
    for (let i = 0; i < this.transferItems.length; i++) {
      if (this.transferItems[i].id === transferId) {
        return i;
      }
    }

    return -1;
  }

  // Добавление записи в массив transferItems
  add(item: TransferItem): void {
    item.date = new Date();
    item.id = this.currentId++;
    this.transferItems.push(item);
    this.localStorageService.setData(this.transferItems);
  }

  // Удаление записи из массива transferItems
  delete(id: number): void {
    const index = this.findIndexById(id);
    if (index !== -1) {
      this.transferItems.splice(index, 1);
      this.localStorageService.setData(this.transferItems);
    }
  }

  repeat(id: number): void {
    this.preload = id;
  }

  getPreloadItem(): TransferItem {
    const index = this.findIndexById(this.preload);
    this.preload = -1;
    return this.transferItems[index];
  }

}
