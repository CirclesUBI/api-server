import {EventSource} from "../eventSource";
import {Maybe, MembershipRejected, PaginationArgs, ProfileEvent, ProfileEventFilter} from "../../types";
import {prisma_api_ro} from "../../apiDbClient";
import {Prisma} from "../../api-db/client";

export class RejectedMembershipOfferEventSource implements EventSource {
  async getEvents(forSafeAddress: string, pagination: PaginationArgs, filter: Maybe<ProfileEventFilter>): Promise<ProfileEvent[]> {
    const rejectedMembershipOffers = await prisma_api_ro.membership.findMany({
      where: {
        createdBy: {
          circlesAddress: forSafeAddress
        },
        rejectedAt: pagination.order == "ASC" ? {
          gt: new Date(pagination.continueAt)
        } : {
          lt: new Date(pagination.continueAt)
        }
      },
      include: {
        member: {
          select: {
            circlesAddress: true
          }
        },
        memberAt: {
          select: {
            circlesAddress: true
          }
        }
      },
      orderBy: {
        rejectedAt: pagination.order == "ASC" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc
      },
      take: pagination.limit ?? 50
    });

    return rejectedMembershipOffers.map(r => {
      return <ProfileEvent> {
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "MembershipRejected",
        block_number: null,
        direction: "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        payload: <MembershipRejected> {
          __typename: "MembershipRejected",
          member: r.member.circlesAddress,
          organisation: r.memberAt.circlesAddress
        }
      };
    });
  }
}