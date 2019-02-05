import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './components/layout/layout.component';
import {TransferComponent} from './components/transfer/transfer.component';
import {HistoryComponent} from './components/history/history.component';
import {TransferService} from './services/transfer/transfer.service';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TransferComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [TransferService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
