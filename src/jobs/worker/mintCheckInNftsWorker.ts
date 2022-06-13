import {JobWorker, JobWorkerConfiguration} from "./jobWorker";
import {Environment} from "../../environment";
import {multisend} from "../../utils/multisend";
import {MintCheckInNfts} from "../descriptions/mintCheckInNfts";
import {ProfileLoader} from "../../querySources/profileLoader";
import {MintPurchaseNftsWorker} from "./mintPurchaseNftsWorker";

export class MintCheckInNftsWorker extends JobWorker<MintCheckInNfts> {
  name(): string {
    return "MintCheckInNftsWorker";
  }

  constructor(configuration?: JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: MintCheckInNfts) {
    if (!job.hostAddress || !job.guestAddress || !job._topic) {
      throw new Error(`Invalid job description`);
    }

    const agents = await Environment.readonlyApiDb.agent.findMany({
      where: {
        topic: job._topic,
        ownerSafeAddress: job.hostAddress,
        contractAbi:{not:null},
        contractAddress:{not:null},
        contractMethod:{not:null},
        enabled: true
      }
    });

    if (agents.length == 0) {
      return {
        info: `No agents configured for shop owner ${job.hostAddress}`
      };
    }

    const guestResult = await (new ProfileLoader().profilesBySafeAddress(Environment.readWriteApiDb, [job.guestAddress]));
    if (!guestResult[job.guestAddress])
    {
      throw new Error(`Couldn't find a profile for guest address ${job.guestAddress}`);
    }

    const contractCalls = await Promise.all(agents.map(async (agent, i) => {
      const tx = await MintPurchaseNftsWorker.encodeContractCall(agent, job.guestAddress, "ipfs://QmZfiYNWhXmjSRPXeGYDrAduP8QCyfoMqjd2bXvvmQJA44");
      tx.id = (i++).toString();
      return {
        agent: agent,
        tx: tx
      };
    }));

    const mintCallsBySafe = contractCalls.groupBy(o => o.agent.agentSafeAddress ?? o.agent.ownerSafeAddress);
    const receipts = await Promise.all(Object.values(mintCallsBySafe).map(async agentAndTx => {
      const transactions = agentAndTx.map(o => o.tx);
      const agent = agentAndTx[0].agent;

      const receipt = await multisend(
        agent.agentSafeAddress ?? agent.ownerSafeAddress,
        agent.privateKey,
        transactions);

      return receipt;
    }));

    return {
      info: `TxHashes: ${receipts.map(o => o.transactionHash).join(", ")}`
    };
  }
}
