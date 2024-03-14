import { Component, Input, OnInit } from '@angular/core';
import { PaymentTrancheService } from '../payment-tranche.service';
import { PaymentTranche } from '../payment-tranche';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment-tranche',
  templateUrl: './payment-tranche.component.html',
  styleUrls: ['./payment-tranche.component.scss']
})
export class PaymentTrancheComponent implements OnInit {

  @Input()
  numberOfTranches:number;

  @Input()
  discount:number;

  @Input()
  packagePrice:number;

  priceAfterDiscount:number;
  
  amounts: number[] = [];
  dueDates: string[] = [];
  private tranches: PaymentTranche[] = [];


  constructor(private paymentTrancheService:PaymentTrancheService,
              private messageService: MessageService
              ){}
  
   ngOnInit() {
    this.calculatePriceAfterDiscount();
  }

  getTranchesArray(): number[] {
    return Array.from({ length: this.numberOfTranches }, (_, index) => index);
  }

  setTranches() {
    
    const tranches: PaymentTranche[] = this.amounts.map((amount, index) => ({
      amount,
      dueDate: this.formatDate(this.dueDates[index]),
      isTranchePaid:false,
      paymentMode:null
    }));

    this.paymentTrancheService.setTranches(tranches);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

  }

  calculatePriceAfterDiscount() {
    const discountAmount = (this.discount / 100) * this.packagePrice;
    this.priceAfterDiscount = this.packagePrice - discountAmount;
  }

  private formatDate(date: any): string {
    return date ? date.toISOString().split('T')[0] : '';;
  }


}
