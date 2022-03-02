import { EventSource } from "../eventSource";
import {
  Direction,
  InvitationCreated,
  Maybe,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter,
} from "../../../types";
import { Prisma } from "../../../api-db/client";
import { Environment } from "../../../environment";

export class CreatedInvitationsEventSource implements EventSource {
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

    const createdInvitations =
      await Environment.readonlyApiDb.invitation.findMany({
        where: {
          createdBy: {
            circlesAddress: forSafeAddress,
          },
          ...createdAt,
        },
        orderBy: {
          createdAt:
            pagination.order == "ASC"
              ? Prisma.SortOrder.asc
              : Prisma.SortOrder.desc,
        },
        select: {
          createdAt: true,
          name: true,
          code: true,
        },
        take: pagination.limit ?? 50,
      });

    return createdInvitations.map((r) => {
      return <ProfileEvent>{
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "InvitationCreated",
        block_number: null,
        direction: "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        payload: <InvitationCreated>{
          __typename: "InvitationCreated",
          name: r.name,
          code: r.code,
        },
      };
    });
  }
}
