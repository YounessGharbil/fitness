import { Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Contact } from './contact';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnInit {

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    
  }

  private baseURL = `http://localhost:8080/Contact`;

  private contactsSubject = new BehaviorSubject<any>([]);

  contacts$ = this.contactsSubject.asObservable();

  loadContacts(): void {

    this.http.get<any>(`${this.baseURL}`).subscribe({
      next:  (response)=>
          {
            console.log(response);
            this.contactsSubject.next(response);
          },
          error:(err)=>{
            console.log(err)
          },
          complete:()=>{
            console.log("task complete")
          }
    });
  }

  updateContacts(contacts: Contact[]): void {
    this.contactsSubject.next(contacts);
  }

  createContact(contact: Contact): Observable<any> {
    return this.http.post(`${this.baseURL}`, contact).pipe(
      tap((response) => {
        const currentContacts = this.contactsSubject.value;
        const updatedContacts = [...currentContacts, response];
        this.updateContacts(updatedContacts);
      })
    );
  }


  updateContact(contact:Contact):Observable<any>{

    return this.http.put(`${this.baseURL}/${contact.id}`,contact)

  }

  deleteContact(id:number):Observable<any>{

    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      tap(() => {
        const currentContacts = this.contactsSubject.value;
        const updatedContacts = currentContacts.filter(contact => contact.id !== id);
        this.updateContacts(updatedContacts);
      })
    );

  }

  getContact(id:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${id}`);

  }

  getContacts():Observable<any>{

    return this.http.get(`${this.baseURL}`);

  }

  

}
