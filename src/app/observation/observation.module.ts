import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationComponent } from './observation/observation.component';
import { CreateObservationComponent } from './create-observation/create-observation.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ObservationRoutingModule } from './observation-routing/observation-routing.module';

@NgModule({
  declarations: [
    ObservationComponent,
    CreateObservationComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    PrimeNgModule,
    ObservationRoutingModule,
  ]
})
export class ObservationModule { }
