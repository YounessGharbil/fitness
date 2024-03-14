import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observation } from '../observation';
import { ObservationService } from '../observation.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/client';

@Component({
  selector: 'app-create-observation',
  templateUrl: './create-observation.component.html',
  styleUrls: ['./create-observation.component.scss']
})
export class CreateObservationComponent implements OnInit,OnDestroy {

  private createObservationSubscription: Subscription;

  observationTypes: {name: string;value: string;}[];

  selectedObservationType: {name:string,value:string}=null;

  allClients: Client[];

  clientSuggestions: string[];

  selectedClient:string;

  private clientsSubscription: Subscription;


  newObservation: Observation = { 
    
    clientId:null,
    observationType:null,
    content:''

  };

  constructor(private observationService: ObservationService, 
              public ref: DynamicDialogRef,
              private clientService:ClientService,
              private dialogConfig: DynamicDialogConfig,

              ) 
              { }
 
  ngOnInit(): void {
    this.observationTypes = [
      { name: 'Delayed Payment', value: 'Delayed Payment' },
      { name: 'Violation of Gym Rules', value: 'Violation of Gym Rules' },
      { name: 'Irregular Attendance', value: 'Irregular Attendance' },
      { name: 'Lack of Engagement', value: 'Lack of Engagement' },
      { name: 'Membership Renewal', value: 'Membership Renewal' },
      { name: 'Membership Cancellation', value: 'Membership Cancellation' }

  ];

  this.clientService.loadClients();

    this.clientsSubscription = this.clientService.clients$.subscribe(clients => {
    this.allClients = clients;
    this.clientSuggestions = this.allClients.map(client => `${client.contact.nom} ${client.contact.prenom}`);
  });

      if (this.dialogConfig.data && this.dialogConfig.data.client) {
        this.selectedClient = `${this.dialogConfig.data.client.contact.nom} ${this.dialogConfig.data.client.contact.prenom}`;
        this.newObservation.clientId = this.dialogConfig.data.client.id;
      }

  }

  ngOnDestroy(): void {
    // this.createObservationSubscription.unsubscribe();

    if (this.clientsSubscription) {
      this.clientsSubscription.unsubscribe();
    }
  }

  addNewObservation() {

      const selectedClient = this.allClients.find(client => `${client.contact.nom} ${client.contact.prenom}` === this.selectedClient);
      this.newObservation.clientId = selectedClient.id;
    
    this.newObservation.observationType=this.selectedObservationType.value
    this.createObservationSubscription= this.observationService.createObservation(this.newObservation).subscribe({
   next:  (response)=>
   {
    console.log(this.selectedObservationType)
     console.log(response)
     this.ref.close(this.newObservation);
   },
   error:(err)=>{
     console.log(err)
   },
   complete:()=>{
     console.log("task complete")
   }
 });

}

search(event) {
  const query = event.query;
  this.clientSuggestions = this.allClients
      .filter(client => client.contact.nom.toLowerCase().startsWith(query.toLowerCase()) || client.contact.prenom.toLowerCase().startsWith(query.toLowerCase()))
      .map(client => `${client.contact.nom} ${client.contact.prenom}`);
}

}
