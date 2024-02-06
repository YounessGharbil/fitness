import { PaymentTranche } from "./payment-tranche";
import { Sub } from "./subscription";

export interface PaymentMode {

    id?:number;

    subscription_id?:number;

    subscription?:Sub;

    paymentTranches:Array<PaymentTranche>;

}
