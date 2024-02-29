import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Client } from '../client';
import { PaymentTranche } from 'src/app/subscription/payment-tranche';
import { CreatePaymentTransactionComponent } from 'src/app/payment/create-payment-transaction/create-payment-transaction.component';
import { PaymentService } from 'src/app/payment/payment.service';
import { Payment } from 'src/app/payment/payment';
import { Observation } from 'src/app/observation/observation';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {

  client: Client;

  tranches:PaymentTranche[];
  payments:Payment[];
  observations:Observation[];

  // private paymentsSubject:any;
  // private payments$:any;

  ref: DynamicDialogRef;
  
  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogService: DialogService,
    private paymentService: PaymentService
    ) {}

  ngOnInit(): void {

        this.client=this.dialogConfig.data.client;
        this.tranches=this.client.subscription.paymentMode.paymentTranches;
        this.payments=this.client.subscription.payments;
        this.observations=this.client.observations;
        // this.paymentsSubject==new BehaviorSubject<Payment[]>(this.payments);
        // this.payments$=this.paymentsSubject.asObservable();

  }

  pay(paymentTranche:PaymentTranche){

    this.ref = this.dialogService.open(CreatePaymentTransactionComponent, { 
      data: {
        paymentTranche: paymentTranche,
        subscriptionid:this.client.subscription.id,
        client:this.client
    },
    header: 'Create Payment Transaction',
    width: '50vw',
    height:'50vw',
    modal:true,
    contentStyle: { overflow: 'auto' },
    baseZIndex: 10000,
    maximizable: true      
  });

  this.ref.onClose.subscribe(() => {
    this.updatePaymentTranchesList(paymentTranche);
  });
  }

  updatePaymentTranchesList(paymentTrancheToRemove: PaymentTranche) {
    this.tranches = this.tranches.filter(tranche => tranche !== paymentTrancheToRemove);
    this.paymentService.updatePaymentTranches(this.tranches);
  }

}
