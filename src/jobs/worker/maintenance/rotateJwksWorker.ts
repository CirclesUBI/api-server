import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {RotateJwks} from "../../descriptions/maintenance/rotateJwks";
import {Environment} from "../../../environment";

const jose = require('node-jose');


export class RotateJwksWorker extends JobWorker<RotateJwks> {
  name(): string {
    return "RotateJwksWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: RotateJwks) {
    const keyStore = jose.JWK.createKeyStore();
    const newKey = await keyStore.generate('RSA', 2048, {alg: 'RS256', use: 'sig' });

    const latestKey = await Environment.readonlyApiDb.jwks.findFirst({
      orderBy: {
        createdAt: "desc"
      }
    });

    if (latestKey && latestKey.createdAt > new Date(Date.now() - Environment.keyRotationInterval)) {
      return;
    }

    await Environment.readWriteApiDb.jwks.create({
      data: {
        ...newKey
      }
    });

    return undefined;
  }
}