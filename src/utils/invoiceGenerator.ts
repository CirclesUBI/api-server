import PDFDocument from "pdfkit";
import { Invoice, InvoiceLine, Offer, Profile } from "../api-db/client";
import AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { Environment } from "../environment";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import dayjs from "dayjs";
import { getDateWithOffset } from "./getDateWithOffset";
dayjs.extend(utc);
dayjs.extend(timezone);

export type PdfInvoiceLine = {
  amount: number;
  offer: {
    title: string;
    pricePerUnit: number;
  };
};

export type PdfInvoiceData = {
  storageKey: string;
  invoice_nr: string;
  invoice_date: string;
  transferTime: string;
  transactionHash: string;
  salesTax: {
    name: string;
    value: string;
  }[];
  subtotal: number;
  timeCirclesTotal: number;
  buyer: {
    postal_code: string;
    name: string;
    address: string;
    city: string;
    country: string;
    safe_address: string;
  };
  seller: {
    postal_code: string;
    name: string;
    address: string;
    city: string;
    country: string;
    safe_address: string;
  };
  items: PdfInvoiceLine[];
};

export type PdfDbInvoiceData = Invoice & {
  customerProfile: Profile;
  sellerProfile: Profile;
  lines: (InvoiceLine & { product: Offer })[];
};
export type PdfInvoicePaymentTransaction = { hash: string; timestamp: Date | null };

export function pdfInvoiceDataFromDbInvoice(
  data: PdfDbInvoiceData,
  paymentTransaction?: PdfInvoicePaymentTransaction
): PdfInvoiceData {
  const buyer = data.customerProfile;
  const seller = data.sellerProfile;

  if (!buyer.circlesAddress || !seller.circlesAddress) {
    throw new Error(
      `Couldn't create a pdf for invoice ${data.invoiceNo} because the seller or buyer has no circlesAddress.`
    );
  }

  const items = data.lines.map((o) => {
    return <PdfInvoiceLine>{
      offer: {
        pricePerUnit: parseFloat(o.product.pricePerUnit),
        title: o.product.title,
      },
      amount: o.amount,
    };
  });

  const total = items.reduce((p, c) => p + c.amount * c.offer.pricePerUnit, 0);

  function displayableName(firstName: string, lastName?: string | null) {
    return `${firstName} ${lastName ? lastName : ""}`;
  }

  return {
    storageKey: `${seller.circlesAddress}/${data.invoiceNo}.pdf`,
    buyer: {
      safe_address: buyer.circlesAddress,
      name: displayableName(buyer.firstName, buyer.lastName),
      address: "",
      city: "",
      country: "",
      postal_code: "",
    },
    seller: {
      name: displayableName(seller.firstName, seller.lastName),
      address: "Reifenstuehlstr. 6",
      city: "München",
      country: "Deutschland",
      postal_code: "80469",
      safe_address: seller.circlesAddress,
    },
    // TODO: Use the user's timezone
    invoice_date: dayjs(data.createdAt).tz("Europe/Berlin").format("YYYY-MM-DD HH:mm:ss"),
    invoice_nr: data.invoiceNo,
    transactionHash: paymentTransaction?.hash ?? "",
    transferTime: paymentTransaction?.timestamp
      ? paymentTransaction
        ? dayjs(getDateWithOffset(paymentTransaction.timestamp)).tz("Europe/Berlin").format("YYYY-MM-DD HH:mm:ss")
        : ""
      : "",
    items: items,
    subtotal: total,
    salesTax: [
      // TODO: replace the Currently 19% hardcoded with dynamic
      {
        name: "19",
        value: ((total / 1.19) * (19 / 100)).toFixed(2),
      },
    ],
    timeCirclesTotal: 0,
  };
}

export class InvoicePdfGenerator {
  margin: number = 30;
  marginx: number = 50;
  lineMargin: number = 15;
  _top: number = this.margin;

  set top(value: number) {
    this._top = value;
    // console.log("CURRENT TOP: ", this._top);
    // console.log("STACK ", new Error().stack);
  }

  get top() {
    return this._top;
  }

  readonly invoice: PdfInvoiceData;

  constructor(invoice: PdfInvoiceData) {
    this.invoice = invoice;
  }

  generate(): PDFKit.PDFDocument {
    let doc = new PDFDocument({
      size: "A4",
      margins: { top: this.margin, left: this.margin, bottom: 10, right: 50 },
    });

    const logo = "static/logo.png";

    this.generateHeader(doc, logo, this.invoice);
    this.generateCustomerInformation(doc, this.invoice);
    this.generateInvoiceTable(doc, this.invoice);
    this.generateSubtotalTable(doc, this.invoice);
    this.generateTransactionMetaData(doc, this.invoice);
    this.generateFooter(doc, this.invoice);

    doc.end();

    return doc;
  }

  async savePdfToS3(key: string, pdfDocument: PDFKit.PDFDocument) {
    const params: {
      Bucket: string;
      Body?: any;
      Key: string;
      ACL: string;
    } = {
      Bucket: "circlesland-invoices",
      Key: key,
      ACL: "private",
    };

    return new Promise<PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>>((resolve, reject) => {
      let pdfBytes: any[] = [];
      pdfDocument.on("readable", (_) => {
        try {
          while (true) {
            let buffer = pdfDocument.read();
            if (!buffer) {
              break;
            }
            pdfBytes.push(buffer);
          }
        } catch (e) {
          reject(e);
        }
      });
      pdfDocument.on("end", async (_) => {
        try {
          params.Body = Buffer.concat(pdfBytes);
          const result = await Environment.filesBucket.putObject(params).promise();
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  private newPageCheck(doc: typeof PDFDocument, invoice: any, itemsHeader = false) {
    if (this.top > 730) {
      this.generateFooter(doc, invoice);
      doc.addPage();
      this.top = this.margin;
      if (itemsHeader) {
        doc.rect(0, this.top, doc.page.width, 28).fill("#F8F8FA").font("Helvetica-Bold").fillColor("#333333");
        this.generateTableRow(doc, this.top + 10, "ITEM", "QTY", "COST", "PRICE");
        this.top += 50;
      }
    }
  }

  private generateHeader(
    doc: typeof PDFDocument,
    sellerLogo: string,
    invoice: { invoice_nr: string; invoice_date: string }
  ) {
    let sectionTop = this.top;
    doc
      .rect(0, 0, doc.page.width, 120)
      .fill("#F8F8FA")
      .image(sellerLogo, this.marginx, this.top - 5, { width: 250 })
      .fillColor("#333333")
      .fontSize(20)
      .text("Invoice", 300, this.top)
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("Invoice Number", 300, (this.top += 30))
      .font("Helvetica")
      .fillColor("#000000")
      .text(invoice.invoice_nr, 300, (this.top += this.lineMargin))

      .font("Helvetica-Bold")
      .fillColor("#333333")
      .text("Date", 300, (sectionTop += 30), { align: "right" })
      .font("Helvetica")
      .fillColor("#000000")
      .text(invoice.invoice_date, 300, (sectionTop += this.lineMargin), {
        align: "right",
      })

      .moveDown();
  }

  private generateCustomerInformation(
    doc: typeof PDFDocument,
    invoice: {
      buyer: {
        name: string;
        address: string;
        postal_code: string;
        city: string;
        country: string;
        safe_address: string;
      };
      seller: {
        name: string;
        address: string;
        postal_code: string;
        city: string;
        country: string;
        safe_address: string;
      };
    }
  ) {
    let sectionTop = (this.top += 70);

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor("#333333")
      .text("Bill to:", 50, this.top)
      .font("Helvetica")
      .fillColor("#000000")
      .text(invoice.buyer.name, this.marginx, (this.top += this.lineMargin))
      .text(invoice.buyer.address, this.marginx, (this.top += this.lineMargin))
      .text(`${invoice.buyer.postal_code} ${invoice.buyer.city}`, this.marginx, (this.top += this.lineMargin))
      .text(invoice.buyer.country, this.marginx, (this.top += this.lineMargin))

      .font("Helvetica-Bold")
      .fillColor("#333333")
      .text("Safe Address:", this.marginx, (this.top += 20))
      .font("Helvetica")
      .fillColor("#000000")
      .fontSize(8)
      .text(invoice.buyer.safe_address, this.marginx, (this.top += this.lineMargin))

      // Seller
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor("#333333")
      .text("Bill From:", 300, sectionTop)
      .font("Helvetica")
      .fillColor("#000000")
      .text(invoice.seller.name, 300, (sectionTop += this.lineMargin))
      .text(invoice.seller.address, 300, (sectionTop += this.lineMargin))
      .text(`${invoice.seller.postal_code} ${invoice.buyer.city}`, 300, (sectionTop += this.lineMargin))
      .text(invoice.seller.country, 300, (sectionTop += this.lineMargin))

      .font("Helvetica-Bold")
      .fillColor("#333333")
      .text("Safe Address:", 300, (sectionTop += 20))
      .font("Helvetica")
      .fillColor("#000000")
      .fontSize(8)
      .text(invoice.seller.safe_address, 300, (sectionTop += this.lineMargin))

      .moveDown();
  }

  private generateSubtotalTable(
    doc: typeof PDFDocument,
    invoice: {
      salesTax: { name: string; value: string }[];
      subtotal: number;
      timeCirclesTotal: number;
    }
  ) {
    if (this.top > 680) {
      doc.addPage();
      this.top = this.margin;
    }

    doc
      .strokeColor("#333333")
      .lineWidth(1)
      .moveTo(300, (this.top += 20))
      .lineTo(550, this.top)
      .stroke();

    this.newPageCheck(doc, invoice);

    this.top += 10;

    if (invoice.salesTax && invoice.salesTax.length) {
      invoice.salesTax.forEach((taxRow, index) => {
        doc
          .fontSize(10)
          .font("Helvetica")
          .fillColor("#333333")

          .text(`VAT ${taxRow.name}% (included)`, 300, index == 0 ? this.top : (this.top += 20), {
            width: 100,
            align: "left",
          })
          .text(taxRow.value, 0, this.top, {
            align: "right",
          });
      });
      this.top += 20;
    }

    this.newPageCheck(doc, invoice);

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor("#333333")

      .text("Invoice Total", 300, this.top, { width: 70, align: "left" })
      .text(this.formatCurrency(invoice.subtotal), 0, this.top, {
        align: "right",
      });

    this.newPageCheck(doc, invoice);
    this.newPageCheck(doc, invoice);

    doc
      .strokeColor("#333333")
      .lineWidth(1)
      .moveTo(300, (this.top += 20))
      .lineTo(550, this.top)
      .stroke();

    this.newPageCheck(doc, invoice);

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#333333")

      .text("Paid in Time Circles", 300, (this.top += 20), {
        width: 100,
        align: "left",
      })
      .text(`-${invoice.timeCirclesTotal} c`, 0, this.top, {
        align: "right",
      })
      .moveDown();

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor("#333333")

      .text("Amount due", 300, (this.top += 20), { width: 70, align: "left" })
      .text(this.formatCurrency(0), 0, this.top, { align: "right" });

    this.newPageCheck(doc, invoice);
  }

  private generateTransactionMetaData(
    doc: typeof PDFDocument,
    invoice: { transferTime: string; transactionHash: string }
  ) {
    this.top += 40;
    this.newPageCheck(doc, invoice);

    doc
      .rect(0, this.top - 10, doc.page.width, 90)
      .fill("#F8F8FA")
      .font("Helvetica-Bold")
      .fillColor("#333333")

      .font("Helvetica-Bold")
      .fillColor("#333333")
      .text("Transaction Time", this.marginx, this.top)
      .font("Helvetica")
      .fillColor("#000000")
      .text(invoice.transferTime, this.marginx, (this.top += this.lineMargin))

      .font("Helvetica-Bold")
      .fillColor("#333333")
      .text("Transaction Hash", this.marginx, (this.top += 20))
      .font("Helvetica")
      .fillColor("#000000")
      .text(invoice.transactionHash, this.marginx, (this.top += this.lineMargin));
  }

  private generateInvoiceTable(
    doc: typeof PDFDocument,
    invoice: {
      items: {
        amount: number;
        offer: { title: string; pricePerUnit: number };
      }[];
    }
  ) {
    let i;
    this.top += 40;
    doc
      .rect(0, this.top - 10, doc.page.width, 30)
      .fill("#F8F8FA")
      .font("Helvetica-Bold")
      .fillColor("#333333");
    this.generateTableRow(doc, this.top, "ITEM", "QTY", "COST", "PRICE");

    this.top += 5;
    this.newPageCheck(doc, invoice);

    this.top += 5;
    doc.font("Helvetica");

    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];

      this.top += 20;
      this.newPageCheck(doc, invoice, true);

      this.generateTableRow(
        doc,
        this.top,
        item.offer.title,
        item.amount.toString(),
        item.offer.pricePerUnit.toString(),
        // formatCurrency(item.amount * item.offer.pricePerUnit)
        (item.amount * item.offer.pricePerUnit).toString()
      );
      if (this.top > 680) {
        this.generateFooter(doc, invoice);
      }
    }
  }

  private generateFooter(doc: typeof PDFDocument, invoice: any) {
    doc
      .font("Helvetica")
      .fontSize(8)
      .text("Basic Income Lab GmbH | Reifenstuelstr. 6 | 80469 München", 50, 790, { align: "center", width: 500 })

      .text("Tel.: 089-38466851 | lab@circles.name.", 50, 800, {
        align: "center",
        width: 500,
      })

      .text(
        "Bankverbindung: IBAN DE19110101015407699323 | BIC SOBKDEB2XXX | Penta Bank USt.-ID: DE32/271/3268",
        50,
        810,
        { align: "center", width: 500 }
      )
      .text("HRB 269232 | Registergericht: München | Geschäftsführung: Samuel Andert ", 50, 820, {
        align: "center",
        width: 500,
      });
  }

  private generateTableRow(
    doc: typeof PDFDocument,
    y: number,
    item: string,
    unitCost: string,
    quantity: string,
    lineTotal: string
  ) {
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor("#333333")
      .text(item, 50, y)
      .font("Helvetica")
      .text(unitCost, 300, y, { width: 70, align: "left" })
      .text(quantity, 370, y, { width: 90, align: "left" })
      .text(lineTotal, 0, y, { align: "right" });
  }

  private generateHr(doc: typeof PDFDocument, y: number) {
    doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
  }

  private formatCurrency(amount: number) {
    return amount + " €";
  }
}
