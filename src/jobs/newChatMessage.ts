import {Job} from "../api-db/jobQueue";
import {ApiPubSub} from "../pubsub";
import {RpcGateway} from "../rpcGateway";

function findRecipientInPayload(msg: string) {
  if (!msg) {
    return null;
  }

  const payload = JSON.parse(msg);
  if (!payload.to) {
    return null;
  }

  const to: string = payload.to;
  if (!RpcGateway.get().utils.isAddress(to)) {
    return null;
  }

  return to;
}

export const newChatMessage = async (job:Job) => {
  const to = findRecipientInPayload(job.payload);
  if (!to) {
    return;
  }
  console.log(
    ` *-> [${new Date().toJSON()}] [] [] [listenForDbEvents.onNotification: ${job.topic}]: ${JSON.stringify(
      job.payload
    )}`
  );
  await ApiPubSub.instance.pubSub.publish(`events_${to}`, {
    events: {
      type: job.topic,
    },
  });
}