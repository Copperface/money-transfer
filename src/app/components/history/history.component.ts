import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

import {TransferItem} from '../../models/transferItem';
import {TransferService} from '../../services/transfer/transfer.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  transferItems: TransferItem[] = [];

  constructor(
    private transferService: TransferService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.transferItems = this.transferService.transferItems;
  }

  deleteTransferItem(transferId: number): void {
    this.transferService.delete(transferId);
  }

  repeatTransferItem(transferId: number): void {
    this.transferService.repeat(transferId);
    this.router.navigate(['/transfer']);
  }
}
