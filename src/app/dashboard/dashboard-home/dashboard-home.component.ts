import { Component, OnInit } from '@angular/core';
import { AuthenticationResponse } from 'src/app/authentication/authentication-response';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  constructor(private authenticationService:AuthenticationService){

  }
  authenticationResponse:any;
  ngOnInit(): void {
    this.authenticationResponse=localStorage.getItem('Authenticated_User');
    console.log(this.authenticationResponse)
  }

}
