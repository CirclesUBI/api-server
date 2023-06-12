import crypto from "crypto";

export type JobType =
  | "echo"
  | "inviteCodeFromExternalTrigger"
  | "requestUbiForInactiveAccounts"
  | "rotateJwks"
  | "unreadNotification"
  | "redeemClaimedInvitation";

export type JobKind = "broadcast" | "atMostOnceJob" | "atMostOnceTrigger" | "perpetualTrigger";

export abstract class JobDescription {
  _kind: JobKind;
  _topic: JobType;
  _identity: string;
  _timeoutAt: Date | undefined;

  protected constructor(kind: JobKind, topic: JobType, identity: string, timeoutAt?: Date) {
    this._kind = kind;
    this._topic = topic;
    this._identity = identity;
    this._timeoutAt = timeoutAt;
  }

  getPayload(): string {
    return JSON.stringify(this);
  }

  getHash(): string {
    return crypto
      .createHash("sha256")
      .update(this._topic + this._identity)
      .digest("hex");
  }
}
