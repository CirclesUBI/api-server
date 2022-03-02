import { EventSource } from "../eventSource";
import {
  Direction,
  Maybe,
  MembershipRejected,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter,
} from "../../../types";
import { Prisma } from "../../../api-db/client";
import { Environment } from "../../../environment";

export class RejectedMembershipOfferEventSource implements EventSource {
  async getEvents(
    forSafeAddress: string,
    pagination: PaginationArgs,
    filter: Maybe<ProfileEventFilter>
  ): Promise<ProfileEvent[]> {
    if (filter?.direction && filter.direction == Direction.Out) {
      // Exists only for "in"
      return [];
    }

    const rejectedAt = pagination.continueAt
      ? {
          rejectedAt:
            pagination.order == "ASC"
              ? {
                  gt: new Date(pagination.continueAt),
                }
              : {
                  lt: new Date(pagination.continueAt),
                },
        }
      : {};
    const rejectedMembershipOffers =
      await Environment.readonlyApiDb.membership.findMany({
        where: {
          createdBy: {
            circlesAddress: forSafeAddress,
          },
          ...rejectedAt,
        },
        include: {
          memberAt: {
            select: {
              circlesAddress: true,
            },
          },
        },
        orderBy: {
          rejectedAt:
            pagination.order == "ASC"
              ? Prisma.SortOrder.asc
              : Prisma.SortOrder.desc,
        },
        take: pagination.limit ?? 50,
      });

    return rejectedMembershipOffers.map((r) => {
      return <ProfileEvent>{
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "MembershipRejected",
        block_number: null,
        direction: "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        contact_address: r.memberAddress,
        payload: <MembershipRejected>{
          __typename: "MembershipRejected",
          member: r.memberAddress,
          organisation: r.memberAt.circlesAddress,
        },
      };
    });
  }
}
