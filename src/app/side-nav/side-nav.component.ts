import { Component, OnInit} from '@angular/core';

import {
  faDashboard,
  faLocation,
  faShop,
  faBox,
  faMoneyBill,
  faChartBar,
  faContactBook,
  faHand,
  faUser,
  faUsers,
  faUsersGear,
  faMasksTheater,
  faIdCard,
  faFileEdit,faAngleDown,faAngleUp
  
  
} from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { AuthenticationResponse } from '../authentication/authentication-response';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit  {

  items: MenuItem[];

  faDashboard = faDashboard;
  faLocation = faLocation;
  faShop = faShop;
  faBox = faBox;
  faMoneyBill = faMoneyBill;
  faChartBar = faChartBar;
  faContactBook = faContactBook;
  faHand = faHand;
  faUser=faUser;
  faUsers=faUsers;
  faUsersGear=faUsersGear
  faMasksTheater=faMasksTheater
  faIdCard=faIdCard
  faFileEdit=faFileEdit
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  sidebarVisible: boolean;
  menuOpen: boolean = false;
  userMenuOpen:boolean=false;

  authenticatedUser:any;
  userFirstName:string;
  userLastName:string


  
  // ngOnInit(): void {
  //   this.items = [
     
  //     {
  //       label: 'Logout',
  //       icon: 'pi pi-sign-out',
        
  //   },
  // ];
  // }


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





  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleUserMenu(){
    this.userMenuOpen=!this.userMenuOpen;
  }

  
  
}
