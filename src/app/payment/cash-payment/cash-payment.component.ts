import {Component, Input, OnInit } from '@angular/core';
import { CashPayment } from '../cash-payment';
import { PayMethod } from '../PayMethod';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InvoiceComponent } from '../invoice/invoice.component';
import { Client } from 'src/app/client/client';

@Component({
  selector: 'app-cash-payment',
  templateUrl: './cash-payment.component.html',
  styleUrls: ['./cash-payment.component.scss']
})
export class CashPaymentComponent implements OnInit {

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


  ngOnInit(): void {
    
    this.cashPayment.paymentDate = new Date().toISOString(); 
    this.cashPayment.amount=this.payment.amount;
    this.cashPayment.paymentTranche=this.payment.paymentTranche;
    this.cashPayment.subscriptionid=this.payment.subscriptionid;

    console.log("++++++++++++++++++++++++++++++++")
    console.log(this.client)
    console.log("++++++++++++++++++++++++++++++++")
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

          this.ref = this.dialogService.open(InvoiceComponent, { 
          data: {
            payment: this.cashPayment,
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
