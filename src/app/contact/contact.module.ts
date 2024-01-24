import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { ContactRoutingModule } from './contact-routing/contact-routing.module';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactComponent,
    CreateContactComponent,
    UpdateContactComponent,
    ContactCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    ContactRoutingModule,
  ],
  providers: [],
  exports:[ContactComponent]
})
export class ContactModule { }
