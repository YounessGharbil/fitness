import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Sub } from '../subscription';
import { Subscription } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubscriptionService } from '../subscription.service';
import { Package } from 'src/app/package/package';
import { PackageService } from 'src/app/package/package.service';
import { PaymentTrancheService } from '../payment-tranche.service';
import { PaymentMode } from '../payment-mode';

@Component({
  selector: 'app-update-subscription',
  templateUrl: './update-subscription.component.html',
  styleUrls: ['./update-subscription.component.scss']
})
export class UpdateSubscriptionComponent implements OnInit,OnDestroy {

  paymentMode:PaymentMode={paymentTranches:null};
  
  subscriptionToUpdate: Sub;

  private updateSubSubscription: Subscription;

  allPackages: Package[];

  selectedPackage:Package;

  private packagesSubscription: Subscription;

  numberOfTranches:number;

  isDiscountDisabled: boolean = true;
  isPackageDisabled: boolean = true;
  isStatusDisabled: boolean = true;
  isNumberOfTranchesDisabled: boolean = true;


  constructor(private dialogConfig: DynamicDialogConfig,
              private subscriptionService: SubscriptionService,
              public ref: DynamicDialogRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private packageService: PackageService,
              private paymentTrancheService:PaymentTrancheService
              ) {

  }

  ngOnInit(): void {

    this.subscriptionToUpdate=this.dialogConfig.data.sub;
    this.packageService.loadPackages();
    this.packagesSubscription = this.packageService.packages$.subscribe(packages => {
    this.allPackages = packages;

    });
  }
  
  ngOnDestroy(): void {

    if (this.updateSubSubscription) {
      this.updateSubSubscription.unsubscribe();
    }

    if (this.packagesSubscription) {
      this.packagesSubscription.unsubscribe();
    }
    
  }

  updateSubscription(){

    const updatePayload = {};

    if (this.subscriptionToUpdate.discount !== null && this.subscriptionToUpdate.discount !== undefined  && !this.isDiscountDisabled ) {
      updatePayload['discount'] = this.subscriptionToUpdate.discount;
    }

    if (this.subscriptionToUpdate.status !== null && this.subscriptionToUpdate.status !== undefined && !this.isStatusDisabled ) {
      updatePayload['status'] = this.subscriptionToUpdate.status;
    }

    if (this.selectedPackage !== null && this.selectedPackage !== undefined && !this.isPackageDisabled) {
      this.subscriptionToUpdate.subscribedPackage_id = this.selectedPackage.id;
      updatePayload['subscribedPackage_id'] = this.subscriptionToUpdate.subscribedPackage_id;
    }

    if (this.numberOfTranches !== null && this.numberOfTranches !== undefined && !this.isNumberOfTranchesDisabled) {
      this.paymentMode.paymentTranches= this.paymentTrancheService.getTranches();
      updatePayload['paymentMode']=this.paymentMode;
    }

    updatePayload['id'] = this.subscriptionToUpdate.id;

    this.updateSubSubscription= this.subscriptionService.updateSubscription(updatePayload).subscribe({
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
        message: 'Êtes-vous sûr de vouloir continuer ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmé', detail: 'Vous avez accepté' });
            this.updateSubscription();
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
