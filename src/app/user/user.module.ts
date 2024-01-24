import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserCardComponent } from './user-card/user-card.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { UserRoutingModule } from './user-routing/user-routing.module';



@NgModule({
  declarations: [
    UserComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    UserRoutingModule,
  ],
  exports:[UserComponent]
})
export class UserModule { }
