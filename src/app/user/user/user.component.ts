import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../user';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Table } from 'primeng/table';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ContactCardComponent } from 'src/app/contact/contact-card/contact-card.component';
import { Contact } from 'src/app/contact/contact';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,OnDestroy {

  
  users:User[];

  loading: boolean = true;

  ref: DynamicDialogRef;

  private usersSubscription: Subscription;
  private deleteUserSubscription: Subscription;



    constructor(
      private userService: UserService,
      private dialogService: DialogService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
      ) {}


    ngOnInit() {
      
       this.usersSubscription= this.userService.getUsers().subscribe({
          next:  (response)=>
          {
            console.log(response);
            this.users=response;
          },
          error:(err)=>{
            console.log(err)
          },
          complete:()=>{
            console.log("task complete")
          }
        });
        this.loading = false;

    }

    ngOnDestroy(): void {

      if (this.deleteUserSubscription) {
        this.deleteUserSubscription.unsubscribe();
      }

      if (this.usersSubscription) {
        this.usersSubscription.unsubscribe();
      }

    }


    clear(table: Table) {
        table.clear();
    }

    applyFilterGlobal(event: any) {
      return event.target.value;
    }

    show() {
      this.ref = this.dialogService.open(CreateUserComponent, { 
          header: 'Create User'
      });
  }

  updateUser(user:User){
    this.ref = this.dialogService.open(UpdateUserComponent, { 
      data: {
          user: user
      },
      header: ' Update User'
    });
  }
  
  deleteUser(id:number){
    this.deleteUserSubscription=this.userService.deleteUser(id).subscribe({
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
          this.deleteUser(id);
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

displayContactCard(contact:Contact){

  this.ref = this.dialogService.open(ContactCardComponent, { 
    data: {
        contact: contact
    },
    header: ' Card'
  });

}

}
