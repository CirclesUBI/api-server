import {JobDescription, JobType} from "../jobDescription";

export class InvoicePayed implements JobDescription {
  readonly _topic: JobType = "invoicePayed";
  readonly _kind = "atMostOnce";
  readonly _identity: string;

  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly invoiceId: number;
  readonly transactionHash: string;
  readonly transactionTime: Date;

  constructor(invoiceId: number, transactionHash: string, transactionTime: Date) {
    this.invoiceId = invoiceId;
    this.transactionHash = transactionHash;
    this.transactionTime = transactionTime;
    this._identity = this._topic + this.invoiceId + this.transactionHash;
  }

  static parse(payload: string) {
    const obj:InvoicePayed = JSON.parse(payload);
    return new InvoicePayed(obj.invoiceId, obj.transactionHash, new Date(obj.transactionTime));
  }
}