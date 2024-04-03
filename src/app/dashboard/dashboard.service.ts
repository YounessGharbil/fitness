import { Injectable, OnInit } from '@angular/core';
import { Payment } from '../payment/payment';
import { PaymentService } from '../payment/payment.service';
import { ObservationService } from '../observation/observation.service';
import { Observation } from '../observation/observation';
import { Subscription } from 'rxjs';
import { Sub } from '../subscription/subscription';
import { SubscriptionService } from '../subscription/subscription.service';
import { Client } from '../client/client';
import { ClientService } from '../client/client.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnInit {

  payments:Payment[];
  observations:Observation[];
  subscriptions:Sub[];
  clients:Client[];


  subsNumber:number;




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


  ngOnInit(): void {

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
        console.log("Done1")


        this.observationService.loadObservations();
        this.observationsSubscription = this.observationService.Observations$.subscribe(observations => {
        this.observations = observations;
        console.log(this.observations)
          });
          console.log("Done2")


        this.subscriptionService.loadSubscriptions();
        this.subsSubscription = this.subscriptionService.subscriptions$.subscribe(subs => {
          this.subscriptions = subs;

          this.subsNumber=this.subscriptions.length
          console.log("subscription number is :"+this.subsNumber)


        });
        console.log("Done3")


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
        console.log("Done4")

  }

}
