import * as crypto from "crypto";
import {Buffer} from "buffer";

export class Generate
{
  static randomHexString(length:number=16) : string
  {
    const randomData = crypto.randomBytes(length);
    return randomData.toString("hex");
  }

  static randomInt4() : number {
    const randomData = crypto.randomBytes(4);
    return randomData.readUInt32LE();
  }

  static randomBase64String(length: number) {
    const randomData = new Uint8Array(length);
    window.crypto.getRandomValues(randomData);
    const randomDataBuffer = Buffer.from(randomData);
    return randomDataBuffer.toString("hex");
  }
}
