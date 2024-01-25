import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../user';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  User: User;

  ref: DynamicDialogRef;

  private deleteUserSubscription: Subscription;



  constructor(
    private dialogConfig: DynamicDialogConfig,
    private UserService: UserService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) {}




  ngOnInit(): void {

        this.User=this.dialogConfig.data.user;
        console.log(this.User)

  }

  updateUser(User:User){

    this.ref = this.dialogService.open(UpdateUserComponent, { 
      data: {
          User: User
      },
      header: ' Update User'
    });

  }
  
  deleteUser(id:number){
    this.deleteUserSubscription=this.UserService.deleteUser(id).subscribe({
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




}
