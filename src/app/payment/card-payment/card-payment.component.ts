import { Component, Input, OnInit } from '@angular/core';
import { CardPayment } from '../card-payment';
import { PayMethod } from '../PayMethod';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InvoiceComponent } from '../invoice/invoice.component';
import { Client } from 'src/app/client/client';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit {

  constructor(
              private paymentService:PaymentService,
              public ref: DynamicDialogRef,
              private dialogService: DialogService,
              ){

  }

  @Input()
  payment:Payment;

  @Input()
  client:Client;

  formattedDate: string;

  ngOnInit(): void {
    this.cardPayment.paymentDate = new Date().toISOString(); 
    this.cardPayment.amount=this.payment.amount;
    this.cardPayment.paymentTranche=this.payment.paymentTranche;
    this.cardPayment.subscriptionid=this.payment.subscriptionid
    this.cardPayment.paymentHandler=this.payment.paymentHandler

  }

    cardPayment:CardPayment = {
    paymentTranche: null,
    paymentMethod: PayMethod.CARD,
    amount: null,
    paymentDate: null,
    cardCVV:null,
    cardNumber:null,
    cardExpirationDate:null,
    subscriptionid:null,
    paymentHandler:''
  };

  createCardPayment(){
    this.paymentService.createCardPayment(this.cardPayment).subscribe({
      next:  (response)=>
      {
        console.log(response)
        this.ref.close(this.cardPayment);

      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.ref = this.dialogService.open(InvoiceComponent, { 
          data: {
            payment: this.cardPayment,
            client:this.client
          },
          header: ' invoice ',
          width: '70vw',
          height:'50vw',
          modal:true,
          contentStyle: { overflow: 'auto' },
          maximizable: true
        });
      }
    })
  }

}
