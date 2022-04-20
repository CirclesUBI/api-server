export class NoSession extends Error {
  constructor(message:string) {
    super(message);
    Object.setPrototypeOf(this, NoSession.prototype);
  }
}