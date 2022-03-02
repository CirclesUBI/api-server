import { Context } from "../../context";
import { QueryInvoiceArgs } from "../../types";
import { Environment } from "../../environment";
import {AWSError, S3} from "aws-sdk";
import {PromiseResult} from "aws-sdk/lib/request";
import {InvoicePdfGenerator, pdfInvoiceDataFromDbInvoice, PdfInvoicePaymentTransaction} from "../../utils/invoiceGenerator";
import {Buffer} from "buffer";

export const invoice = async (
  parent: any,
  args: QueryInvoiceArgs,
  context: Context
) => {
  const caller = await context.callerInfo;
  if (!caller?.profile)
    throw new Error(`You need a profile to use this feature.`);

  const invoice = await Environment.readonlyApiDb.invoice.findFirst({
    where: {
      id: args.invoiceId,
      OR: [
        {
          customerProfile: {
            circlesAddress: caller.profile.circlesAddress,
          },
        },
        {
          sellerProfile: {
            circlesAddress: caller.profile.circlesAddress,
          },
        },
      ],
    },
    include: {
      sellerProfile: true,
    },
  });

  if (!invoice) {
    return null;
  }

  let result:  PromiseResult<S3.GetObjectOutput, AWSError>|null = null;

  async function generateInvoiceFromData(id: any) : Promise<Buffer> {
    const invoice = await Environment.readonlyApiDb.invoice.findUnique({
      where: {
        id: id
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

    if (!invoice) {
      throw new Error(`Couldn't find an invoice with id ${id}`);
    }

    const paymentPdfData: PdfInvoicePaymentTransaction = {
      hash: invoice.paymentTransactionHash ?? "",
      timestamp: null,
    };""

    if (invoice.paymentTransactionHash) {
      const transactionHashAndTimestamp = await Environment.indexDb.query(
        `select timestamp, hash from transaction_2 where hash = $1`,
        [invoice.paymentTransactionHash]);

      if (transactionHashAndTimestamp.rowCount == 1) {
        paymentPdfData.timestamp = transactionHashAndTimestamp.rows[0].timestamp;
        paymentPdfData.hash = invoice.paymentTransactionHash;
      }
    }

    const invoicePdfData = pdfInvoiceDataFromDbInvoice(
      invoice,
      paymentPdfData
    );

    const invoiceGenerator = new InvoicePdfGenerator(invoicePdfData);
    const invoicePdfDocument = invoiceGenerator.generate();

    return new Promise<Buffer>(
      (resolve, reject) => {
        let pdfBytes: any[] = [];
        invoicePdfDocument.on("readable", (_) => {
          try {
            while (true) {
              let buffer = invoicePdfDocument.read();
              if (!buffer) {
                break;
              }
              pdfBytes.push(buffer);
            }
          } catch (e) {
            reject(e);
          }
        });
        invoicePdfDocument.on("end", async (_) => {
          try {
            resolve(Buffer.concat(pdfBytes));
          } catch (e) {
            reject(e);
          }
        });
      }
    );
  }

  try {
    result = await Environment.filesBucket
      .getObject({
        Bucket: "circlesland-invoices",
        Key: `${invoice.sellerProfile.circlesAddress}/${invoice.invoiceNo}.pdf`,
      })
      .promise();

    if (!result.Body) {
      return (await generateInvoiceFromData(invoice.id)).toString("base64");
    } else {
      return result.Body.toString("base64");
    }
  } catch (e) {
    return (await generateInvoiceFromData(invoice.id)).toString("base64");
  }
};
