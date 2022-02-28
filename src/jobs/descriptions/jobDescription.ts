export type JobType =
  "broadcastChatMessage" |
  "sendCrcReceivedEmail" |
  "sendCrcTrustChangedEmail" |
  "sendOrderConfirmationEmail" |
  "invoicePayed";

export interface JobDescription {
  topic: JobType;
  payload(): string;
}