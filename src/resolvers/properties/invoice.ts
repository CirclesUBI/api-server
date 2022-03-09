import {Invoice, InvoiceResolvers} from "../../types";
import {Context} from "../../context";
import {invoiceLinesDataLoader} from "../dataLoaders/invoiceLinesDataLoader";
import {invoicePaymentTransactionDataLoader} from "../dataLoaders/invoicePaymentTransactionDataLoader";

export const invoicePropertyResolver : InvoiceResolvers = {
  lines: async (parent: Invoice, args: any, context: Context) => {
    return invoiceLinesDataLoader.load(parent.id);
  },
  paymentTransaction: async (parent: Invoice, args: any, context: Context) => {
    if (!parent.paymentTransactionHash){
      return null;
    }
    return invoicePaymentTransactionDataLoader.load({
      buyerAddress: parent.buyerAddress,
      transactionHash: parent.paymentTransactionHash
    });
  },
}