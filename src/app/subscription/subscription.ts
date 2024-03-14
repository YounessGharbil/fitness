import { Contact } from "../contact/contact";
import { Package } from "../package/package";
import { Payment } from "../payment/payment";
import { PaymentMode } from "./payment-mode";

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

      paymentMode:PaymentMode;

      payments?:Array<Payment>;

      subscriptionEvents?:Array<any>;

}
