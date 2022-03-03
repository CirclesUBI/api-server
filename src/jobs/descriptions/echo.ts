import {JobDescription} from "./jobDescription";

export class Echo extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly text: string;

  constructor(text:string) {
    super("perpetualTrigger", "echo", text);
    this.text = text;
  }

  static parse(payload: string) {
    const obj:Echo = JSON.parse(payload);
    return new Echo(obj.text);
  }
}