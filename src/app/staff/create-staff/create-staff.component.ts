import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Staff } from '../staff';
import { StaffService } from '../staff.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Contact } from 'src/app/contact/contact';
import { ContactService } from 'src/app/contact/contact.service';
import { Role } from 'src/app/role/role';
import { RoleService } from 'src/app/role/role.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss']
})
export class CreateStaffComponent implements OnInit,OnDestroy {

  allContacts: Contact[];
  allRoles: Role[];


  contactSuggestions: string[];

  selectedContact:string;
  selectedRole:Role;


  private createStaffSubscription: Subscription;

  private contactsSubscription: Subscription;
  private rolesSubscription: Subscription;


  newStaff: Staff = { 
    contact: null,
    rolename: '',
  };

  constructor(
    private staffService: StaffService, 
    public ref: DynamicDialogRef,
    private contactService: ContactService,
    private roleService: RoleService

    ) { }


    ngOnInit() {
      this.contactService.loadContacts();
      this.contactsSubscription = this.contactService.contacts$.subscribe(contacts => {
        this.allContacts = contacts;
        this.contactSuggestions = this.allContacts.map(contact => `${contact.nom} ${contact.prenom}`);
        console.log(this.contactSuggestions)
      });

      this.roleService.loadRoles();
      this.rolesSubscription = this.roleService.roles$.subscribe(roles => {
      this.allRoles = roles;

      });
      console.log( this.allRoles)

    }


  ngOnDestroy(): void {

    if (this.createStaffSubscription) {
      this.createStaffSubscription.unsubscribe();
     }

    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }

    if (this.rolesSubscription) {
      this.rolesSubscription.unsubscribe();
    }

  }

  addNewStaff() {

    const selectedContact = this.allContacts.find(contact => `${contact.nom} ${contact.prenom}` === this.selectedContact);

    this.newStaff.contact = selectedContact;

    this.newStaff.rolename = this.selectedRole.rolename;

    
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


  search(event) {
    const query = event.query;
    this.contactSuggestions = this.allContacts
        .filter(contact => contact.nom.toLowerCase().startsWith(query.toLowerCase()) || contact.prenom.toLowerCase().startsWith(query.toLowerCase()))
        .map(contact => `${contact.nom} ${contact.prenom}`);
}

}
