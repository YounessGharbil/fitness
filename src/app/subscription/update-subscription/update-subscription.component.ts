import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Sub } from '../subscription';
import { Subscription } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'app-update-subscription',
  templateUrl: './update-subscription.component.html',
  styleUrls: ['./update-subscription.component.scss']
})
export class UpdateSubscriptionComponent implements OnInit,OnDestroy {

  
  subscriptionToUpdate: Sub;

   private updateSubSubscription: Subscription;


  constructor(private dialogConfig: DynamicDialogConfig,
              private subscriptionService: SubscriptionService,
              public ref: DynamicDialogRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService

              ) {

  }

  ngOnInit(): void {
    this.subscriptionToUpdate=this.dialogConfig.data.sub;
    console.log(this.subscriptionToUpdate)
  }
  ngOnDestroy(): void {

    this.updateSubSubscription.unsubscribe();

  }

  updateSubscription(){
    this.updateSubSubscription= this.subscriptionService.updateSubscription(this.subscriptionToUpdate).subscribe({
      next:  (response)=>
      {
        console.log(response)
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("task complete")
      }

    });
    this.ref.close(this.subscriptionToUpdate);
  }

  confirmUpdate() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            this.updateSubscription();
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
