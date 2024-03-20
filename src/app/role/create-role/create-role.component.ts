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
export class CreateRoleComponent implements OnInit, OnDestroy {
  private createRoleSubscription: Subscription;

  newRole: Role = {
    rolename: '',
    authorities: []
  };

  selectedAuthorities: string[] = [];

  authorities: { value: string, label: string, id: string }[] = [
    { value: 'CONTACTS_MANAGEMENT', label: 'Contacts Management', id: 'contacts' },
    { value: 'CLIENTS_MANAGEMENT', label: 'Clients Management', id: 'clients' },
    { value: 'SUBSCRIPTIONS_MANAGEMENT', label: 'Subscriptions Management', id: 'sub' },
    { value: 'PAYMENTS_MANAGEMENT', label: 'Payments Management', id: 'pay' }
  ];

  constructor(private roleService: RoleService, public ref: DynamicDialogRef) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.createRoleSubscription) {
      this.createRoleSubscription.unsubscribe();
    }
  }

  addNewRole() {
    this.newRole.authorities = this.selectedAuthorities;
      
    this.createRoleSubscription = this.roleService.createRole(this.newRole).subscribe({
      next: (response) => {
        console.log(response)
        this.ref.close(this.newRole);
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log("task complete")
      }
    });
  }
}
