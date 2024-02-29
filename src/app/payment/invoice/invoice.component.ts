import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Payment } from '../payment';
import { Client } from 'src/app/client/client';
import { Contact } from 'src/app/contact/contact';
import { Sub } from 'src/app/subscription/subscription';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  private payment: Payment;
  private client: Client;
  private contact:Contact;
  private subscription:Sub;

  constructor(public ref: DynamicDialogRef, private dialogConfig: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.payment = this.dialogConfig.data.payment;
    this.client = this.dialogConfig.data.client;
    this.contact=this.client?this.client.contact:this.payment.subscription.subscribedContact;
    this.subscription=this.client?this.client.subscription:this.payment.subscription
    this.generateInvoice();
  }

  generateInvoice(): void {
    const docDefinition: any = {
      content: [
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            { text: 'Client Information', style: 'header' },
            { text: 'Invoice Details', style: 'header' }
          ]
        },
        {
          columns: [
            {
              stack: [
                { text: `Client Name: ${this.contact.nom} ${this.contact.prenom}`, bold: true },
                { text: `Address: ${this.contact.adresse} ${this.contact.ville}`, bold: true },
                { text: `Email: ${this.contact.email}`, bold: true },
                { text: `Phone: ${this.contact.tel}`, bold: true }
              ]
            },
            {
              stack: [
                { text: `Invoice Number: INV-001`, bold: true },
                { text: `Date: ${this.payment.paymentDate}`, bold: true },
              ]
            }
          ]
        },
        
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto','auto'],
            body: [
              ['Subscribed package', 'Tranche Id', 'Payment Method', 'Price(DH)'],
              [this.subscription.subscribedPackage.packageName,this.payment.paymentTranche.id, this.payment.paymentMethod, `${this.payment.amount} `]
            ]
          }
        },
        {
          text: `Total: ${this.payment.amount} DH`,
          style: 'total',
          margin: [0, 20, 0, 0]
        }
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 14,
          margin: [0, 10, 0, 5]
        },
        subheader: {
          bold: true,
          fontSize: 12,
          margin: [0, 15, 0, 5]
        },
        total: {
          bold: true,
          fontSize: 14,
          margin: [0, 10, 0, 5],
          alignment: 'right'
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
    this.ref.close();
  }
}
