import { PaymentTranche } from "../subscription/payment-tranche";
import { PayMethod } from "./PayMethod";

export interface Payment {

    id?:number;

    paymentTranche:PaymentTranche;

    paymentMethod:PayMethod;

    amount:number;
    
    paymentDate:string;

    subscriptionid:number;

}
