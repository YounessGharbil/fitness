import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AuthenticationRoutingModule } from './authentication-routing/authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    AuthenticationRoutingModule,
  ],
  exports: [LoginComponent, LogoutComponent]
})
export class AuthenticationModule { }
