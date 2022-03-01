import {JobDescription, JobType} from "../jobDescription";

export class InvoicePayed implements JobDescription {
  readonly topic: JobType = "invoicePayed";

  payload(): string {
    return JSON.stringify(this);
  }

  readonly invoiceId: number;
  readonly transactionHash: string;
  readonly transactionTime: Date;

  constructor(invoiceId: number, transactionHash: string, transactionTime: Date) {
    this.invoiceId = invoiceId;
    this.transactionHash = transactionHash;
    this.transactionTime = transactionTime;
  }

  static parse(payload: string) {
    const obj:InvoicePayed = JSON.parse(payload);
    return new InvoicePayed(obj.invoiceId, obj.transactionHash, new Date(obj.transactionTime));
  }
}