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
  amounts: number[] = [];
  dueDates: string[] = [];
  private tranches: PaymentTranche[] = [];


  constructor(private paymentTrancheService:PaymentTrancheService,
              private messageService: MessageService
              ){}
  
  ngOnInit() {
  }

  getTranchesArray(): number[] {
    return Array.from({ length: this.numberOfTranches }, (_, index) => index);
  }

  setTranches() {
    const tranches: PaymentTranche[] = this.amounts.map((amount, index) => ({
      amount,
      dueDate: this.dueDates[index],
      isTranchePaid:false,
      paymentMode:null
    }));

    console.log(tranches)
  
    // Set tranches in the service
    this.paymentTrancheService.setTranches(tranches);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

  }


}
