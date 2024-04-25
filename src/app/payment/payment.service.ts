import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CheckPayment } from './check-payment';
import { CashPayment } from './cash-payment';
import { CardPayment } from './card-payment';
import { PaymentTranche } from '../subscription/payment-tranche';
import { Payment } from './payment';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseURL = `${BASE_URL}/Payment`;

  private paymentTranchesSubject = new BehaviorSubject<PaymentTranche[]>([]);

  // private paymentsSubject=new BehaviorSubject<Payment[]>([]);

  paymentTranches$ = this.paymentTranchesSubject.asObservable();
  // payments$=this.paymentsSubject.asObservable();

  constructor(private http: HttpClient) { }

  createCheckPayment(checkPayment: CheckPayment): Observable<CheckPayment> {

    return this.http.post<CheckPayment>(`${this.baseURL}/check-payment`, checkPayment)
    // .pipe(
    //   tap(
    //     (response) => {
    //       const currentPayments = this.paymentsSubject.value;
    //       const updatedPayments = [...currentPayments, response];
    //       this.updatePayments(updatedPayments);
    //     }
    //   )
    // )
  }

  createCashPayment(cashPayment: CashPayment): Observable<CashPayment> {
    return this.http.post<CashPayment>(`${this.baseURL}/cash-payment`, cashPayment)
    // .pipe(
    //   tap(
    //     (response) => {
    //       const currentPayments = this.paymentsSubject.value;
    //       const updatedPayments = [...currentPayments, response];
    //       this.updatePayments(updatedPayments);
    //     }
    //   )
    // )
  }

  createCardPayment(cardPayment: CardPayment): Observable<CardPayment> {

    return this.http.post<CardPayment>(`${this.baseURL}/card-payment`, cardPayment)
    // .pipe(
    //   tap(
    //     (response) => {
    //       const currentPayments = this.paymentsSubject.value;
    //       const updatedPayments = [...currentPayments, response];
    //       this.updatePayments(updatedPayments);
    //     }
    //   )
    // )
  }

  getPayment(id:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${id}`);

  }

  gePayments():Observable<any>{

    return this.http.get(`${this.baseURL}`);

  }

  updatePaymentTranches(paymentTranches: PaymentTranche[]) {

    this.paymentTranchesSubject.next(paymentTranches);
    
  }

  // updatePayments(payments: Payment[]) {

  //   this.paymentsSubject.next(payments);
    
  // }
  // setPayments(payments: Payment[]) {
  //   this.paymentsSubject.next(payments);
  // }
}
