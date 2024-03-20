import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Payment } from '../payment';
import { Client } from 'src/app/client/client';
import { Contact } from 'src/app/contact/contact';
import { Sub } from 'src/app/subscription/subscription';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
   payment: Payment;
   client: Client;
   contact:Contact;
   subscription:Sub;

  constructor(public ref: DynamicDialogRef, private dialogConfig: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.payment = this.dialogConfig.data.payment;
    this.client = this.dialogConfig.data.client;
    this.contact=this.client?this.client.contact:this.payment.subscription.subscribedContact;
    this.subscription=this.client?this.client.subscription:this.payment.subscription
    // this.generateInvoice();
    this.generateInvoice();
  }

  
generateInvoice(): void {
  const element = document.getElementById('pdf-content');
  const options = {
    filename: 'invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(element).set(options).save();

  this.ref.close();
  
}

  // generateInvoice(): void {
  //   const docDefinition: any = {
  //     content: [
  //       {
  //         text: 'INVOICE',
  //         fontSize: 20,
  //         bold: true,
  //         alignment: 'center',
  //         margin: [0, 0, 0, 20]
  //       },
  //       {
  //         columns: [
  //           { text: 'Client Information', style: 'header' },
  //           { text: 'Invoice Details', style: 'header' }
  //         ]
  //       },
  //       {
  //         columns: [
  //           {
  //             stack: [
  //               { text: `Client Name: ${this.contact.nom} ${this.contact.prenom}`, bold: true },
  //               { text: `Address: ${this.contact.adresse} ${this.contact.ville}`, bold: true },
  //               { text: `Email: ${this.contact.email}`, bold: true },
  //               { text: `Phone: ${this.contact.tel}`, bold: true }
  //             ]
  //           },
  //           {
  //             stack: [
  //               { text: `Invoice Number: INV-001`, bold: true },
  //               { text: `Date: ${this.payment.paymentDate}`, bold: true },
  //             ]
  //           }
  //         ]
  //       },
        
  //       {
  //         table: {
  //           headerRows: 1,
  //           widths: ['*', 'auto', 'auto','auto'],
  //           body: [
  //             ['Subscribed package', 'Tranche Id', 'Payment Method', 'Price(DH)'],
  //             [this.subscription.subscribedPackage.packageName,this.payment.paymentTranche.id, this.payment.paymentMethod, `${this.payment.amount} `]
  //           ]
  //         }
  //       },
  //       {
  //         text: `Total: ${this.payment.amount} DH`,
  //         style: 'total',
  //         margin: [0, 20, 0, 0]
  //       }
  //     ],
  //     styles: {
  //       header: {
  //         bold: true,
  //         fontSize: 14,
  //         margin: [0, 10, 0, 5]
  //       },
  //       subheader: {
  //         bold: true,
  //         fontSize: 12,
  //         margin: [0, 15, 0, 5]
  //       },
  //       total: {
  //         bold: true,
  //         fontSize: 14,
  //         margin: [0, 10, 0, 5],
  //         alignment: 'right'
  //       }
  //     }
  //   };

  //   pdfMake.createPdf(docDefinition).open();
  //   this.ref.close();
  // }
}
