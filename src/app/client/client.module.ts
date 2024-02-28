import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ClientCardComponent } from './client-card/client-card.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ClientRoutingModule } from './client-routing/client-routing.module';



@NgModule({
  declarations: [
    ClientComponent,
    CreateClientComponent,
    UpdateClientComponent,
    ClientCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    ClientRoutingModule,
  ],
  exports:[ClientComponent]
})
export class ClientModule { }
