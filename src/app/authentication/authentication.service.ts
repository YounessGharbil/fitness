import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { AuthenticationRequest } from './authentication-request';
import { Observable, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AuthenticationResponse } from './authentication-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  constructor(private http: HttpClient,@Inject(DOCUMENT) private document: any) { }
  
  ngOnInit(): void {
    
  }

  private baseURL = `http://localhost:8080/Auth`;

  public authenticatedUser:AuthenticationResponse;

  private readonly TOKEN_KEY = '__auth_token__';



  authenticate(authReq:AuthenticationRequest ):Observable<any>{
    return this.http.post(`${this.baseURL}`,authReq).pipe(
      tap(response=>{
        localStorage.setItem(this.TOKEN_KEY, response.token);
      })
    );
   }

   public getAuthenticatedUser(): AuthenticationResponse {
    return this.authenticatedUser;
  }
   
   clearLocalStorage() {
    localStorage.clear();
    // location.reload();
  }

  addHeaders(headers: HttpHeaders) {
    if (this.authenticatedUser) {
      
       headers.set('Authorization', `Bearer ${this.authenticatedUser.token}`);
       headers.set('userEmail', `${this.authenticatedUser.userEmail}`);
       headers.set('userRole', `${this.authenticatedUser.userRole}`);
       return headers;

    }
    return headers;
  }

}
