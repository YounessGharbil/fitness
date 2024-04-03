import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { Observation } from 'src/app/observation/observation';
import { ObservationService } from 'src/app/observation/observation.service';
import { Payment } from 'src/app/payment/payment';
import { PaymentService } from 'src/app/payment/payment.service';
import { Sub } from 'src/app/subscription/subscription';
import { SubscriptionService } from 'src/app/subscription/subscription.service';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit,OnDestroy {

  payments:Payment[];
  observations:Observation[];
  subscriptions:Sub[];
  clients:Client[];

  monthNames: string[] = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 
  'août', 'septembre', 'octobre', 'novembre', 'décembre']

  subsNumber:number;
  subscriptionDataSet: any;
  subscriptionOptions: any;
  numberOfSubs:number[]=[0,0,0,0,0,0,0,0,0,0,0,0]

  private observationsSubscription: Subscription;
  private subsSubscription: Subscription;
  private paymentSusbscription:Subscription;
  private clientsSubscription: Subscription;

  constructor(

    private paymentService:PaymentService,
    private observationService: ObservationService,
    private subscriptionService: SubscriptionService,
    private clientService: ClientService,

  ){}
  ngOnDestroy(): void {
    console.log("ng on destroy called++++++")

    if(this.subsSubscription){
      this.subsSubscription.unsubscribe()
    }
  }

  ngOnInit(): void {

    console.log("ng on init called++++++")

    this.paymentSusbscription = this.paymentService.gePayments().subscribe({
        next:(response)=>{
          this.payments=response
          console.log( this.payments)
        },
        error:(err)=>{
          console.log(err)
        },
        complete:()=>{
          console.log("task complete")
        }
      });

      this.observationService.loadObservations();
      this.observationsSubscription = this.observationService.Observations$.subscribe(observations => {
      this.observations = observations;
        });

      this.subscriptionService.loadSubscriptions();
      this.subsSubscription = this.subscriptionService.subscriptions$.subscribe(subs => { 
        
        this.subscriptions = subs;

        this.subsNumber=this.subscriptions.length

        this.countSubscriptionsByMonth(this.subscriptions);
 
        this.getSubscriptionDataAndOptions()


      });

      this.clientsSubscription= this.clientService.getClients().subscribe({
        next:  (response)=>
        {
          this.clients=response;
          console.log( this.clients)
        },
        error:(err)=>{
          console.log(err)
        },
        complete:()=>{
          console.log("task complete")
        }
      });

}



getSubscriptionDataAndOptions(){

  this.subscriptionDataSet = {
    labels: this.monthNames,
    datasets: [
        {
            label: 'Sub By Month',
            data: this.numberOfSubs,
            fill: false,
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
            tension: 0.1
        },
        // {
        //     label: 'Second Dataset',
        //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        //     fill: false,
        //     borderColor: getComputedStyle(document.documentElement).getPropertyValue('--pink-500'),
        //     tension: 0.1
        // }
    ]
};

const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
const textColorSecondary = getComputedStyle(document.documentElement).getPropertyValue('--text-color-secondary');
const surfaceBorder = getComputedStyle(document.documentElement).getPropertyValue('--surface-border');

this.subscriptionOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    plugins: {
        legend: {
            labels: {
              color: textColor
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        },
        y: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        }
    }
};

}

countSubscriptionsByMonth(subscriptions: Sub[]){

  console.log("count method called++++++")
  this.numberOfSubs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (const subscription of subscriptions) {

    const startDateParts = subscription.startDate.split('/');
    const month = parseInt(startDateParts[1], 10);

    console.log(this.numberOfSubs[month-1])

    this.numberOfSubs[month-1]++;
  }
  

}


}
