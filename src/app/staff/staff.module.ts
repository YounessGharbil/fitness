import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff/staff.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { StaffRoutingModule } from './staff-routing/staff-routing.module';



@NgModule({
  declarations: [
    StaffComponent,
    CreateStaffComponent,
    UpdateStaffComponent,
    StaffCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    StaffRoutingModule,
  ],
  exports:[StaffComponent]
})
export class StaffModule { }
