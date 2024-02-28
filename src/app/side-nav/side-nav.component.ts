import { Component } from '@angular/core';

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
  faFileEdit
  
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

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


}
