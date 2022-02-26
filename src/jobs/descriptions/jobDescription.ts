export type JobType =
  "broadcastChatMessage" |
  "sendCrcReceivedEmail" |
  "sendCrcTrustChangedEmail" |
  "sendOrderConfirmationEmail";

export interface JobDescription {
  topic: JobType;
  payload(): string;
}