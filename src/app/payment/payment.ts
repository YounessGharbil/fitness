import { PaymentTranche } from "../subscription/payment-tranche";
import { Sub } from "../subscription/subscription";
import { PayMethod } from "./PayMethod";

export interface Payment {

    id?:number;

    paymentTranche:PaymentTranche;

    paymentMethod:PayMethod;

    amount:number;
    
    paymentDate:string;

    subscriptionid:number;

    subscription?:Sub;

}
