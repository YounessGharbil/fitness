import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentTrancheService } from '../payment-tranche.service';
import { PaymentTranche } from '../payment-tranche';
import { ConfirmationService, MessageService } from 'primeng/api';



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
  tranches: PaymentTranche[] = [];

  areTranchesSet:boolean=false;
  
  @Output() eventEmitter = new EventEmitter<boolean>();
  


  constructor(private paymentTrancheService:PaymentTrancheService,
              private confirmationService: ConfirmationService, 
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
    this.areTranchesSet=true
    this.eventEmitter.emit(this.areTranchesSet)
    // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

  }

  calculatePriceAfterDiscount() {
    const discountAmount = (this.discount / 100) * this.packagePrice;
    this.priceAfterDiscount = this.packagePrice - discountAmount;
  }

  private formatDate(date: any): string {
    return date ? date.toISOString().split('T')[0] : '';;
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.setTranches();
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
}


}
