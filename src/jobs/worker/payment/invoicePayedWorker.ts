import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {InvoicePayed} from "../../descriptions/payment/invoicePayed";
import {
  InvoicePdfGenerator,
  PdfDbInvoiceData,
  pdfInvoiceDataFromDbInvoice,
  PdfInvoicePaymentTransaction
} from "../../../utils/invoiceGenerator";
import {Environment} from "../../../environment";
import {log, logErr} from "../../../utils/log";
import {JobQueue} from "../../jobQueue";
import {BroadcastPurchased} from "../../descriptions/market/broadcastPurchased";

type Transfer = {
  hash: string,
  timestamp: Date,
};

export class InvoicePayedWorker extends JobWorker<InvoicePayed> {
  name(): string {
    return "InvoicePayedWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: InvoicePayed) {
    const transferMetadata = {
      hash: job.transactionHash,
      timestamp: job.transactionTime
    };

    const paidInvoice = await this.markInvoiceAsPaid(job.invoiceId, transferMetadata);

    await this.persistInvoice(
      paidInvoice,
      transferMetadata);

    if (paidInvoice.customerProfile.circlesAddress
     && paidInvoice.sellerProfile.circlesAddress) {
      await JobQueue.broadcast(
        new BroadcastPurchased(
          paidInvoice.customerProfile.circlesAddress,
          paidInvoice.sellerProfile.circlesAddress,
          paidInvoice.purchaseId));
    }

    return undefined;
  }

  private async markInvoiceAsPaid(
    invoiceId: number,
    transfer:Transfer) {

    const updateInvoiceResult =
      await Environment.readWriteApiDb.invoice.update({
        where: {
          id: invoiceId,
        },
        data: {
          paymentTransactionHash: transfer.hash
        },
        include: {
          customerProfile: true,
          sellerProfile: true,
          lines: {
            include: {
              product: true,
            },
          },
        },
      });

    log(`     `,
      `[] [invoiceId: ${invoiceId}] [InvoicePayedWorker.markInvoiceAsPayed]`,
      `Updated invoice ${updateInvoiceResult.id}. ` +
      `Invoice no.: ${updateInvoiceResult.invoiceNo}, ` +
      `Payment transaction: '${updateInvoiceResult.paymentTransactionHash}', ` +
      `Pickup code: '${updateInvoiceResult.pickupCode}'.`
    );

    return updateInvoiceResult;
  }

  private async persistInvoice(
    invoice:PdfDbInvoiceData,
    transfer:Transfer) {

    log(`     `,
      `[] [invoiceId: ${invoice.id}] [InvoicePayedWorker.persistInvoice]`,
      `Storing the invoice `);

    const paymentPdfData: PdfInvoicePaymentTransaction = {
      hash: transfer.hash,
      timestamp: transfer.timestamp,
    };

    const invoicePdfData = pdfInvoiceDataFromDbInvoice(
      invoice,
      paymentPdfData
    );

    const invoiceGenerator = new InvoicePdfGenerator(invoicePdfData);
    const invoicePdfDocument = invoiceGenerator.generate();
    const saveResult = await invoiceGenerator.savePdfToS3(
      invoicePdfData.storageKey,
      invoicePdfDocument
    );

    if (saveResult.$response.error) {
      const errMessage =
        `An error occurred while saving the pdf of invoice '${invoicePdfData.invoice_nr}' ` +
        `(id: ${invoice.id}) to ${Environment.filesBucket.endpoint.href}: ${JSON.stringify(saveResult.$response.error)}`;

      logErr(`ERR  `, `[] [invoiceId: ${invoice.id}] [InvoicePayedWorker.persistInvoice]`, errMessage);
    }
  }

}