import {ApiPubSub} from "../../../utils/pubsub";
import {RpcGateway} from "../../../circles/rpcGateway";
import {BroadcastChatMessage} from "../../descriptions/chat/broadcastChatMessage";
import {JobWorker, JobWorkerConfiguration} from "../jobWorker";

export class BroadcastChatMessageWorker extends JobWorker<BroadcastChatMessage> {
  name(): string {
    return "BroadcastChatMessageWorker";
  }

  constructor(configuration?:JobWorkerConfiguration) {
    super(configuration);
  }

  async doWork(job: BroadcastChatMessage) {
    if (!job.to) {
      return;
    }
    if (!RpcGateway.get().utils.isAddress(job.to)) {
      return;
    }
    await ApiPubSub.instance.pubSub.publish(`events_${job.to}`, {
      events: {
        type: "new_message",
        from: job.from,
        to: job.to,
        itemId: job.messageId
      },
    });

    return undefined;
  }
}