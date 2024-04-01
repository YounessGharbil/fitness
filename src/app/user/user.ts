import { Contact } from "../contact/contact";
import { Role } from "../role/role";

export interface User {

    id?:number;

    contact?:Contact;
    
    email?:string;
               
    role?:Role;

}
