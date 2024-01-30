import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UpdateContactComponent } from '../update-contact/update-contact.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit,OnDestroy {

  contact: Contact;

  ref: DynamicDialogRef;

  private deleteContactSubscription: Subscription;



  constructor(
    private dialogConfig: DynamicDialogConfig,
    private contactService: ContactService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) {}
  ngOnDestroy(): void {
    if(this.deleteContactSubscription){
      this.deleteContactSubscription.unsubscribe()
    }
  }




  ngOnInit(): void {

        this.contact=this.dialogConfig.data.contact;
        console.log(this.contact)

  }

  updateContact(contact:Contact){

    this.ref = this.dialogService.open(UpdateContactComponent, { 
      data: {
          contact: contact
      },
      header: ' Update Contact'
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
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deleteContact(id);
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: (type) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
      
                  break;
          }
      }
  });
}



}
