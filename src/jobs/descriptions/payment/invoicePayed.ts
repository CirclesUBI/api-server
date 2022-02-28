import {JobDescription, JobType} from "../jobDescription";

export class InvoicePayed implements JobDescription {
  readonly topic: JobType = "invoicePayed";

  payload(): string {
    return JSON.stringify(this);
  }

  readonly invoiceId: number;
  readonly sellerProfileId: number;
  readonly transactionHash: string;
  readonly transactionTime: Date;

  constructor(invoiceId: number, sellerProfileId: number, transactionHash: string, transactionTime: Date) {
    this.invoiceId = invoiceId;
    this.sellerProfileId = sellerProfileId;
    this.transactionHash = transactionHash;
    this.transactionTime = transactionTime;
  }

  static parse(payload: string) {
    const obj:InvoicePayed = JSON.parse(payload);
    return new InvoicePayed(obj.invoiceId, obj.sellerProfileId, obj.transactionHash, new Date(obj.transactionTime));
  }
}