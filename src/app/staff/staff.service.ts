import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Staff } from './staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService implements OnInit {

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    
  }
  
  private baseURL = `http://localhost:8080/Staff`;


  private staffsSubject = new BehaviorSubject<any>([]);

  staffs$ = this.staffsSubject.asObservable();
  
  loadStaffs(): void {

    this.http.get<any>(`${this.baseURL}`).subscribe({
      next:  (response)=>
          {
            console.log(response);
            this.staffsSubject.next(response);
          },
          error:(err)=>{
            console.log(err)
          },
          complete:()=>{
            console.log("task complete")
          }
    });

  }

  updateStaffs(staffs: Staff[]): void {
    this.staffsSubject.next(staffs);
  }

  createStaff(staff: Staff): Observable<any> {
    return this.http.post(`${this.baseURL}`, staff).pipe(
      tap((response) => {
        const currentStaffs = this.staffsSubject.value;
        const updatedStaffs = [...currentStaffs, response];
        this.updateStaffs(updatedStaffs);
      })
    );
  }

  updateStaff(staff:Staff):Observable<any>{

    return this.http.put(`${this.baseURL}/${staff.id}`,staff)

  }

  deleteStaff(id:number):Observable<any>{

    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      tap(() => {
        const currentStaffs = this.staffsSubject.value;
        const updatedStaffs = currentStaffs.filter(staff => staff.id !== id);
        this.updateStaffs(updatedStaffs);
      })
    );

  }

  getStaff(id:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${id}`);

  }

  getStaffs():Observable<any>{

    return this.http.get(`${this.baseURL}`);

  }

}
