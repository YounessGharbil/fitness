import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit,OnDestroy {

  constructor(private authenticationService:AuthenticationService){

  }

  ngOnInit(): void {
    this.logout();              

  }
  ngOnDestroy(): void {
  }

  logout(){
    this.authenticationService.clearLocalStorage();
    location.reload();
  }

}
