import { EventSource } from "../eventSource";
import {
  Direction,
  Maybe,
  MembershipOffer,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter,
} from "../../types";
import { Prisma } from "../../api-db/client";
import { Environment } from "../../environment";

export class MembershipOfferEventSource implements EventSource {
  async getEvents(
    forSafeAddress: string,
    pagination: PaginationArgs,
    filter: Maybe<ProfileEventFilter>
  ): Promise<ProfileEvent[]> {
    if (filter?.direction && filter.direction == Direction.Out) {
      // Exists only for "in"
      return [];
    }

    const createdAt = pagination.continueAt
      ? {
          createdAt:
            pagination.order == "ASC"
              ? {
                  gt: new Date(pagination.continueAt),
                }
              : {
                  lt: new Date(pagination.continueAt),
                },
        }
      : {};

    const pendingMembershipOffers =
      await Environment.readonlyApiDb.membership.findMany({
        where: {
          ...createdAt,
          memberAddress: forSafeAddress,
        },
        include: {
          createdBy: {
            select: {
              circlesAddress: true,
            },
          },
          memberAt: {
            select: {
              circlesAddress: true,
            },
          },
        },
        orderBy: {
          createdAt:
            pagination.order == "ASC"
              ? Prisma.SortOrder.asc
              : Prisma.SortOrder.desc,
        },
        take: pagination.limit ?? 50,
      });

    return pendingMembershipOffers.map((r) => {
      return <ProfileEvent>{
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "MembershipOffer",
        block_number: null,
        direction: "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        contact_address: r.memberAddress,
        payload: <MembershipOffer>{
          __typename: "MembershipOffer",
          createdBy: r.createdBy.circlesAddress,
          isAdmin: r.isAdmin ?? false,
          organisation: r.memberAt.circlesAddress,
        },
      };
    });
  }
}
