import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observation } from '../observation';
import { ObservationService } from '../observation.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-observation',
  templateUrl: './create-observation.component.html',
  styleUrls: ['./create-observation.component.scss']
})
export class CreateObservationComponent implements OnInit,OnDestroy {

  private createObservationSubscription: Subscription;

  newObservation: Observation = { 
    
    clientId:null,
    observationType: '',
    content:''

  };

  constructor(private observationService: ObservationService, public ref: DynamicDialogRef) { }
  ngOnDestroy(): void {
    this.createObservationSubscription.unsubscribe();
  }
  ngOnInit(): void {
  }

  addNewObservation() {
    this.createObservationSubscription= this.observationService.createObservation(this.newObservation).subscribe({
   next:  (response)=>
   {
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

}
