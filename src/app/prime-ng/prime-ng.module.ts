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
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MenuModule } from 'primeng/menu';



const PRIME_NG_MODULES = [
  TableModule,ButtonModule,DynamicDialogModule,
  InputTextModule,CheckboxModule,RadioButtonModule,
  ProgressSpinnerModule,ConfirmDialogModule,ToastModule,
  CalendarModule,CardModule,AutoCompleteModule,DropdownModule,
  TabViewModule,ToggleButtonModule,TooltipModule,TagModule,
  AccordionModule,InputSwitchModule,SidebarModule,ConfirmPopupModule,
  MenuModule
  
];

@NgModule({
  imports: PRIME_NG_MODULES,
  exports: PRIME_NG_MODULES,
  providers: [DialogService,MessageService,ConfirmationService],
})
export class PrimeNgModule { }
