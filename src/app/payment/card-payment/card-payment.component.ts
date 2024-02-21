import { Component, Input, OnInit } from '@angular/core';
import { CardPayment } from '../card-payment';
import { PayMethod } from '../PayMethod';
import { Payment } from '../payment';
import { DatePipe } from '@angular/common';
import { PaymentService } from '../payment.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit {

  constructor(private paymentService:PaymentService,public ref: DynamicDialogRef){

  }

  @Input()
  payment:Payment;

  formattedDate: string;


  ngOnInit(): void {
    this.cardPayment.paymentDate = new Date().toISOString(); 
    this.cardPayment.amount=this.payment.amount;
    this.cardPayment.paymentTranche=this.payment.paymentTranche;
    this.cardPayment.subscriptionid=this.payment.subscriptionid
  }

  cardPayment:CardPayment = {
    paymentTranche: null,
    paymentMethod: PayMethod.CARD,
    amount: null,
    paymentDate: null,
    cardCVV:null,
    cardNumber:null,
    cardExpirationDate:null,
    subscriptionid:null
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
        console.log("task complete")
      }
    })
  }

}
