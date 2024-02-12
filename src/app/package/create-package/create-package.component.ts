import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Package } from '../package';
import { PackageService } from '../package.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent implements OnInit,OnDestroy {



  private createPackageSubscription: Subscription;

  
  newPackage: Package = { 
    packageName: '',
    price: null,
    description: '',
    durationInMonths: null,
  };

  constructor(private packageService: PackageService, public ref: DynamicDialogRef) { }


  ngOnInit(): void {

    
  }
  ngOnDestroy(): void {

    this.createPackageSubscription.unsubscribe();

  }

  addNewPackage() {
    
   this.createPackageSubscription= this.packageService.createPackage(this.newPackage).subscribe({
      next:  (response)=>
      {
        console.log(response)
        this.ref.close(this.newPackage)
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("task complete")
      }
    });

  }

}
