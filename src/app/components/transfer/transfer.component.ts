import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {TransferItem} from '../../models/transferItem';
import {TransferService} from '../../services/transfer/transfer.service';
import {Months} from '../../models/months';
import {Years} from '../../models/years';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  months = Months;
  years = Years;
  transferForm: FormGroup;
  transferItem: TransferItem = {
    body: {
      transferFrom: {
        cardNumber: '',
        senderName: '',
        activeMonth: null,
        activeYear: null,
      },
      transferTo: {
        cardNumber: '',
      },
      amount: null,
    },
    date: null,
    id: null
  };
  cardNumberMask =
    [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/];

  constructor(
    private transferService: TransferService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.transferForm = new FormGroup({
      'transferFrom': new FormGroup({
        'cardNumber': new FormControl(null,
          [
            Validators.required,
            Validators.pattern(/((\d{4}\s){3})\d{4}\s?(\d{3})?$/)
          ]),
        'senderName': new FormControl(null,
          [
            Validators.required,
            Validators.pattern(/([А-ЯЁ][а-яё]+[\-\s]?){3,}/)
          ]),
        'activeMonth': new FormControl('01'),
        'activeYear': new FormControl('19')
      }),
      'transferTo': new FormGroup({
        'cardNumber': new FormControl(null,
          [
            Validators.required,
            Validators.pattern(/((\d{4}\s){3})\d{4}\s?(\d{3})?$/)
          ])
      }),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.min(10),
        Validators.max(999999)
      ]),
    });

    if (this.transferService.preload !== -1) {
      this.transferForm.setValue(this.transferService.getPreloadItem().body);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      this.transferItem.body = this.transferForm.value;
      this.transferService.add(Object.assign({}, this.transferItem));
      this.router.navigate(['/history']);
    } else {
      this.markFormGroupTouched(this.transferForm);
    }
  }
}
