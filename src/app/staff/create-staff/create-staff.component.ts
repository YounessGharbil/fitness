import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Staff } from '../staff';
import { StaffService } from '../staff.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss']
})
export class CreateStaffComponent implements OnInit,OnDestroy {

  private createStaffSubscription: Subscription;

  
  newStaff: Staff = { 
    contact_id: null,
    role_name: '',
  };

  constructor(private staffService: StaffService, public ref: DynamicDialogRef) { }


  ngOnInit(): void {

    
  }
  ngOnDestroy(): void {

    this.createStaffSubscription.unsubscribe();

  }

  addNewStaff() {
    console.log("im inside add staff")
    
   this.createStaffSubscription= this.staffService.createStaff(this.newStaff).subscribe({

      next:  (response)=>
      {
        console.log(response)
        this.ref.close(this.newStaff);

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
