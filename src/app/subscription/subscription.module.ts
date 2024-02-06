import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CreateSubscriptionComponent } from './create-subscription/create-subscription.component';
import { UpdateSubscriptionComponent } from './update-subscription/update-subscription.component';
import { SubscriptionCardComponent } from './subscription-card/subscription-card.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SubscriptionRoutingModule } from './subscription-routing/subscription-routing.module';
import { PaymentTrancheComponent } from './payment-tranche/payment-tranche.component';



@NgModule({
  declarations: [
    SubscriptionComponent,
    CreateSubscriptionComponent,
    UpdateSubscriptionComponent,
    SubscriptionCardComponent,
    PaymentTrancheComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
