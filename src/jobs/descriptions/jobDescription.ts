export type JobType =
  "broadcastChatMessage" |
  "sendCrcReceivedEmail" |
  "sendCrcTrustChangedEmail" |
  "sendOrderConfirmationEmail" |
  "verifyEmailAddress" |
  "invoicePayed" |
  "sendVerifyEmailAddressEmail";

export type JobKind =
  "broadcast" |
  "regular" |
  "atMostOnce" |
  "externalTrigger";

export interface JobDescription {
  _kind: JobKind;
  _topic: JobType;
  _identity: string;
  _timeoutAt: Date|undefined;
  getPayload(): string;
}