import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../authentication-request';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  isUserAuthenticated:boolean;

  constructor(private authenticationService:AuthenticationService,private router:Router){

  }

  ngOnInit(): void {
    
    this.isUserAuthenticated=localStorage.getItem('__auth_token__')!=null

  }
  ngOnDestroy(): void {
  }

  authenticationRequest:AuthenticationRequest={

    email:null,
    password:null
    
  };

  login() {
    console.log("inside login component login function")
    this.authenticationService.authenticate(this.authenticationRequest).subscribe({
      next: (response) => {
        console.log(response);
        console.log("inside login component login next")

        this.router.navigate(['/']).then(() => {
          console.log("inside login component before reload")
          window.location.reload();
          console.log("inside login component before after")

        });
      }
    });
  }

}
