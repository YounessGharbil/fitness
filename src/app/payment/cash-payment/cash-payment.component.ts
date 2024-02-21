import { Component, Input, OnInit } from '@angular/core';
import { CashPayment } from '../cash-payment';
import { PayMethod } from '../PayMethod';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cash-payment',
  templateUrl: './cash-payment.component.html',
  styleUrls: ['./cash-payment.component.scss']
})
export class CashPaymentComponent implements OnInit {

  constructor(private paymentService:PaymentService,
              public ref: DynamicDialogRef,
              ){

  }

  @Input()
  payment:Payment;


  ngOnInit(): void {
    
    this.cashPayment.paymentDate = new Date().toISOString(); 
    this.cashPayment.amount=this.payment.amount;
    this.cashPayment.paymentTranche=this.payment.paymentTranche;
    this.cashPayment.subscriptionid=this.payment.subscriptionid;

  }

  cashPayment: CashPayment = {
    paymentTranche: null,
    paymentMethod: PayMethod.CASH,
    amount: null,
    paymentDate: null,
    subscriptionid:null

  };

  createCashPayment(){
    this.paymentService.createCashPayment(this.cashPayment).subscribe({
      next:  (response)=>
      {
        console.log(response)
        this.ref.close(this.cashPayment);

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
