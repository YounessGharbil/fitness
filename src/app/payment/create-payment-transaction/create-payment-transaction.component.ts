import { Component, OnInit } from '@angular/core';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';
import { PayMethod } from '../PayMethod';
import { PaymentTranche } from 'src/app/subscription/payment-tranche';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaymentMode } from 'src/app/subscription/payment-mode';

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


  ngOnInit(): void {

    this.paymentTranche=this.dialogConfig.data.paymentTranche;

    this.payment.paymentDate = new Date().toISOString(); 

    this.payment.amount=this.paymentTranche.amount

    this.payment.paymentTranche=this.paymentTranche
    this.payment.subscriptionid=this.dialogConfig.data.subscriptionid

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
              private paymentService: PaymentService,
              private dialogConfig: DynamicDialogConfig,
              public ref: DynamicDialogRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
    ) { }

  


  onPaymentMethodChange(event: any): void {
    this.selectedPaymentMetohd= event.value;
  }

}
