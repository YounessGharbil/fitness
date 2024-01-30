import { Contact } from "../contact/contact";
import { Sub } from "../subscription/subscription";

export interface Client {

	id?:number;
	
	contact?:Contact;
	
	gymid?:string;
	
	subscription?:Sub;
	
    observations?:string[];
	
	userAccount?:any;

}
