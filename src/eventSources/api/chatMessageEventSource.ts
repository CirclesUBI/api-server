import {EventSource} from "../eventSource";
import {ChatMessage, PaginationArgs, ProfileEvent} from "../../types";
import {prisma_api_ro} from "../../apiDbClient";
import {Prisma} from "../../api-db/client";

export class ChatMessageEventSource implements EventSource {
  async getEvents(forSafeAddress: string, pagination: PaginationArgs): Promise<ProfileEvent[]> {
    const chatMessages = await prisma_api_ro.chatMessage.findMany({
      where: {
        OR: [{
          from: forSafeAddress
        }, {
          to: forSafeAddress
        }],
        createdAt: pagination.order == "ASC" ? {
          gt: new Date(pagination.continueAt)
        } : {
          lt: new Date(pagination.continueAt)
        }
      },
      orderBy: {
        createdAt: pagination.order == "ASC" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc
      },
      take: pagination.limit ?? 50
    });

    return chatMessages.map(r => {
      return <ProfileEvent> {
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "ChatMessage",
        block_number: null,
        direction: r.from == forSafeAddress ? "out" : "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        payload: <ChatMessage> {
          __typename: "ChatMessage",
          from: r.from,
          to: r.to,
          text: r.text
        }
      };
    });
  }
}