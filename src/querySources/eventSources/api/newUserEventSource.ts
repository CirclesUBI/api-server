import { EventSource } from "../eventSource";
import {
  Direction,
  Maybe,
  MembershipAccepted, NewUser,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter,
} from "../../../types";
import { Prisma } from "../../../api-db/client";
import { Environment } from "../../../environment";

export class NewUserEventSource implements EventSource {
  async getEvents(
    forSafeAddress: string,
    pagination: PaginationArgs,
    filter: Maybe<ProfileEventFilter>
  ): Promise<ProfileEvent[]> {

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

    const newUsers = await Environment.readonlyApiDb.profile.findMany({
      where: {
        ...createdAt,
        status: {
          not: "registered"
        }
      },
      orderBy: {
        createdAt:
          pagination.order == "ASC"
            ? Prisma.SortOrder.asc
            : Prisma.SortOrder.desc,
      },
      take: pagination.limit
    });

    return newUsers.map((r) => {
      return <ProfileEvent>{
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "NewUser",
        block_number: null,
        direction: "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        contact_address: r.circlesAddress,
        payload: <NewUser>{
          __typename: "NewUser",
          profile: r
        },
      };
    });
  }
}
