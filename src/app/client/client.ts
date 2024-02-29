import { Contact } from "../contact/contact";
import { Observation } from "../observation/observation";
import { Sub } from "../subscription/subscription";

export interface Client {

	id?:number;
	
	contact?:Contact;
	
	gymid?:string;
	
	subscription?:Sub;
	
    observations?:Observation[];
	
	userAccount?:any;

}
