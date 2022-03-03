import {JobDescription, JobType} from "./jobDescription";

export class Echo implements JobDescription {
  readonly _topic: JobType = "echo";
  readonly _kind = "perpetualTrigger";
  readonly _identity: string;
  readonly _timeoutAt: undefined;

  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly text: string;

  constructor(text:string) {
    this.text = text;
    this._identity = this._topic + text;
  }

  static parse(payload: string) {
    const obj:Echo = JSON.parse(payload);
    return new Echo(obj.text);
  }
}