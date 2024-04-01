import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role } from '../role';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoleService } from '../role.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit,OnDestroy {


  roleToUpdate:Role

  selectedAuthorities: string[] = [];

  authorities: { value: string, label: string, id: string }[] = [

    { value: 'CONTACTS_MANAGEMENT', label: 'Contacts Management', id: 'contacts' },
    { value: 'CLIENTS_MANAGEMENT', label: 'Clients Management', id: 'clients' },
    { value: 'SUBSCRIPTIONS_MANAGEMENT', label: 'Subscriptions Management', id: 'sub' },
    { value: 'PAYMENTS_MANAGEMENT', label: 'Payments Management', id: 'pay' },
    { value: 'STAFFS_MANAGEMENT', label: 'Staffs Management', id: 'staff' },
    { value: 'ROLES_MANAGEMENT', label: 'Roles Management', id: 'role' },
    { value: 'OBSERVATIONS_MANAGEMENT', label: 'Observations Management', id: 'observation' },
    { value: 'PACKAGES_MANAGEMENT', label: 'Packages Management', id: 'package' }

  ];

  private updateRoleSubscription: Subscription;


  constructor(private dialogConfig: DynamicDialogConfig,
    private roleService: RoleService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private confirmationService: ConfirmationService    
    ) {

}


  ngOnInit(): void {
    this.roleToUpdate=this.dialogConfig.data.Role;
    console.log(this.roleToUpdate);
    // this.selectedAuthorities=['CONTACTS_MANAGEMENT','OBSERVATIONS_MANAGEMENT']

    console.log("*********---***********")
    console.log(this.roleToUpdate.authorities)
    console.log("*********---***********")
    this.selectedAuthorities=this.roleToUpdate.authorities

  }

  ngOnDestroy(): void {
    
    if(this.updateRoleSubscription){

      this.updateRoleSubscription.unsubscribe();

    }
  }

  updateRole(){

    this.roleToUpdate.authorities=this.selectedAuthorities

    this.updateRoleSubscription= this.roleService.updateRole(this.roleToUpdate).subscribe({
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
    this.ref.close(this.roleToUpdate);
  }

  confirmUpdate() {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir continuer ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmé', detail: 'Vous avez accepté' });
            this.updateRole();
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
