import {ApiPubSub} from "../../../utils/pubsub";
import {RpcGateway} from "../../../circles/rpcGateway";
import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {BroadcastPurchased} from "../../descriptions/market/broadcastPurchased";
import {EventType} from "../../../types";
import {Environment} from "../../../environment";

export class BroadcastPurchasedWorker extends JobWorker<BroadcastPurchased> {
  name(): string {
    return "BroadcastChatMessageWorker";
  }

  constructor(configuration?: JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: BroadcastPurchased) {
    if (!job.to) {
      return;
    }
    if (!RpcGateway.get().utils.isAddress(job.to)) {
      return;
    }
    await ApiPubSub.instance.pubSub.publish(`events_${job.from}`, {
      events: {
        type: EventType.Purchased,
        from: job.from,
        to: job.to,
        itemId: job.purchaseId
      },
    });

    const invoice = await Environment.readWriteApiDb.invoice.findMany({
      where: {
        purchaseId: job.purchaseId,
        sellerProfile: {
          circlesAddress: job.to
        }
      }
    });

    if (invoice.length > 0) {
      const saleEvent = {
        events: {
          type: EventType.SaleEvent,
          from: job.from,
          to: job.to,
          itemId: invoice[0].id
        },
      };

      const maybeAnOrgaResult = await Environment.readonlyApiDb.profile.findFirst({
        where: {
          circlesAddress: job.to,
          type: "ORGANISATION"
        },
        include: {
          members: true
        }
      });
      if (maybeAnOrgaResult) {
        await Promise.all(maybeAnOrgaResult.members?.map(async m => {
          await ApiPubSub.instance.pubSub.publish(`events_${m.memberAddress}`, saleEvent);
        }));
      }
    }

    return undefined;
  }
}