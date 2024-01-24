import { Component, OnDestroy, OnInit } from '@angular/core';
import { Package } from '../package';
import { Subscription } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PackageService } from '../package.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-package',
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.scss']
})
export class UpdatePackageComponent implements OnInit,OnDestroy {

  packageToUpdate: Package;

   private updatePackageSubscription: Subscription;


  constructor(private dialogConfig: DynamicDialogConfig,
              private packageService: PackageService,
              public ref: DynamicDialogRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService

              ) {

  }

  ngOnInit(): void {
    this.packageToUpdate=this.dialogConfig.data.package;
  }
  ngOnDestroy(): void {

    this.updatePackageSubscription.unsubscribe();

  }

  updatePackage(){
    this.updatePackageSubscription= this.packageService.updatePackage(this.packageToUpdate).subscribe({
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
    this.ref.close(this.packageToUpdate);
  }

  confirmUpdate() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            this.updatePackage();
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
