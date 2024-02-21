import { Component, Input, OnInit } from '@angular/core';
import { CheckPayment } from '../check-payment';
import { PayMethod } from '../PayMethod';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-check-payment',
  templateUrl: './check-payment.component.html',
  styleUrls: ['./check-payment.component.scss']
})
export class CheckPaymentComponent implements OnInit {

  constructor(private paymentService:PaymentService,public ref: DynamicDialogRef){

  }

  @Input()
  payment:Payment;

  ngOnInit(): void {

    this.cardPayment.paymentDate = new Date().toISOString();
    this.cardPayment.amount=this.payment.amount;
    this.cardPayment.paymentTranche=this.payment.paymentTranche;
    this.cardPayment.subscriptionid=this.payment.subscriptionid
    
  }

  cardPayment:CheckPayment = {

    paymentTranche: null,
    paymentMethod: PayMethod.CHECK,
    amount: null,
    paymentDate: null,
    checkNumber:null,
    subscriptionid:null
    
  };

  createCheckPayment(){
    this.paymentService.createCheckPayment(this.cardPayment).subscribe({
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
