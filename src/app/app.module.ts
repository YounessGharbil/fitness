import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ContactModule } from './contact/contact.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule  } from '@angular/platform-browser/animations';
import { PaymentModule } from './payment/payment.module';
import { ObservationModule } from './observation/observation.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthInterceptor } from './authentication/auth.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { EventService } from './demo/service/event.service';
import { CustomerService } from './demo/service/customer.service';
import { CountryService } from './demo/service/country.service';
import { ProductService } from './demo/service/product.service';
import { PhotoService } from './demo/service/photo.service';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutModule } from './layout/app.layout.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    NotfoundComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    ContactModule,
    PaymentModule,
    ObservationModule,
    AuthenticationModule,
    PrimeNgModule,
    AppLayoutModule


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    CountryService, CustomerService, EventService, IconService, NodeService,
    PhotoService, ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
