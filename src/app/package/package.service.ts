import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Package } from './package';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService  {

  constructor(private http: HttpClient) { }
 
  private baseURL = `http://localhost:8080/Package`;

  private packagesSubject = new BehaviorSubject<any>([]);

  packages$ = this.packagesSubject.asObservable();
  
  loadPackages(): void {

    this.http.get<any>(`${this.baseURL}`).subscribe({
      next:  (response)=>
          {
            console.log(response);
            this.packagesSubject.next(response);
          },
          error:(err)=>{
            console.log(err)
          },
          complete:()=>{
            console.log("task complete")
          }
    });

  }

  updatePackages(packages: Package[]): void {
    this.packagesSubject.next(packages);
  }

  createPackage(pack: Package): Observable<any> {
    return this.http.post(`${this.baseURL}`, pack).pipe(
      tap((response) => {
        const currentPackages = this.packagesSubject.value;
        const updatedPackages = [...currentPackages, response];
        this.updatePackages(updatedPackages);
      })
    );
  }

  updatePackage(Package:Package):Observable<any>{

    return this.http.put(`${this.baseURL}/${Package.id}`,Package)

  }

  deletePackage(id:number):Observable<any>{

    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      tap(() => {
        const currentPackages = this.packagesSubject.value;
        const updatedPackages = currentPackages.filter(pack => pack.id !== id);
        this.updatePackages(updatedPackages);
      })
    );

  }

  getPackage(id:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${id}`);

  }

  getPackages():Observable<any>{

    return this.http.get(`${this.baseURL}`);

  }


}
