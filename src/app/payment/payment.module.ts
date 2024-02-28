import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePaymentTransactionComponent } from './create-payment-transaction/create-payment-transaction.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { CheckPaymentComponent } from './check-payment/check-payment.component';
import { CardPaymentComponent } from './card-payment/card-payment.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentRoutingModule } from './payment-routing/payment-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';




@NgModule({
  declarations: [
    CreatePaymentTransactionComponent,
    CashPaymentComponent,
    CheckPaymentComponent,
    CardPaymentComponent,
    PaymentComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    PaymentRoutingModule
  ],
  providers: [Location],

})
export class PaymentModule { }
