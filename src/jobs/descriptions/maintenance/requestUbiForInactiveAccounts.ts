import {JobDescription} from "../jobDescription";
import {Day} from "./rotateJwks";

export type Hour = Day & {
  hour: number
}

export class RequestUbiForInactiveAccounts extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly hour: Hour;

  constructor(hour: Hour) {
    const identity = `${hour.year}${hour.month}${hour.date}${hour.hour}`;
    super("atMostOnceJob", "requestUbiForInactiveAccounts", identity);
    this.hour = hour;
  }

  static parse(payload: string) {
    const obj:RequestUbiForInactiveAccounts = JSON.parse(payload);
    return new RequestUbiForInactiveAccounts(obj.hour);
  }
}