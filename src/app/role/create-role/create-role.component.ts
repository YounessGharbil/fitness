import { Component, OnDestroy, OnInit } from '@angular/core';
import { Role } from '../role';
import { Subscription } from 'rxjs';
import { RoleService } from '../role.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit,OnDestroy {

  private createRoleSubscription: Subscription;

  newRole: Role = { 

    rolename: '',
   
  };

  constructor(private roleService: RoleService, public ref: DynamicDialogRef) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.createRoleSubscription.unsubscribe();
  }



  addNewRole() {
       this.createRoleSubscription= this.roleService.createRole(this.newRole).subscribe({
      next:  (response)=>
      {
        console.log(response)
        this.ref.close(this.newRole);
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
