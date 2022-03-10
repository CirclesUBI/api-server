import {ApiPubSub} from "../../../utils/pubsub";
import {RpcGateway} from "../../../circles/rpcGateway";
import {BroadcastChatMessage} from "../../descriptions/chat/broadcastChatMessage";
import {JobWorker, JobWorkerConfiguration} from "../jobWorker";
import {BroadcastPurchased} from "../../descriptions/market/broadcastPurchased";
import {EventType} from "../../../types";

export class BroadcastPurchasedWorker extends JobWorker<BroadcastPurchased> {
  name(): string {
    return "BroadcastChatMessageWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
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
    await ApiPubSub.instance.pubSub.publish(`events_${job.to}`, {
      events: {
        type: EventType.SaleEvent,
        from: job.from,
        to: job.to,
        itemId: job.purchaseId
      },
    });

    return undefined;
  }
}