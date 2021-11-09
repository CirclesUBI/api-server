import { EventSource } from "../eventSource";
import {
  Direction,
  Maybe,
  MembershipOffer,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter,
} from "../../types";
import { prisma_api_ro } from "../../apiDbClient";
import { Prisma } from "../../api-db/client";

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
    const pendingMembershipOffers = await prisma_api_ro.membership.findMany({
      where: {
        createdAt:
          pagination.order == "ASC"
            ? {
                gt: new Date(pagination.continueAt),
              }
            : {
                lt: new Date(pagination.continueAt),
              },
        member: {
          circlesAddress: forSafeAddress,
        },
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
