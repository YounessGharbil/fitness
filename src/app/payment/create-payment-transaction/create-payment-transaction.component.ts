import { Component, OnInit } from '@angular/core';
import { Payment } from '../payment';
import { PayMethod } from '../PayMethod';
import { PaymentTranche } from 'src/app/subscription/payment-tranche';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaymentMode } from 'src/app/subscription/payment-mode';
import { Client } from 'src/app/client/client';

@Component({
  selector: 'app-create-payment-transaction',
  templateUrl: './create-payment-transaction.component.html',
  styleUrls: ['./create-payment-transaction.component.scss']
})
export class CreatePaymentTransactionComponent implements OnInit {

  selectedPaymentMetohd:string;
  paymentMode:PaymentMode;
  paymentTranche:PaymentTranche=null;
  subscriptionid:number;
  client:Client;


  ngOnInit(): void {

    this.paymentTranche=this.dialogConfig.data.paymentTranche;

    this.payment.paymentDate = new Date().toISOString(); 

    this.payment.amount=this.paymentTranche.amount

    this.payment.paymentTranche=this.paymentTranche

    this.payment.subscriptionid=this.dialogConfig.data.subscriptionid
    
    this.client=this.dialogConfig.data.client

  }


  payment: Payment = {
    paymentTranche: null,
    paymentMethod: null,
    amount: this.paymentTranche ? this.paymentTranche.amount : null,
    paymentDate: null,
    subscriptionid:null
  };
  
  paymentMethods: { label: string, value: PayMethod }[] = [
    { label: 'Cash', value: PayMethod.CASH },
    { label: 'Check', value: PayMethod.CHECK },
    { label: 'Card', value: PayMethod.CARD }
  ];

  constructor(
              private dialogConfig: DynamicDialogConfig,
              public ref: DynamicDialogRef,
    
    ) { }

  


  onPaymentMethodChange(event: any): void {
    this.selectedPaymentMetohd= event.value;
  }

}
