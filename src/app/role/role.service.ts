import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Role } from './role';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements OnInit {

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    
  }

  private baseURL = `${BASE_URL}/Role`;

  private rolesSubject = new BehaviorSubject<any>([]);

  roles$ = this.rolesSubject.asObservable();
  
  loadRoles(): void {

    this.http.get<any>(`${this.baseURL}`).subscribe({
      next:  (response)=>
          {
            console.log(response);
            this.rolesSubject.next(response);
          },
          error:(err)=>{
            console.log(err)
          },
          complete:()=>{
            console.log("task complete")
          }
    });

  }

  updateRoles(roles: Role[]): void {
    this.rolesSubject.next(roles);
  }

  createRole(role: Role): Observable<any> {
    return this.http.post(`${this.baseURL}`, role).pipe(
      tap((response) => {
        const currentRoles = this.rolesSubject.value;
        const updatedRoles = [...currentRoles, response];
        this.updateRoles(updatedRoles);
      })
    );
  }

  updateRole(role:Role):Observable<any>{

    return this.http.put(`${this.baseURL}/${role.id}`,role)

  }

  deleteRole(id:number):Observable<any>{

    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      tap(() => {
        const currentRoles = this.rolesSubject.value;
        const updatedRoles = currentRoles.filter(Role => Role.id !== id);
        this.updateRoles(updatedRoles);
      })
    );

  }

  getRole(id:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${id}`);

  }

  getRoles():Observable<any>{

    return this.http.get(`${this.baseURL}`);

  }



}
