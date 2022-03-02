import { InvoicePdfGenerator } from "../utils/invoiceGenerator";
import PDFDocument from "pdfkit";
import * as fs from "fs";

describe("Invoice Generator", () => {
  describe("test generate function", () => {
    const items = [
      {
        amount: 1,
        offer: {
          title: "OFFER_1",
          pricePerUnit: 10,
        },
      },
      {
        amount: 1,
        offer: {
          title: "OFFER_2",
          pricePerUnit: 10,
        },
      },
    ];
    const invoicePdfData = {
      storageKey: "STORAGEKEY",
      buyer: {
        safe_address: "BUYER_SAFE_ADDRESS",
        name: "BUYER_NAME",
        address: "",
        city: "",
        country: "",
        postal_code: "",
      },
      seller: {
        name: "SELLER_NAME",
        address: "SELLER_ADDRESS",
        city: "SELLER_CITY",
        country: "SELLER_COUNTRY",
        postal_code: "SELLER_POST_CODE",
        safe_address: "SELLER_SAFE_ADDRESS",
      },
      invoice_date: "DATE",
      invoice_nr: "INVOICE_NR",
      transactionHash: "TRANSACTION_HASH",
      transferTime: "TRANSFER_TIME",
      items: items,
      subtotal: 10,
      salesTax: [
        {
          name: "TAX",
          value: "19",
        },
      ],
      timeCirclesTotal: 10,
    };
    const invoiceGenerator = new InvoicePdfGenerator(invoicePdfData);
    const invoicePdfDocument = invoiceGenerator.generate();

    it("should create invoice document", () => {
      expect(invoicePdfDocument).toBeInstanceOf(PDFDocument);
      invoicePdfDocument.pipe(fs.createWriteStream("src/test/TestInvoice.pdf"));
    });
  });
});
