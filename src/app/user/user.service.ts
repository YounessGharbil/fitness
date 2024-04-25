import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  
  private baseURL = `${BASE_URL}/User`;
  
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    
   
  }

  createUser(user:User):Observable<any>{

    return this.http.post(`${this.baseURL}`,user)

  }

  updateUser(user:User):Observable<any>{

    return this.http.put(`${this.baseURL}/${user.id}`,user)

  }

  deleteUser(id:number):Observable<any>{

    return this.http.delete(`${this.baseURL}/${id}`);

  }

  getUser(id:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${id}`);

  }

  getUsers():Observable<any>{

    return this.http.get(`${this.baseURL}`);

  }


}
