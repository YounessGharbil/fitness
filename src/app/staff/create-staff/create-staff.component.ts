import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Staff } from '../staff';
import { StaffService } from '../staff.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Contact } from 'src/app/contact/contact';
import { ContactService } from 'src/app/contact/contact.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss']
})
export class CreateStaffComponent implements OnInit,OnDestroy {

  allContacts: Contact[];

  contactSuggestions: string[];

  selectedContact:string;

  private createStaffSubscription: Subscription;

  private contactsSubscription: Subscription;

  newStaff: Staff = { 
    contact: null,
    role_name: '',
  };

  constructor(
    private staffService: StaffService, 
    public ref: DynamicDialogRef,
    private contactService: ContactService
    ) { }


    ngOnInit() {
      this.contactService.loadContacts();
      this.contactsSubscription = this.contactService.contacts$.subscribe(contacts => {
        this.allContacts = contacts;
        this.contactSuggestions = this.allContacts.map(contact => `${contact.nom} ${contact.prenom}`);
        console.log(this.contactSuggestions)
      });

    }


  ngOnDestroy(): void {

    if (this.createStaffSubscription) {
      this.createStaffSubscription.unsubscribe();
     }

    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }

  }

  addNewStaff() {

    const selectedContact = this.allContacts.find(contact => `${contact.nom} ${contact.prenom}` === this.selectedContact);

    this.newStaff.contact = selectedContact;
    
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
