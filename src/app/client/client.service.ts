import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements OnInit{

  private baseURL = `http://localhost:8080/Client`;
  
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    
   
  }

  createClient(client:Client):Observable<any>{

    return this.http.post(`${this.baseURL}`,client)

  }

  updateClient(client:Client):Observable<any>{

    return this.http.put(`${this.baseURL}/${client.id}`,client)

  }

  deleteClient(id:number):Observable<any>{

    return this.http.delete(`${this.baseURL}/${id}`);

  }

  getClient(id:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${id}`);

  }

  getClients():Observable<any>{

    return this.http.get(`${this.baseURL}`);

  }

}
