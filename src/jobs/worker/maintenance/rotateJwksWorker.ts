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
    const ks = jose.JWK.createKeyStore();
    const keyStore = await ks.generate('RSA', 2048, {alg: 'RSA', use: 'sig' });

    const latestKey = await Environment.readonlyApiDb.jwks.findFirst({
      orderBy: {
        createdAt: "desc"
      }
    });

    if (latestKey && latestKey.createdAt > new Date(Date.now() - Environment.keyRotationInterval)) {
      return;
    }

    const keyStoreJson = keyStore.toJSON(true);
    await Environment.readWriteApiDb.jwks.create({
      data: {
        ...keyStoreJson
      }
    });

    return undefined;
  }
}