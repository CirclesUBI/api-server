import {Invoice, InvoiceResolvers} from "../../types";
import {Context} from "../../context";
import {invoiceLinesDataLoader} from "../dataLoaders/invoiceLinesDataLoader";
import {invoicePaymentTransactionDataLoader} from "../dataLoaders/invoicePaymentTransactionDataLoader";
import {invoiceDeliveryAddressDataLoader} from "../dataLoaders/invoiceDeliveryAddressDataLoader";

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
  deliveryAddress: async (parent: Invoice, args: any, context: Context) => {
    return invoiceDeliveryAddressDataLoader.load(parent.id);
  }
}
