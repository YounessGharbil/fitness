import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role } from '../role';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { RoleService } from '../role.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CreateRoleComponent } from '../create-role/create-role.component';
import { UpdateRoleComponent } from '../update-role/update-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit,OnDestroy {

  
  roles:Role[];


  ref: DynamicDialogRef;

  private rolesSubscription: Subscription;
  private deleteRoleSubscription: Subscription;



    constructor(
      private roleService: RoleService,
      private dialogService: DialogService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
      ) {}


    ngOnInit() {
      
      this.roleService.loadRoles();
      this.rolesSubscription = this.roleService.roles$.subscribe(roles => {
      this.roles = roles;
    });

    }

    ngOnDestroy(): void {

      if (this.deleteRoleSubscription) {
        this.deleteRoleSubscription.unsubscribe();
      }

      if (this.rolesSubscription) {
        this.rolesSubscription.unsubscribe();
      }

    }


    clear(table: Table) {
        table.clear();
    }

    applyFilterGlobal(event: any) {
      return event.target.value;
    }

    show() {
      this.ref = this.dialogService.open(CreateRoleComponent, { 
          header: 'Créer un rôle',
          width: '70vw',
          height:'50vw',
          modal:true,
          contentStyle: { overflow: 'auto' },
          maximizable: true
      });
  }

  updateRole(Role:Role){
    this.ref = this.dialogService.open(UpdateRoleComponent, { 
      data: {
          Role: Role
      },
      header: ' Modifier un rôle',
      width: '70vw',
      height:'50vw',
      modal:true,
      contentStyle: { overflow: 'auto' },
      maximizable: true
    });
  }
  
  deleteRole(id:number){
    this.deleteRoleSubscription=this.roleService.deleteRole(id).subscribe({
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
          this.deleteRole(id);
          this.messageService.add({ severity: 'info', summary: 'Confirmé', detail: 'Enregistrement supprimé' });
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
