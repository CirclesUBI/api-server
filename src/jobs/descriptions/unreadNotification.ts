import {JobDescription} from "./jobDescription";

export class UnreadNotification extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly timestamp: string;
  readonly type: string;
  readonly circlesAddress: string;
  readonly contactAddress: string;
  readonly transactionHash?: string;
  readonly direction: string;

  constructor(timestamp: string
            , type: string
            , circlesAddress: string
            , contactAddress: string
            , direction: string
            , transactionHash?: string) {
    super("atMostOnceJob", "unreadNotification", `${timestamp}${type}${circlesAddress}${direction}${transactionHash ?? ''}`);
    this.timestamp = timestamp;
    this.type = type;
    this.circlesAddress = circlesAddress;
    this.contactAddress = contactAddress;
    this.direction = direction;
    this.transactionHash = transactionHash;
  }

  static parse(payload: string) {
    const obj:UnreadNotification = JSON.parse(payload);
    return new UnreadNotification(
      obj.timestamp,
      obj.type,
      obj.circlesAddress,
      obj.contactAddress,
      obj.direction,
      obj.transactionHash
    );
  }
}