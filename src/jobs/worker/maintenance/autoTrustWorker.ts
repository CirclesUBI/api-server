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
    const autoTrustAgents = await Environment.readonlyApiDb.agent.findMany({
      where: {
        ownerSafeAddress: job.inviterAddress,
        topic: job._topic,
        enabled: true
      }
    });

    if (!autoTrustAgents || autoTrustAgents.length == 0) {
      return {
        info: `No auto trust config for safe ${job.inviterAddress}`
      };
    }

    const txHashes = [];
    for (const autoTrustAgent of autoTrustAgents) {
      console.log(`Auto trusting ${job.newUserAddress} for safe ${autoTrustAgent.agentSafeAddress ?? autoTrustAgent.ownerSafeAddress} ..`);

      const circlesHub = new CirclesHub(RpcGateway.get(), Environment.circlesHubAddress);
      const safeProxy = new GnosisSafeProxy(RpcGateway.get(), autoTrustAgent.agentSafeAddress ?? autoTrustAgent.ownerSafeAddress);
      const receipt = await circlesHub.setTrust(autoTrustAgent.privateKey, safeProxy, job.newUserAddress, new BN("100"))
      txHashes.push(receipt.transactionHash);

      console.log(`Auto trusting ${job.newUserAddress} for safe ${job.inviterAddress} done.`);
    }

    return {
      info: `TxHashes: ${txHashes.join(", ")}`
    };
  }
}
