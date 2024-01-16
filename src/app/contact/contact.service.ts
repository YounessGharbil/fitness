import { Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Contact } from './contact';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnInit {

  private baseURL = `http://localhost:8080/Contact`;
  contacts:Array<Contact>=new Array();
  

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    
   
  }

  createContact(contact:Contact):Observable<any>{

    return this.http.post(`${this.baseURL}`,contact)

  }

  updateContact(contact:Contact):Observable<any>{

    return this.http.put(`${this.baseURL}/${contact.id}`,contact)

  }

  deleteContact(id:number):Observable<any>{

    return this.http.delete(`${this.baseURL}/${id}`);

  }

  getContact(id:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${id}`);

  }

  getContacts():Observable<any>{

    return this.http.get(`${this.baseURL}`);

  }

  getAllContacts():Contact[]{

    return this.contacts ;
    
  }



  private generateUniqueId(): number {
    // Replace this with a proper unique ID generation logic
    return Math.floor(Math.random() * 1000);
  }

  addContact(newContact: Contact): void {
    // Assign a unique ID to the new contact (you may want to use a more robust method)
    newContact.id = this.generateUniqueId();

    // Add the new contact to the list
    console.log("------------"+newContact.id+"--------");
    this.contacts.push(newContact);
  }

  
  
}
