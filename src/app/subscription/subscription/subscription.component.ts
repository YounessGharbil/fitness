import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubscriptionService } from '../subscription.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Sub } from '../subscription';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { CreateSubscriptionComponent } from '../create-subscription/create-subscription.component';
import { UpdateSubscriptionComponent } from '../update-subscription/update-subscription.component';
import { SubscriptionCardComponent } from '../subscription-card/subscription-card.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit,OnDestroy {

  subscriptions:Sub[];

  loading: boolean = true;

  ref: DynamicDialogRef;

  private subsSubscription: Subscription;
  private deleteSubSubscription: Subscription;

  constructor(
    private subscriptionService: SubscriptionService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) {}


  ngOnInit(): void {

    this.subscriptionService.loadSubscriptions();
    this.subsSubscription = this.subscriptionService.subscriptions$.subscribe(subs => {
      this.subscriptions = subs;
      this.loading = false;
    });
    

  }

  ngOnDestroy(): void {

    if (this.deleteSubSubscription) {
      this.deleteSubSubscription.unsubscribe();
    }

    if (this.subsSubscription) {
      this.subsSubscription.unsubscribe();
    }

  }

  
clear(table: Table) {
  table.clear();
}

applyFilterGlobal(event: any) {
return event.target.value;
}

show() {
this.ref = this.dialogService.open(CreateSubscriptionComponent, { 
    header: 'Créer un abonnement',
    width: '70vw',
    height:'50vw',
    modal:true,
    contentStyle: { overflow: 'auto' },
    maximizable: true
});
}

updateSubscription(sub:Sub){
  console.log(sub)
  this.ref = this.dialogService.open(UpdateSubscriptionComponent, { 
    data: {
        sub: sub
    },
    header: ' Modifier un abonnement',
    width: '70vw',
    height:'50vw',
    modal:true,
    contentStyle: { overflow: 'auto' },
    maximizable: true
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
      message: 'Voulez-vous supprimer cet enregistrement ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deleteSubscription(id);
          this.messageService.add({ severity: 'info', summary: 'Confirmé', detail: 'Enregistrement supprimé' });
      },
      reject: (type) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });
      
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Annulé', detail: 'Vous avez annulé' });
      
                  break;
          }
      }
  });
}

}
