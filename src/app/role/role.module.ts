import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role/role.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { RoleRoutingModule } from './role-routing/role-routing.module';



@NgModule({
  declarations: [
    RoleComponent,
    CreateRoleComponent,
    UpdateRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    RoleRoutingModule,
  ],
  exports:[RoleComponent]
})
export class RoleModule { }
