import {JobDescription} from "../jobDescription";

export type Day = {
  year: number
  month: number
  date: number
}

export class RotateJwks extends JobDescription {
  getPayload(): string {
    return JSON.stringify(this);
  }

  readonly day: Day;

  constructor(hour: Day) {
    const identity = `${hour.year}${hour.month}${hour.date}`;
    super("atMostOnceJob", "rotateJwks", identity);
    this.day = hour;
  }

  static parse(payload: string) {
    const obj:RotateJwks = JSON.parse(payload);
    return new RotateJwks(obj.day);
  }
}