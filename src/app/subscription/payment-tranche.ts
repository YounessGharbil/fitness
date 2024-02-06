import { PaymentMode } from "./payment-mode";

export interface PaymentTranche {

    id?:number;

    paymentMode?:PaymentMode;

    paymentMode_id?:number;

    amount:number;

    dueDate:string;

    isTranchePaid?:boolean;

}
