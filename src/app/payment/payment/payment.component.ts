import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { SubscriptionService } from 'src/app/subscription/subscription.service';
import { Payment } from '../payment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { InvoiceComponent } from '../invoice/invoice.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit,OnDestroy {

  payments:Payment[];

  loading: boolean = true;

  ref: DynamicDialogRef;


  private paymentssSubscription: Subscription;

  constructor(private paymentService:PaymentService,
              private dialogService: DialogService,
             ){

  }
  ngOnDestroy(): void {
    if (this.paymentssSubscription) {
      this.paymentssSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.paymentService.gePayments().subscribe({
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
    })

    this.loading = false;
  }

  clear(table: Table) {
    table.clear();
}

applyFilterGlobal(event: any) {
  return event.target.value;
}

printInvoice(payment:Payment){
  console.log("*/*/**/*/*/******************")
  console.log(payment)
  console.log("*/*/**/*/*/******************")

  this.ref = this.dialogService.open(InvoiceComponent, { 
    data: {
      payment: payment,
    },
    header: ' invoice ',
    width: '70vw',
    height:'50vw',
    modal:true,
    contentStyle: { overflow: 'auto' },
    maximizable: true
  });

}

}
