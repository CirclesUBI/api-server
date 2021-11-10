import {EventSource} from "../eventSource";
import {Direction, Maybe, MembershipAccepted, PaginationArgs, ProfileEvent, ProfileEventFilter} from "../../types";
import {prisma_api_ro} from "../../apiDbClient";
import {Prisma} from "../../api-db/client";

export class AcceptedMembershipOfferEventSource implements EventSource {
  async getEvents(forSafeAddress: string, pagination: PaginationArgs, filter: Maybe<ProfileEventFilter>): Promise<ProfileEvent[]> {

    if (filter?.direction && filter.direction == Direction.Out) {
      // Exists only for "in"
      return [];
    }

    const acceptedMembershipOffers = await prisma_api_ro.membership.findMany({
      where: {
        createdBy: {
          circlesAddress: forSafeAddress
        },
        acceptedAt: pagination.order == "ASC" ? {
          gt: new Date(pagination.continueAt)
        } : {
          lt: new Date(pagination.continueAt)
        }
      },
      include: {
        createdBy: {
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
        acceptedAt: pagination.order == "ASC" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc
      },
      take: pagination.limit ?? 50
    });

    return acceptedMembershipOffers.map(r => {
      return <ProfileEvent> {
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "MembershipAccepted",
        block_number: null,
        direction: "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        contact_address: r.memberAddress,
        payload: <MembershipAccepted> {
          __typename: "MembershipAccepted",
          createdBy: r.createdBy.circlesAddress,
          member: r.memberAddress,
          organisation: r.memberAt.circlesAddress
        }
      };
    });
  }
}