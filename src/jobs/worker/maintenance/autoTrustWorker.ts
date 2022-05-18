import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {AutoTrust} from "../../descriptions/maintenance/autoTrust";
import {Environment} from "../../../environment";
import {GnosisSafeProxy} from "../../../circles/gnosisSafeProxy";
import {RpcGateway} from "../../../circles/rpcGateway";
import {CirclesHub} from "../../../circles/circlesHub";
import BN from "bn.js";

export class AutoTrustWorker extends JobWorker<AutoTrust> {
  name(): string {
    return "AutoTrustWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: AutoTrust) {
    const autoTrustAgent = await Environment.readonlyApiDb.agent.findFirst({
      where: {
        ownerSafeAddress: job.inviterAddress,
        topic: job._topic,
        enabled: true
      }
    });

    if (!autoTrustAgent) {
      return {
        info: `No auto trust config for safe ${job.inviterAddress}`
      };
    }

    console.log(`Auto trusting ${job.newUserAddress} for safe ${job.inviterAddress} ..`);

    const circlesHub = new CirclesHub(RpcGateway.get(), Environment.circlesHubAddress);
    const safeProxy = new GnosisSafeProxy(RpcGateway.get(), job.inviterAddress);
    const receipt = await circlesHub.setTrust(autoTrustAgent.privateKey, safeProxy, job.newUserAddress, new BN("100"))

    console.log(`Auto trusting ${job.newUserAddress} for safe ${job.inviterAddress} done.`);

    return {
      info: `TxHash: ${receipt.transactionHash}`
    };
  }
}
