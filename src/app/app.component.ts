import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fitness';

  isUserAuthenticated:boolean;

  constructor(private authenticationService:AuthenticationService){}

  ngOnInit(): void {
    this.isUserAuthenticated=localStorage.getItem('__auth_token__')!=null
    console.log("****************")
    console.log( this.isUserAuthenticated)
    console.log("****************")

  }
}
