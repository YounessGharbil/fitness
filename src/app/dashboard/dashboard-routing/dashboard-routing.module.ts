import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from '../dashboard-home/dashboard-home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', component: DashboardHomeComponent },
  { path: '', component: DashboardComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
})
export class DashboardRoutingModule { }
