import { Component, OnDestroy, OnInit } from '@angular/core';
import { Package } from '../package';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { PackageService } from '../package.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CreatePackageComponent } from '../create-package/create-package.component';
import { UpdatePackageComponent } from '../update-package/update-package.component';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit,OnDestroy {

  
  packages:Package[];

  loading: boolean = true;

  ref: DynamicDialogRef;

  private packagesSubscription: Subscription;
  private deletePackageSubscription: Subscription;

  constructor(
    private packageService: PackageService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) {}

  ngOnInit(): void {

    this.packageService.loadPackages();
    this.packagesSubscription = this.packageService.packages$.subscribe(packages => {
      this.packages = packages;
      this.loading = false;
    });
    
  }

  ngOnDestroy(): void {

    if (this.deletePackageSubscription) {
      this.deletePackageSubscription.unsubscribe();
    }

    if (this.packagesSubscription) {
      this.packagesSubscription.unsubscribe();
    }

  }

clear(table: Table) {
    table.clear();
}

applyFilterGlobal(event: any) {
  return event.target.value;
}

show() {
  this.ref = this.dialogService.open(CreatePackageComponent, { 
      header: 'Create Package'
  });
}

updatePackage(pack:Package){
  this.ref = this.dialogService.open(UpdatePackageComponent, { 
    data: {
        package: pack
    },
    header: ' Update Package'
  });
}

deletePackage(id:number){
  this.deletePackageSubscription=this.packageService.deletePackage(id).subscribe({
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
          this.deletePackage(id);
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
