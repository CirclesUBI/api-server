export type JobType =
  "broadcastChatMessage" |
  "sendCrcReceivedEmail" |
  "sendCrcTrustChangedEmail" |
  "sendOrderConfirmationEmail" |
  "invoicePayed";

export type JobKind =
  "broadcast" |
  "regular" |
  "atMostOnce";

export interface JobDescription {
  _kind: JobKind;
  _topic: JobType;
  _identity: string;
  getPayload(): string;
}