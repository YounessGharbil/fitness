import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { AuthenticationRequest } from './authentication-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  private authenticatedUserSubject: BehaviorSubject<AuthenticationResponse | null> = new BehaviorSubject<AuthenticationResponse | null>(null);
  public authenticatedUser$: Observable<AuthenticationResponse | null> = this.authenticatedUserSubject.asObservable();



  authenticate(authReq:AuthenticationRequest ):Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('__auth_token__')}`
    });

    return this.http.post(`${this.baseURL}`,authReq).pipe(
      tap(response=>{
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem('Authenticated_User_Email',response.userAccount.email)
        localStorage.setItem('Authenticated_User_Role',response.userAccount.role.rolename)
        localStorage.setItem('Authenticated_User_FirstName',response.userAccount.contact.prenom)
        localStorage.setItem('Authenticated_User_LastName',response.userAccount.contact.nom)

        this.authenticatedUser=response.userAccount;
        localStorage.setItem('Authenticated_User',JSON.stringify(this.authenticatedUser))

        this.authenticatedUserSubject.next(response.userAccount); 


      })
    );
   }

  //  public getAuthenticatedUser(): AuthenticationResponse {
  //   return this.authenticatedUser;
  // }
  public getAuthenticatedUser(): Observable<AuthenticationResponse | null> {
    return this.authenticatedUser$;
  }
   
   clearLocalStorage() {
    localStorage.clear();
    // location.reload();
  }

  addHeaders(headers: HttpHeaders) {
      
       headers.set('Authorization', `Bearer ${this.authenticatedUser.token}`);

       return headers;

  }

}
