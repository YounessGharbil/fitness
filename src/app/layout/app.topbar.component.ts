import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { MenuModule } from 'primeng/menu';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    authenticatedUser:any;
    userFirstName:string;
    userLastName:string

    constructor(public layoutService: LayoutService) { }
    
    ngOnInit() {
        this.items = [
       
            {
                label: 'Navigate',
                items: [
                    
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        routerLink: '/logout'
                    }
    
                ]
            }
        ];

        const authenticatedUserString = localStorage.getItem('Authenticated_User');

        if (authenticatedUserString) {
          this.authenticatedUser = JSON.parse(authenticatedUserString);
    
          console.log('Authenticated User:', this.authenticatedUser);
        } else {
          console.log('Authenticated User not found in localStorage');
        }
    
        this.userLastName=this.authenticatedUser.contact.nom  
        this.userFirstName=this.authenticatedUser.contact.prenom    


    }
}
