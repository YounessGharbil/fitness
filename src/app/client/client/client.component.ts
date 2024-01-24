import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Client } from '../client';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ClientService } from '../client.service';
import { Table } from 'primeng/table';
import { CreateClientComponent } from '../create-client/create-client.component';
import { UpdateClientComponent } from '../update-client/update-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit,OnDestroy  {

  clients:Client[];

  loading: boolean = true;

  ref: DynamicDialogRef;

  private clientsSubscription: Subscription;
  private deleteClientSubscription: Subscription;



    constructor(
      private clientService: ClientService,
      private dialogService: DialogService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
      ) {}


    ngOnInit() {
      
       this.clientsSubscription= this.clientService.getClients().subscribe({
          next:  (response)=>
          {
            console.log(response);
            this.clients=response;
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

      if (this.deleteClientSubscription) {
        this.deleteClientSubscription.unsubscribe();
      }

      if (this.clientsSubscription) {
        this.clientsSubscription.unsubscribe();
      }

    }


    clear(table: Table) {
        table.clear();
    }

    applyFilterGlobal(event: any) {
      return event.target.value;
    }

    show() {
      this.ref = this.dialogService.open(CreateClientComponent, { 
          header: 'Create Client'
      });
  }

  updateClient(client:Client){
    this.ref = this.dialogService.open(UpdateClientComponent, { 
      data: {
          client: client
      },
      header: ' Update Client'
    });
  }
  
  deleteClient(id:number){
    this.deleteClientSubscription=this.clientService.deleteClient(id).subscribe({
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
          this.deleteClient(id);
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
