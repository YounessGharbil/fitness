import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';
import { TopWidgetsComponent } from './top-widgets/top-widgets.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { SalesByMonthComponent } from './sales-by-month/sales-by-month.component';
import { SalesByCategoryComponent } from './sales-by-category/sales-by-category.component';
import { LastTransactionsComponent } from './last-transactions/last-transactions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    DashboardHomeComponent,
    TopWidgetsComponent,
    TopProductsComponent,
    SalesByMonthComponent,
    SalesByCategoryComponent,
    LastTransactionsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }