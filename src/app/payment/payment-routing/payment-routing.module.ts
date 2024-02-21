import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';

const routes: Routes = [
  { path: '', component: PaymentComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,    
    RouterModule.forChild(routes)

  ]
})
export class PaymentRoutingModule { }
