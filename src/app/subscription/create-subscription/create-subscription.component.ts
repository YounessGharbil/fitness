import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sub } from '../subscription';
import { SubscriptionService } from '../subscription.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.scss']
})
export class CreateSubscriptionComponent implements OnInit,OnDestroy {
  

  private createSubSubscription: Subscription;

  
  newSubscription: Sub = { 
    subscribedContact_id: null,
    subscribedPackage_id: null,
    discount: null,
  };

  constructor(private subscriptionService: SubscriptionService, public ref: DynamicDialogRef) { }


  ngOnInit(): void {

    
  }
  ngOnDestroy(): void {

    this.createSubSubscription.unsubscribe();

  }

  addNewSubscription() {
    
   this.createSubSubscription= this.subscriptionService.createSubscription(this.newSubscription).subscribe({
      next:  (response)=>
      {
        console.log(response)
        this.ref.close(this.newSubscription);
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("task complete")
      }
    });

  }


}
