import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from '../subscription/subscription.component';



const routes: Routes = [
  { path: '', component: SubscriptionComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class SubscriptionRoutingModule { }
