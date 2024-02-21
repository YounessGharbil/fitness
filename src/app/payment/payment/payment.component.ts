import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { SubscriptionService } from 'src/app/subscription/subscription.service';
import { Payment } from '../payment';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

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
              private messageService: MessageService,
              private confirmationService: ConfirmationService){

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

show() {
  
}

updatePayment(payment:Payment){
  
}

deletePayment(id:number){

}

confirmDelete(id:number) {
  this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deletePayment(id);
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: (type) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
      
                  break;
          }
      }
  });
}

}
