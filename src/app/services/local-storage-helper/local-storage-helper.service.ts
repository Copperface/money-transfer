import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {TransferItem} from '../../models/transferItem';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHelperService {

  constructor() {
  }

  // Сделал Observable просто чтобы показать что знаю о такой шутке
  getData(): Observable<TransferItem[]> {
    return of(JSON.parse(localStorage.getItem('transfer')) || []);
  }

  setData(data: TransferItem[]): void {
    console.log(data);
    localStorage.setItem('transfer', JSON.stringify(data));
  }

}
