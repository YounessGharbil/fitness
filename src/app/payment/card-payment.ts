import { Payment } from "./payment";

export interface CardPayment extends Payment {

    cardNumber: string;
    cardExpirationDate: string;
    cardCVV: string;
    transactionNumber?: number;
    
}
