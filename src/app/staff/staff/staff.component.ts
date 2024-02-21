import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Staff } from '../staff';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { StaffService } from '../staff.service';
import { Table } from 'primeng/table';
import { CreateStaffComponent } from '../create-staff/create-staff.component';
import { UpdateStaffComponent } from '../update-staff/update-staff.component';
import { Contact } from 'src/app/contact/contact';
import { ContactCardComponent } from 'src/app/contact/contact-card/contact-card.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit,OnDestroy {

  
  staffs:Staff[];

  loading: boolean = true;

  ref: DynamicDialogRef;

  private StaffsSubscription: Subscription;
  private deleteStaffSubscription: Subscription;



    constructor(
      private staffService: StaffService,
      private dialogService: DialogService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
      ) {}


    ngOnInit() {
      
      this.staffService.loadStaffs();
      this.StaffsSubscription = this.staffService.staffs$.subscribe(staffs => {
      this.staffs = staffs;
      this.loading = false;
      });

    }

    ngOnDestroy(): void {

      if (this.deleteStaffSubscription) {
        this.deleteStaffSubscription.unsubscribe();
      }

      if (this.StaffsSubscription) {
        this.StaffsSubscription.unsubscribe();
      }

    }


    clear(table: Table) {
        table.clear();
    }

    applyFilterGlobal(event: any) {
      return event.target.value;
    }

    show() {
      this.ref = this.dialogService.open(CreateStaffComponent, { 
          header: 'Create Staff', 
          width: '70vw',
          height:'50vw',
          modal:true,
          contentStyle: { overflow: 'auto' },
          maximizable: true
      });
  }

  updateStaff(Staff:Staff){
    this.ref = this.dialogService.open(UpdateStaffComponent, { 
      data: {
          Staff: Staff
      },
      header: ' Update Staff', 
      width: '70vw',
      height:'50vw',
      modal:true,
      contentStyle: { overflow: 'auto' },
      maximizable: true
    });
  }
  
  deleteStaff(id:number){
    this.deleteStaffSubscription=this.staffService.deleteStaff(id).subscribe({
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
          this.deleteStaff(id);
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

displayContactCard(contact:Contact){

  this.ref = this.dialogService.open(ContactCardComponent, { 
    data: {
        contact: contact
    },
    header: ' Card',
    width: '70vw',
    height:'50vw',
    modal:true,
    contentStyle: { overflow: 'auto' },
    maximizable: true
  });

}

}
