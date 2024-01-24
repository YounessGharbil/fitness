import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { PackageComponent } from './package/package.component';
import { PackageCardComponent } from './package-card/package-card.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { PackageRoutingModule } from './package-routing/package-routing.module';



@NgModule({
  declarations: [
    UpdatePackageComponent,
    CreatePackageComponent,
    PackageComponent,
    PackageCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    PackageRoutingModule
  ]
})
export class PackageModule { }
