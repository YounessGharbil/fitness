import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CreateSubscriptionComponent } from './create-subscription/create-subscription.component';
import { UpdateSubscriptionComponent } from './update-subscription/update-subscription.component';
import { SubscriptionCardComponent } from './subscription-card/subscription-card.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SubscriptionRoutingModule } from './subscription-routing/subscription-routing.module';



@NgModule({
  declarations: [
    SubscriptionComponent,
    CreateSubscriptionComponent,
    UpdateSubscriptionComponent,
    SubscriptionCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
