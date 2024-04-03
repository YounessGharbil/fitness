import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subscription-by-month',
  templateUrl: './subscription-by-month.component.html',
  styleUrls: ['./subscription-by-month.component.scss']
})
export class SubscriptionByMonthComponent {

  @Input()
  subscriptionData: any;
  
  @Input()
  subscriptionOptions: any;

}
