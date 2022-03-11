import {JobDescription} from "../jobDescription";
import {Generate} from "../../../utils/generate";

export class SendWelcomeEmail extends JobDescription {
  getPayload(): string {
    return JSON.stringify({
      ...this,
    });
  }

  readonly to: string;

  constructor(to: string) {
    super("atMostOnceJob", "sendWelcomeEmail", Generate.randomHexString());
    this.to  = to;
  }

  static parse(payload: string) {
    const obj = JSON.parse(payload);
    return new SendWelcomeEmail(obj.to);
  }
}