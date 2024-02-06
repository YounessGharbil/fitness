import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sub } from '../subscription';
import { SubscriptionService } from '../subscription.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Contact } from 'src/app/contact/contact';
import { ContactService } from 'src/app/contact/contact.service';
import { Package } from 'src/app/package/package';
import { PackageService } from 'src/app/package/package.service';
import { PaymentTrancheService } from '../payment-tranche.service';
import { PaymentMode } from '../payment-mode';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.scss']
})
export class CreateSubscriptionComponent implements OnInit,OnDestroy {
  
  numberOfTranches:number;
  paymentMode:PaymentMode={paymentTranches:null};

  allContacts: Contact[];
  allPackages: Package[];

  contactSuggestions: string[];

  selectedContact:string;
  selectedPackage:Package;


  private contactsSubscription: Subscription;
  private packagesSubscription: Subscription;


  private createSubSubscription: Subscription;

  
  newSubscription: Sub = { 
    subscribedContact_id: null,
    subscribedPackage_id: null,
    discount: null,
    paymentMode: {
        paymentTranches: []
    }
  };

  constructor(
    private subscriptionService: SubscriptionService, 
    public ref: DynamicDialogRef,
    private contactService: ContactService,
    private packageService: PackageService,
    private paymentTrancheService:PaymentTrancheService
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

    this.newSubscription.subscribedContact_id = selectedContact.id;

    this.newSubscription.subscribedPackage_id = this.selectedPackage.id;

    this.paymentMode.paymentTranches= this.paymentTrancheService.getTranches();

    this.newSubscription.paymentMode=this.paymentMode;

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


}
