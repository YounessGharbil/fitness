import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContactService } from '../contact.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss']
})
export class UpdateContactComponent implements OnInit,OnDestroy {

   contactToUpdate: Contact;

   private updateContactSubscription: Subscription;


  constructor(private dialogConfig: DynamicDialogConfig,
              private contactService: ContactService,
              public ref: DynamicDialogRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
              ) {

  }
 
  ngOnInit(): void {
    this.contactToUpdate=this.dialogConfig.data.contact;
    console.log(this.contactToUpdate);
  }

  ngOnDestroy(): void {
    this.updateContactSubscription.unsubscribe();
  }

  updateContact(){
    this.updateContactSubscription= this.contactService.updateContact(this.contactToUpdate).subscribe({
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

    });
    this.ref.close(this.contactToUpdate);
  }

  confirmUpdate() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            this.updateContact();
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
