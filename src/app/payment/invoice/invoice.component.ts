import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Payment } from '../payment';
import { Client } from 'src/app/client/client';
(pdfMake as any).vfs=pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  private payment:Payment;

  private client:Client;

  constructor(public ref: DynamicDialogRef,private dialogConfig: DynamicDialogConfig,
    ){

  }
  ngOnInit(): void {

    this.payment=this.dialogConfig.data.payment;
    this.client=this.dialogConfig.data.client;

    this.generateInvoice();

  }

  generateInvoice(){
    let docDefinition :any = {
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
            {
              text: 'Client Information',
              style: 'header'
            },
            {
              text: 'Invoice Details',
              style: 'header'
            }
          ]
        },
        {
          columns: [
            {
              text: [
                { text: 'Client Name: ', bold: true },
                this.client.contact.nom +" "+ this.client.contact.prenom,
                { text: 'Address: ', bold: true },
                this.client.contact.adresse + " " + this.client.contact.ville,
                { text: 'Email: ', bold: true },
                this.client.contact.email,
                { text: 'Phone: ', bold: true },
                this.client.contact.tel
              ]
            },
            {
              text: [
                { text: 'Invoice Number: ', bold: true },
                'INV-001\n',
                { text: 'Date: ', bold: true },
                'January 15, 2024\n',
                { text: 'Due Date: ', bold: true },
                'January 31, 2024'
              ]
            }
          ]
        },
        {
          text: 'Items',
          style: 'subheader',
          margin: [0, 20, 0, 10] // top, right, bottom, left
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Subscribed package', 'Quantity', 'Price'],
              [this.client.subscription.subscribedPackage.packageName, '1', this.payment.amount],
             
            ]
          }
        },
        {
          text: 'Total: '+this.payment.amount,
          style: 'total',
          margin: [0, 20, 0, 0] // top, right, bottom, left
        }
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 14,
          margin: [0, 10, 0, 5] // top, right, bottom, left
        },
        subheader: {
          bold: true,
          fontSize: 12,
          margin: [0, 15, 0, 5] // top, right, bottom, left
        },
        total: {
          bold: true,
          fontSize: 14,
          margin: [0, 10, 0, 5], // top, right, bottom, left
          alignment: 'right'
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();

    this.ref.close()

  }

}
