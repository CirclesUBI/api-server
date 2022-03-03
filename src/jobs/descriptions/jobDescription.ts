export type JobType =
  "broadcastChatMessage" |
  "sendCrcReceivedEmail" |
  "sendCrcTrustChangedEmail" |
  "sendOrderConfirmationEmail" |
  "verifyEmailAddress" |
  "invoicePayed" |
  "sendVerifyEmailAddressEmail" |
  "echo" |
  "inviteCodeFromExternalTrigger";

export type JobKind =
  "broadcast" |
  "atMostOnceJob" |
  "atMostOnceTrigger" |
  "perpetualTrigger";

export interface JobDescription {
  _kind: JobKind;
  _topic: JobType;
  _identity: string;
  _timeoutAt: Date|undefined;
  getPayload(): string;
}