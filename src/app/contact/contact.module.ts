import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { ContactRoutingModule } from './contact-routing/contact-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';











@NgModule({
  declarations: [
    ContactComponent,
    CreateContactComponent,
    UpdateContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    TableModule,ButtonModule,DynamicDialogModule,
    InputTextModule,CheckboxModule,RadioButtonModule,
    ProgressSpinnerModule,ConfirmDialogModule,ToastModule,
    CalendarModule

  ],
  providers: [DialogService,MessageService,ConfirmationService],
  exports:[ContactComponent]
})
export class ContactModule { }
