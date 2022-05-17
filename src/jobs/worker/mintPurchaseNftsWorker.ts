import {JobWorker, JobWorkerConfiguration} from "./jobWorker";
import {Environment} from "../../environment";
import {MintPurchaseNfts} from "../descriptions/mintPurchaseNfts";
import {Agent} from "../../api-db/client";
import {TransactionInput} from "ethers-multisend";
import {TransactionType} from "ethers-multisend/build/cjs/types";
import {multisend} from "../../utils/multisend";

export class MintPurchaseNftsWorker extends JobWorker<MintPurchaseNfts> {
  name(): string {
    return "MintPurchaseNftsWorker";
  }

  constructor(configuration?: JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: MintPurchaseNfts) {
    const purchase = await Environment.readWriteApiDb.purchase.findUnique({
      where: {id: job.purchaseId},
      include: {
        createdBy: true,
        lines: {
          include: {
            product: {
              include: {
                createdBy: true
              }
            }
          }
        }
      }
    });

    if (!purchase) {
      throw new Error(`Couldn't find a purchase with the id ${job.purchaseId}`);
    }

    const buyer = purchase.createdBy;
    const purchaseLinesBySeller = purchase.lines.groupBy(o => o.product.createdBy.circlesAddress);

    const agents = await Environment.readonlyApiDb.agent.findMany({
      where: {
        topic: job._topic,
        ownerSafeAddress: {
          in: Object.keys(purchaseLinesBySeller)
        },
        contractAbi:{not:null},
        contractAddress:{not:null},
        contractMethod:{not:null}
      }
    });

    const agentsBySeller = agents.groupBy(o => o.ownerSafeAddress);
    const sellersWithAgent = Object.keys(purchaseLinesBySeller)
      .filter(o => agentsBySeller[o]);

    if (sellersWithAgent.length == 0) {
      return {
        info: `No agents configured`
      };
    }

    let i = 0;
    const mintCalls:{agent:Agent, tx:TransactionInput}[] = await Promise.all(sellersWithAgent.flatMap(sellerAddress => {
      const agents = agentsBySeller[sellerAddress];

      return agents.map(async agent => {
        if (!buyer.circlesAddress) {
          throw new Error(`The creator of purchase ${purchase.id} has no circlesAddress.`)
        }
        const tx = await this.encodeContractCall(agent, buyer.circlesAddress, "https://staging.circles.land/images/events/stroke.png");
        tx.id = (i++).toString();
        return {
          agent: agent,
          tx: tx
        };
      });
    }));

    const mintCallsBySafe = mintCalls.groupBy(o => o.agent.agentSafeAddress ?? o.agent.ownerSafeAddress);
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
      info: ``
    };
  }

  private async encodeContractCall(agent:Agent, to:string, uri:string) : Promise<TransactionInput> {
    if (!agent.contractAbi
      || !agent.contractAddress
      || !agent.contractMethod) {
      throw new Error(`The contractAbi, method or address of agent ${agent.id} are not defined`);
    }

    return <TransactionInput>{
      id: "-",
      type: TransactionType.callContract,
      abi: JSON.parse(agent.contractAbi),
      functionSignature: agent.contractMethod,
      inputValues: {
        to, uri
      },
      to: agent.contractAddress,
      value: "0"
    };
  }
}
