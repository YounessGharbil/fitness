import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sub } from '../subscription';
import { SubscriptionService } from '../subscription.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Contact } from 'src/app/contact/contact';
import { ContactService } from 'src/app/contact/contact.service';
import { Package } from 'src/app/package/package';
import { PackageService } from 'src/app/package/package.service';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.scss']
})
export class CreateSubscriptionComponent implements OnInit,OnDestroy {
  
  allContacts: Contact[];
  allPackages: Package[];


  contactSuggestions: string[];
  packageSuggestions: string[];


  selectedContact:string;
  selectedPackage:string;


  private contactsSubscription: Subscription;
  private packagesSubscription: Subscription;


  private createSubSubscription: Subscription;

  
  newSubscription: Sub = { 
    subscribedContact_id: null,
    subscribedPackage_id: null,
    discount: null,
  };

  constructor(
    private subscriptionService: SubscriptionService, 
    public ref: DynamicDialogRef,
    private contactService: ContactService,
    private packageService: PackageService
    ) { }


  ngOnInit(): void {

        this.contactService.loadContacts();
        this.contactsSubscription = this.contactService.contacts$.subscribe(contacts => {
        this.allContacts = contacts;
        this.contactSuggestions = this.allContacts.map(contact => `${contact.nom} ${contact.prenom}`);

      });

      this.packageService.loadPackages();
      this.packagesSubscription = this.packageService.packages$.subscribe(packages => {
      this.allPackages = packages;
      this.packageSuggestions = this.allPackages.map(pack => `${pack.packageName}`);

      });

      

  }
  ngOnDestroy(): void {

    
    if (this.createSubSubscription) {
      this.createSubSubscription.unsubscribe();
    }

    if (this.packagesSubscription) {
      this.packagesSubscription.unsubscribe();
    }
    
    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }


  }

  addNewSubscription() {

    const selectedContact = this.allContacts.find(contact => `${contact.nom} ${contact.prenom}` === this.selectedContact);
    const selectedPackage = this.allPackages.find(pack => `${pack.packageName}` === this.selectedPackage);

    this.newSubscription.subscribedContact_id = selectedContact.id;
    this.newSubscription.subscribedPackage_id = selectedPackage.id;

    
   this.createSubSubscription= this.subscriptionService.createSubscription(this.newSubscription).subscribe({
      next:  (response)=>
      {
        console.log(response)
        this.ref.close(this.newSubscription);
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("task complete")
      }
    });

  }

  searchContact(event) {
    const query = event.query;
    this.contactSuggestions = this.allContacts
        .filter(contact => contact.nom.toLowerCase().startsWith(query.toLowerCase()) || contact.prenom.toLowerCase().startsWith(query.toLowerCase()))
        .map(contact => `${contact.nom} ${contact.prenom}`);
}

searchPackage(event) {
  const query = event.query;
  this.packageSuggestions = this.allPackages
      .filter(pack => pack.packageName.toLowerCase().startsWith(query.toLowerCase()))
      .map(pack => `${pack.packageName}`);
}




}
