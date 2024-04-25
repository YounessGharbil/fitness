import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
        { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
        // { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
        { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
        { path: 'staff', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule) }, 
        { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
        { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
        { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
        { path: 'package', loadChildren: () => import('./package/package.module').then(m => m.PackageModule) },
        { path: 'subscription', loadChildren: () => import('./subscription/subscription.module').then(m => m.SubscriptionModule) },
        { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
        { path: 'observation', loadChildren: () => import('./observation/observation.module').then(m => m.ObservationModule) },
      
    ],
    
},
{ path: 'login', component: LoginComponent },
{ path: 'logout', component: LogoutComponent },
  // { path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  // { path: 'staff', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule) },
  // { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  // { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  // { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
  // { path: 'package', loadChildren: () => import('./package/package.module').then(m => m.PackageModule) },
  // { path: 'subscription', loadChildren: () => import('./subscription/subscription.module').then(m => m.SubscriptionModule) },
  // { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
  // { path: 'observation', loadChildren: () => import('./observation/observation.module').then(m => m.ObservationModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash: false, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
