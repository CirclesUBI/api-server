import {ChatMessage, EventType, MutationSendMessageArgs, SendMessageResult} from "../../types";
import { Context } from "../../context";
import { PrismaClient } from "../../api-db/client";
import {ApiPubSub} from "../../pubsub";
import {getPool} from "../resolvers";
import {RpcGateway} from "../../rpcGateway";
import {canAccess} from "../../canAccess";

export function sendMessage(prisma: PrismaClient) {
  return async (
    parent: any,
    args: MutationSendMessageArgs,
    context: Context
  ) => {
    const fromProfile = await context.callerInfo;
    if (!fromProfile || !fromProfile.profile?.circlesAddress) {
      return {
        success: false,
        errorMessage: "You must have a complete profile to use this function.",
      };
    }

    let from = fromProfile.profile?.circlesAddress;

    if (args.fromSafeAddress && fromProfile.profile?.circlesAddress !== args.fromSafeAddress) {
      // Writing in the name of an organisation?
      from = (await canAccess(context, args.fromSafeAddress ?? ""))
        ? args.fromSafeAddress
        : fromProfile.profile?.circlesAddress;
    }

    const toSafeAddress = args.toSafeAddress.toLowerCase();
    const toProfile = await prisma.profile.findFirst({
      where: { circlesAddress: toSafeAddress },
    });
    if (!toProfile) {
      throw new Error(`Couldn't find a profile for safe ${toSafeAddress}`);
    }
    const message = await prisma.chatMessage.create({
      data: {
        createdAt: new Date(),
        from: from,
        to: toSafeAddress,
        text: args.content,
      }
    });

    if (toProfile.circlesAddress && RpcGateway.get().utils.isAddress(toProfile.circlesAddress)) {
      await getPool().query(
        `call publish_event('new_message', '{"to":"${toProfile.circlesAddress.toLowerCase()}"}');`);
    } else {
      const err = new Error();
      console.warn("A message was sent to a recipient without safe at:", err.stack);
    }

    return <SendMessageResult>{
      event: {
        id: message.id,
        timestamp: message.createdAt.toJSON(),
        type: EventType.ChatMessage,
        direction: "out",
        safe_address: message.from,
        safe_address_profile: fromProfile.profile,
        payload: <ChatMessage>{
          __typename: EventType.ChatMessage,
          id: message.id,
          from: message.from,
          from_profile: fromProfile.profile,
          to: message.to,
          to_profile: toProfile,
          text: message.text,
        },
      },
      success: true,
    };
  };
}
