import {EventSource} from "../eventSource";
import {InvitationCreated, PaginationArgs, ProfileEvent} from "../../types";
import {prisma_api_ro} from "../../apiDbClient";
import {Prisma} from "../../api-db/client";

export class CreatedInvitationsEventSource implements EventSource {
  async getEvents(forSafeAddress: string, pagination: PaginationArgs): Promise<ProfileEvent[]> {
    const createdInvitations = await prisma_api_ro.invitation.findMany({
      where: {
        createdBy: {
          circlesAddress: forSafeAddress
        },
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
        name: true,
        code: true
      },
      take: pagination.limit ?? 50
    });

    return createdInvitations.map(r => {
      return <ProfileEvent> {
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "InvitationCreated",
        block_number: null,
        direction: "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        payload: <InvitationCreated> {
          __typename: "InvitationCreated",
          name: r.name,
          code: r.code
        }
      };
    });
  }
}