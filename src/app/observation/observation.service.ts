import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Observation } from './observation';

@Injectable({
  providedIn: 'root'
})
export class ObservationService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  private baseURL = `http://localhost:8080/Observation`;

  private ObservationsSubject = new BehaviorSubject<any>([]);

  Observations$ = this.ObservationsSubject.asObservable();
  
  loadObservations(): void {

    this.http.get<any>(`${this.baseURL}`).subscribe({
      next:  (response)=>
          {
            console.log(response);
            this.ObservationsSubject.next(response);
          },
          error:(err)=>{
            console.log(err)
          },
          complete:()=>{
            console.log("task complete")
          }
    });

  }

  updateObservations(Observations: Observation[]): void {
    this.ObservationsSubject.next(Observations);
  }

  createObservation(Observation: Observation): Observable<any> {
    return this.http.post(`${this.baseURL}`, Observation).pipe(
      tap((response) => {
        const currentObservations = this.ObservationsSubject.value;
        const updatedObservations = [...currentObservations, response];
        this.updateObservations(updatedObservations);
      })
    );
  }

  updateObservation(Observation:Observation):Observable<any>{

    return this.http.put(`${this.baseURL}/${Observation.id}`,Observation)

  }

  deleteObservation(id:number):Observable<any>{

    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      tap(() => {
        const currentObservations = this.ObservationsSubject.value;
        const updatedObservations = currentObservations.filter(Observation => Observation.id !== id);
        this.updateObservations(updatedObservations);
      })
    );

  }

  getObservation(id:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${id}`);

  }

  getObservations():Observable<any>{

    return this.http.get(`${this.baseURL}`);

  }



}
