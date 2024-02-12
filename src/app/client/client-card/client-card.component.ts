import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientService } from '../client.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from '../client';
import { PaymentTranche } from 'src/app/subscription/payment-tranche';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {

  client: Client;
  tranches:PaymentTranche[];

  ref: DynamicDialogRef;
  
  constructor(
    private dialogConfig: DynamicDialogConfig,
    private clientService: ClientService,

    ) {}

  ngOnInit(): void {

        this.client=this.dialogConfig.data.client;
        this.tranches=this.client.subscription.paymentMode.paymentTranches;

  }

}
