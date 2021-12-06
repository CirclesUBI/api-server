import {EventSource} from "../eventSource";
import {
  Direction,
  EventType,
  Maybe,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter, WelcomeMessage
} from "../../types";
import {Prisma} from "../../api-db/client";
import {Environment} from "../../environment";

export class WelcomeMessageEventSource implements EventSource {
  async getEvents(forSafeAddress: string, pagination: PaginationArgs, filter: Maybe<ProfileEventFilter>): Promise<ProfileEvent[]> {
    if (filter?.direction && filter.direction == Direction.Out) {
      // Exists only for "in"
      return [];
    }
    const redeemedInvitations = await Environment.readonlyApiDb.invitation.findMany({
      where: {
        redeemedBy: {
          circlesAddress: forSafeAddress
        },
        redeemedAt: pagination.order == "ASC" ? {
          gt: new Date(pagination.continueAt)
        } : {
          lt: new Date(pagination.continueAt)
        },
        // redeemedBy: {
        //   isNot: null
        // }
      },
      orderBy: {
        createdAt: pagination.order == "ASC" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc
      },
      select: {
        redeemedAt: true,
        createdBy: {
          select: {
            circlesAddress: true
          }
        }
      },
      take: pagination.limit ?? 50
    });

    return redeemedInvitations.map(r => {
      if (!r.redeemedAt)
        throw new Error(`r.redeemedAt == null or undefined in findRedeemedInvitations()`);

      return <ProfileEvent> {
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: EventType.WelcomeMessage,
        block_number: null,
        direction: "in",
        timestamp: r.redeemedAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        contact_address: r.createdBy?.circlesAddress,
        payload: <WelcomeMessage> {
          __typename: "WelcomeMessage",

        }
      };
    });
  }
}