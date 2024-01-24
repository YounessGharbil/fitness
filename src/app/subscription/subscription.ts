import { Contact } from "../contact/contact";
import { Package } from "../package/package";

export interface Sub {
      id?:number;
	 
      discount?:number;
    
      priceAfterDiscount?:number;
    
      startDate?:string;
    
      endDate?:string;
    
      status?:string;
    
      subscribedPackage_id?:number;

      subscribedContact_id?:number;

      subscribedPackage?:Package;

      subscribedContact?:Contact;

}
