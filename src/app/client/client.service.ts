import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements OnInit{

  private baseURL = `http://localhost:8080/Client`;

  private clientsSubject = new BehaviorSubject<any>([]);

  clients$ = this.clientsSubject.asObservable();
  
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    
   
  }

  loadClients(): void {

    this.http.get<any>(`${this.baseURL}`).subscribe({
      next:  (response)=>
          {
            console.log(response);
            this.clientsSubject.next(response);
          },
          error:(err)=>{
            console.log(err)
          },
          complete:()=>{
            console.log("task complete")
          }
    });
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
