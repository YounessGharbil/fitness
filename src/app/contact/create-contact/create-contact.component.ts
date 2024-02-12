import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit,OnDestroy {

  isAddingContact:boolean;

  dateNaissance: Date;

  private createContactSubscription: Subscription;

  newContact: Contact = { 
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: '',
    adresse: '',
    codePostal: '',
    ville: '',
    tel: '',
    email: ''
  };

  constructor(
    private contactService: ContactService, 
    public ref: DynamicDialogRef,
    ) { }
  
  ngOnInit(): void {

    this.isAddingContact=false

  }

  ngOnDestroy(): void {
    this.createContactSubscription.unsubscribe();
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }


  addNewContact() {
    
    const formattedDate = this.formatDate(this.dateNaissance);
    this.newContact.dateNaissance = formattedDate;
    console.log( this.newContact)
   this.createContactSubscription= this.contactService.createContact(this.newContact).subscribe({
      next:  (response)=>
      {
        console.log(response)
        this.ref.close(this.newContact);

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
