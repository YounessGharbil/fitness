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

  countries: any[];

  filteredCountries: any[];

  selectedCountry: any;




  newContact: Contact = { 
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: '',
    adresse: '',
    codePostal: '',
    pays: '',
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

      this.contactService.getCountries().then((countries) => {
      this.countries = countries;
  });

  }

  ngOnDestroy(): void {
    this.createContactSubscription.unsubscribe();
  }

  private formatDate(date: Date): string {
    // Implement your custom date formatting logic here
    return date.toISOString().split('T')[0];
  }


  addNewContact() {
    
    const formattedDate = this.formatDate(this.dateNaissance);
    this.newContact.dateNaissance = formattedDate;
    this.newContact.pays=this.selectedCountry.name
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

  
  filterCountry(event) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.countries.length; i++) {
        let country = this.countries[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filteredCountries = filtered;
}

}
