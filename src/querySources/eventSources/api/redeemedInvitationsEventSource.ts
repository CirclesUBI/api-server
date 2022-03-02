import { EventSource } from "../eventSource";
import {
  Direction,
  InvitationRedeemed,
  Maybe,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter,
} from "../../../types";
import { Prisma } from "../../../api-db/client";
import { Environment } from "../../../environment";

export class RedeemedInvitationsEventSource implements EventSource {
  async getEvents(
    forSafeAddress: string,
    pagination: PaginationArgs,
    filter: Maybe<ProfileEventFilter>
  ): Promise<ProfileEvent[]> {
    if (filter?.direction && filter.direction == Direction.Out) {
      // Exists only for "in"
      return [];
    }

    const redeemedAt = pagination.continueAt
      ? {
          redeemedAt:
            pagination.order == "ASC"
              ? {
                  gt: new Date(pagination.continueAt),
                }
              : {
                  lt: new Date(pagination.continueAt),
                },
        }
      : {};
    const redeemedInvitations =
      await Environment.readonlyApiDb.invitation.findMany({
        where: {
          createdBy: {
            circlesAddress: forSafeAddress,
          },
          // TODO: redeemedAt doesn't work immediately as a filter for RedeemedInvitation events because there will be no profile at the time of redemption
          ...redeemedAt,
          redeemedBy: {
            circlesAddress: !filter?.with
              ? {
                  not: null,
                }
              : filter.with,
            firstName: {
              not: "",
            },
          },
        },
        orderBy: {
          createdAt:
            pagination.order == "ASC"
              ? Prisma.SortOrder.asc
              : Prisma.SortOrder.desc,
        },
        select: {
          redeemedAt: true,
          redeemedBy: {
            select: {
              circlesAddress: true,
            },
          },
          name: true,
          code: true,
        },
        take: pagination.limit ?? 50,
      });

    return redeemedInvitations.map((r) => {
      if (!r.redeemedAt)
        throw new Error(
          `r.redeemedAt == null or undefined in findRedeemedInvitations()`
        );

      return <ProfileEvent>{
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "InvitationRedeemed",
        block_number: null,
        direction: "in",
        timestamp: r.redeemedAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        contact_address: r.redeemedBy?.circlesAddress,
        payload: <InvitationRedeemed>{
          __typename: "InvitationRedeemed",
          name: r.name,
          code: r.code,
          redeemedBy: r.redeemedBy?.circlesAddress,
        },
      };
    });
  }
}
