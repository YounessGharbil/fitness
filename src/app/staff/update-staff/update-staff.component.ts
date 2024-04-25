import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StaffService } from '../staff.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Staff } from '../staff';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/role/role';
import { RoleService } from 'src/app/role/role.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.scss']
})
export class UpdateStaffComponent implements OnInit,OnDestroy  {

  staffToUpdate: Staff;

  private updateStaffSubscription: Subscription;
  private rolesSubscription: Subscription;


  allRoles: Role[];
  selectedRole:Role;



  constructor(private dialogConfig: DynamicDialogConfig,
    private staffService: StaffService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private roleService: RoleService

    ) {

}
  ngOnInit(): void {
    this.staffToUpdate=this.dialogConfig.data.Staff;
    console.log(this.staffToUpdate);

      this.roleService.loadRoles();
      this.rolesSubscription = this.roleService.roles$.subscribe(roles => {
      this.allRoles = roles;

      });
      console.log( this.allRoles)

  }

  ngOnDestroy(): void {
    if( this.updateStaffSubscription){

      this.updateStaffSubscription.unsubscribe();

    }

    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
    }

  }

  updateStaff(){
      this.staffToUpdate.rolename=this.selectedRole.rolename

      this.updateStaffSubscription= this.staffService.updateStaff(this.staffToUpdate).subscribe({
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
    this.ref.close(this.staffToUpdate);
  }


  confirmUpdate() {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir continuer ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmé', detail: 'Vous avez accepté' });
            this.updateStaff();
        },
        reject: (type) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejetée', detail: 'Vous avez rejeté' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Annulé', detail: 'Vous avez annulé' });
                    break;
            }
        }
    });
  }


}
