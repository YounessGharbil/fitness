import { Component, OnInit } from '@angular/core';
import { Sub } from '../subscription';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { SubscriptionService } from '../subscription.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UpdateSubscriptionComponent } from '../update-subscription/update-subscription.component';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss']
})
export class SubscriptionCardComponent implements OnInit {

  subscription: Sub;

  ref: DynamicDialogRef;

  private deleteSubSubscription: Subscription;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private subscriptionService: SubscriptionService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) {}

  ngOnInit(): void {

        this.subscription=this.dialogConfig.data.sub;
        console.log(this.subscription)

  }

  updateSubscription(sub:Sub){

    this.ref = this.dialogService.open(UpdateSubscriptionComponent, { 
      data: {
          sub: sub
      },
      header: ' Update Subscription'
    });

  }
  
  deleteSubscription(id:number){
    this.deleteSubSubscription=this.subscriptionService.deleteSubscription(id).subscribe({
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
    })
  }

confirmDelete(id:number) {
  this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deleteSubscription(id);
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
