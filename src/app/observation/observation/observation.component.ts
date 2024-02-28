import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observation } from '../observation';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ObservationService } from '../observation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CreateObservationComponent } from '../create-observation/create-observation.component';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent implements OnInit,OnDestroy {

  observations:Observation[];
  loading: boolean = true;
  ref: DynamicDialogRef;
  private observationsSubscription: Subscription;

  constructor(
    private observationService: ObservationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
      
      this.observationService.loadObservations();
      this.observationsSubscription = this.observationService.Observations$.subscribe(observations => {
      this.observations = observations;
      console.log(this.observations)
      this.loading = false;
        });

    }

    ngOnDestroy(): void {

      if (this.observationsSubscription) {
        this.observationsSubscription.unsubscribe();
      }

    }

    clear(table: Table) {
      table.clear();
  }

  applyFilterGlobal(event: any) {
    return event.target.value;
  }

  show() {
    this.ref = this.dialogService.open(CreateObservationComponent, { 
        header: 'Create Observation',
        width: '70vw',
        height:'50vw',
        modal:true,
        contentStyle: { overflow: 'auto' },
        maximizable: true
    });
}

}
