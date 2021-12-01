import {EventSource} from "../eventSource";
import {
  Direction,
  Maybe,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter,
  SafeVerified
} from "../../types";
import {prisma_api_ro} from "../../apiDbClient";
import {Prisma} from "../../api-db/client";

export class SafeVerifiedEventSource implements EventSource {
  async getEvents(forSafeAddress: string, pagination: PaginationArgs, filter: Maybe<ProfileEventFilter>): Promise<ProfileEvent[]> {
    if (filter?.direction && filter.direction == Direction.Out) {
      // Exists only for "in"
      return [];
    }
    const verifiedSafes = await prisma_api_ro.verifiedSafe.findMany({
      where: {
        safeAddress: forSafeAddress,
        // TODO: redeemedAt doesn't work immediately as a filter for RedeemedInvitation events because there will be no profile at the time of redemption
        createdAt: pagination.order == "ASC" ? {
          gt: new Date(pagination.continueAt)
        } : {
          lt: new Date(pagination.continueAt)
        }
      },
      orderBy: {
        createdAt: pagination.order == "ASC" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc
      },
      select: {
        createdAt: true,
        safeAddress: true,
        createdByOrganisation: {
          select: {
            circlesAddress: true
          }
        }
      },
      take: pagination.limit ?? 50
    });

    return verifiedSafes.map(r => {
      return <ProfileEvent> {
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "SafeVerified",
        block_number: null,
        direction: "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        contact_address: r.createdByOrganisation.circlesAddress,
        payload: <SafeVerified> {
          __typename: "SafeVerified",
          organisation: r.createdByOrganisation.circlesAddress,
          safe_address: r.safeAddress
        }
      };
    });
  }
}