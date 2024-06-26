import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateContactComponent } from '../create-contact/create-contact.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UpdateContactComponent } from '../update-contact/update-contact.component';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit,OnDestroy {


  contacts:Contact[];

  loading: boolean = true;

  ref: DynamicDialogRef;

  private contactsSubscription: Subscription;
  private deleteContactSubscription: Subscription;



    constructor(
      private contactService: ContactService,
      private dialogService: DialogService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
      ) {}


    ngOnInit() {
      this.contactService.loadContacts();
      this.contactsSubscription = this.contactService.contacts$.subscribe(contacts => {
        this.contacts = contacts;
        this.loading = false;
      });
    }

    ngOnDestroy(): void {

      if (this.deleteContactSubscription) {
        this.deleteContactSubscription.unsubscribe();
      }

      if (this.contactsSubscription) {
        this.contactsSubscription.unsubscribe();
      }

    }


    clear(table: Table) {
        table.clear();
    }

    applyFilterGlobal(event: any) {
      return event.target.value;
    }

    show() {
      this.ref = this.dialogService.open(CreateContactComponent, { 
          header: 'Créer un contact',
          width: '70vw',
          height:'80vw',
          modal:true,
          contentStyle: { overflow: 'auto' },
          maximizable: true
      });
  }

  updateContact(contact:Contact){

    this.ref = this.dialogService.open(UpdateContactComponent, { 
      data: {
          contact: contact
      },
      header: 'Modifier un contact',
      width: '70vw',
      height:'50vw',
      modal:true,
      contentStyle: { overflow: 'auto' },
      maximizable: true
    });

  }
  
  deleteContact(id:number){
    this.deleteContactSubscription=this.contactService.deleteContact(id).subscribe({
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
          this.deleteContact(id);
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
