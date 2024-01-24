import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';

const PRIME_NG_MODULES = [
  TableModule,ButtonModule,DynamicDialogModule,
  InputTextModule,CheckboxModule,RadioButtonModule,
  ProgressSpinnerModule,ConfirmDialogModule,ToastModule,
  CalendarModule
  
];

@NgModule({
  imports: PRIME_NG_MODULES,
  exports: PRIME_NG_MODULES,
  providers: [DialogService,MessageService,ConfirmationService],
})
export class PrimeNgModule { }
