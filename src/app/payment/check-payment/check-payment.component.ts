import { Component, Input, OnInit } from '@angular/core';
import { CheckPayment } from '../check-payment';
import { PayMethod } from '../PayMethod';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InvoiceComponent } from '../invoice/invoice.component';
import { Client } from 'src/app/client/client';

@Component({
  selector: 'app-check-payment',
  templateUrl: './check-payment.component.html',
  styleUrls: ['./check-payment.component.scss']
})
export class CheckPaymentComponent implements OnInit {

  constructor(private paymentService:PaymentService,
              public ref: DynamicDialogRef,
              private dialogService: DialogService,         
              ){
  }

  @Input()
  payment:Payment;

  @Input()
  client:Client;

  ngOnInit(): void {

    this.checkPayment.paymentDate = new Date().toISOString();
    this.checkPayment.amount=this.payment.amount;
    this.checkPayment.paymentTranche=this.payment.paymentTranche;
    this.checkPayment.subscriptionid=this.payment.subscriptionid

    console.log("++++++++++++++++++++++++++++++++")
    console.log(this.client)
    console.log("++++++++++++++++++++++++++++++++")
  
  }

  checkPayment:CheckPayment = {

    paymentTranche: null,
    paymentMethod: PayMethod.CHECK,
    amount: null,
    paymentDate: null,
    checkNumber:null,
    subscriptionid:null
    
  };

  createCheckPayment(){
    this.paymentService.createCheckPayment(this.checkPayment).subscribe({
      next:  (response)=>
      {
        console.log(response)
        this.ref.close(this.checkPayment);

      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.ref = this.dialogService.open(InvoiceComponent, { 
          data: {
              payment:this.checkPayment,
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
