import { EventSource } from "../eventSource";
import {
  Direction,
  EventType,
  Maybe,
  PaginationArgs,
  Profile,
  ProfileEvent,
  ProfileEventFilter,
  WelcomeMessage,
} from "../../../types";
import { Prisma } from "../../../api-db/client";
import { Environment } from "../../../environment";
import { ProfileLoader } from "../../profileLoader";

export class WelcomeMessageEventSource implements EventSource {
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
          redeemedBy: {
            circlesAddress: forSafeAddress,
          },
          ...redeemedAt,
        },
        orderBy: {
          createdAt:
            pagination.order == "ASC"
              ? Prisma.SortOrder.asc
              : Prisma.SortOrder.desc,
        },
        select: {
          redeemedAt: true,
          createdBy: {
            select: {
              circlesAddress: true,
            },
          },
        },
        take: pagination.limit ?? 50,
      });

    return await Promise.all(
      redeemedInvitations.map(async (r) => {
        if (!r.redeemedAt)
          throw new Error(
            `r.redeemedAt == null or undefined in findRedeemedInvitations()`
          );

        const inviter = r.createdBy.circlesAddress
          ? await new ProfileLoader().profilesBySafeAddress(
              Environment.readonlyApiDb,
              [r.createdBy.circlesAddress]
            )
          : undefined;

        let inviterProfile: Profile | undefined;
        if (inviter) {
          const inviterProfiles = Object.values(inviter);
          if (inviterProfiles.length == 1) {
            inviterProfile = ProfileLoader.withDisplayCurrency(
              inviterProfiles[0]
            );
          }
        }

        return <ProfileEvent>{
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
          payload: <WelcomeMessage>{
            __typename: "WelcomeMessage",
            invitedBy: inviterProfile?.circlesAddress,
            invitedBy_profile: inviterProfile,
          },
        };
      })
    );
  }
}
