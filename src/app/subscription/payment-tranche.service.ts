import { Injectable } from '@angular/core';
import { PaymentTranche } from './payment-tranche';

@Injectable({
  providedIn: 'root'
})
export class PaymentTrancheService {
  
  private tranches: PaymentTranche[] = [];

  addTranche(tranche: PaymentTranche): void {
    this.tranches.push(tranche);
  }

  getTranches(): PaymentTranche[] {
    return this.tranches;
  }

  setTranches(tranches: PaymentTranche[]): void {
    this.tranches = tranches;
  }

  clearTranches(): void {
    this.tranches = [];
  }
}
