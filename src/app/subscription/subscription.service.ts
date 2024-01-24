import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sub } from './subscription';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
 
  private baseURL = `http://localhost:8080/Subscription`;
  
  constructor(private http: HttpClient) { }
  
  private subscriptionsSubject = new BehaviorSubject<any>([]);

  subscriptions$ = this.subscriptionsSubject.asObservable();
  
  loadSubscriptions(): void {

    this.http.get<any>(`${this.baseURL}`).subscribe({
      next:  (response)=>
          {
            console.log(response);
            this.subscriptionsSubject.next(response);
          },
          error:(err)=>{
            console.log(err)
          },
          complete:()=>{
            console.log("task complete")
          }
    });

  }

  updateSubscriptions(subscriptions: Sub[]): void {
    this.subscriptionsSubject.next(subscriptions);
  }

  createSubscription(sub: Sub): Observable<any> {
    return this.http.post(`${this.baseURL}`, sub).pipe(
      tap((response) => {
        const currentSubscriptions = this.subscriptionsSubject.value;
        const updatedSubscriptions = [...currentSubscriptions, response];
        this.updateSubscriptions(updatedSubscriptions);
      })
    );
  }

  updateSubscription(subscription:Sub):Observable<any>{

    subscription.subscribedPackage_id=subscription.subscribedPackage.id;
    
    return this.http.put(`${this.baseURL}/${subscription.id}`,subscription)

  }

  deleteSubscription(id:number):Observable<any>{

    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      tap(() => {
        const currentSubscriptions = this.subscriptionsSubject.value;
        const updatedSubscriptions = currentSubscriptions.filter(sub => sub.id !== id);
        this.updateSubscriptions(updatedSubscriptions);
      })
    );

  }

  getSubscription(id:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${id}`);

  }

  getSubscriptions():Observable<any>{

    return this.http.get(`${this.baseURL}`);

  }



}
