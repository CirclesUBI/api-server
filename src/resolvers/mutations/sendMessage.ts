import { ChatMessage, SendMessageResult } from "../../types";
import { Context } from "../../context";
import { PrismaClient } from "../../api-db/client";
import {ApiPubSub} from "../../pubsub";
import {getPool} from "../resolvers";
import {RpcGateway} from "../../rpcGateway";

export function sendMessage(prisma: PrismaClient) {
  return async (
    parent: any,
    args: { toSafeAddress: string; content: string },
    context: Context
  ) => {
    const fromProfile = await context.callerProfile;
    if (!fromProfile || !fromProfile.circlesAddress) {
      return {
        success: false,
        errorMessage: "You must have a complete profile to use this function.",
      };
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
        from: fromProfile.circlesAddress,
        to: toSafeAddress,
        text: args.content,
      },
    });

    if (toProfile.circlesAddress && RpcGateway.get().utils.isAddress(toProfile.circlesAddress)) {
      const pool = getPool();
      try {
        await pool.query(
          `call publish_event('new_message', '{"to":"${toProfile.circlesAddress.toLowerCase()}"}');`);
      } finally {
        await pool.end();
      }
    } else {
      const err = new Error();
      console.warn("A message was sent to a recipient without safe at:", err.stack);
    }

    return <SendMessageResult>{
      event: {
        id: message.id,
        timestamp: message.createdAt.toJSON(),
        type: "chat_message",
        direction: "out",
        safe_address: message.from,
        safe_address_profile: fromProfile,
        payload: <ChatMessage>{
          __typename: "ChatMessage",
          id: message.id,
          from: message.from,
          from_profile: fromProfile,
          to: message.to,
          to_profile: toProfile,
          text: message.text,
        },
      },
      success: true,
    };
  };
}
