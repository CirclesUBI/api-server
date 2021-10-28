import {InboxSource} from "./inboxSource";
import {
  ChatMessage,
  InvitationCreated,
  InvitationRedeemed,
  MembershipAccepted,
  MembershipOffer,
  MembershipRejected,
  PaginationArgs,
  ProfileEvent
} from "../types";
import {prisma_api_ro} from "../apiDbClient";
import {ProfileEventAugmenter} from "./profileEventAugmenter";
import {Prisma} from "../api-db/client";

export class ApiEventsInboxSource implements InboxSource {
  private async findMembershipOffers(forSafeAddress: string, pagination: PaginationArgs) : Promise<ProfileEvent[]> {
    const pendingMembershipOffers = await prisma_api_ro.membership.findMany({
      where: {
        createdAt: pagination.order == "ASC" ? {
          gt: new Date(pagination.continueAt)
        } : {
          lt: new Date(pagination.continueAt)
        },
        member: {
          circlesAddress: forSafeAddress
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
        createdAt: pagination.order == "ASC" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc
      },
      take: pagination.limit ?? 50
    });

    return pendingMembershipOffers.map(r => {
      return <ProfileEvent> {
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "MembershipOffer",
        block_number: null,
        direction: "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        payload: <MembershipOffer> {
          __typename: "MembershipOffer",
          createdBy: r.createdBy.circlesAddress,
          isAdmin: r.isAdmin,
          organisation: r.memberAt.circlesAddress
        }
      };
    });
  }

  private async findRejectedMembershipOffers(forSafeAddress: string, pagination: PaginationArgs) : Promise<ProfileEvent[]> {
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

  private async findAcceptedMembershipOffers(forSafeAddress: string, pagination: PaginationArgs) : Promise<ProfileEvent[]> {
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
        payload: <MembershipAccepted> {
          __typename: "MembershipAccepted",
          member: r.member.circlesAddress,
          organisation: r.memberAt.circlesAddress
        }
      };
    });
  }

  private async findChatMessages(forSafeAddress: string, pagination: PaginationArgs) : Promise<ProfileEvent[]> {
    const chatMessages = await prisma_api_ro.chatMessage.findMany({
      where: {
        to: forSafeAddress,
        createdAt: pagination.order == "ASC" ? {
          gt: new Date(pagination.continueAt)
        } : {
          lt: new Date(pagination.continueAt)
        }
      },
      orderBy: {
        createdAt: pagination.order == "ASC" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc
      },
      take: pagination.limit ?? 50
    });

    return chatMessages.map(r => {
      return <ProfileEvent> {
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "ChatMessage",
        block_number: null,
        direction: "in",
        timestamp: r.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        payload: <ChatMessage> {
          __typename: "ChatMessage",
          from: r.from,
          to: r.to,
          text: r.text
        }
      };
    });
  }

  private async findCreatedInvitations(forSafeAddress: string, pagination: PaginationArgs) : Promise<ProfileEvent[]> {
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

  private async findRedeemedInvitations(forSafeAddress: string, pagination: PaginationArgs) : Promise<ProfileEvent[]> {
    const redeemedInvitations = await prisma_api_ro.invitation.findMany({
      where: {
        createdBy: {
          circlesAddress: forSafeAddress
        },
        redeemedAt: pagination.order == "ASC" ? {
          gt: new Date(pagination.continueAt)
        } : {
          lt: new Date(pagination.continueAt)
        }
      },
      orderBy: {
        createdAt: pagination.order == "ASC" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc
      },
      select: {
        redeemedAt: true,
        redeemedBy: {
          select: {
            circlesAddress: true
          }
        },
        name: true,
        code: true
      },
      take: pagination.limit ?? 50
    });

    return redeemedInvitations.map(r => {
      if (!r.redeemedAt)
        throw new Error(`r.redeemedAt == null or undefined in findRedeemedInvitations()`);

      return <ProfileEvent> {
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "InvitationCreated",
        block_number: null,
        direction: "in",
        timestamp: r.redeemedAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        payload: <InvitationRedeemed> {
          __typename: "InvitationRedeemed",
          name: r.name,
          code: r.code,
          redeemedBy: r.redeemedBy?.circlesAddress
        }
      };
    });
  }


  async getNewEvents(forSafeAddress: string, pagination: PaginationArgs): Promise<ProfileEvent[]> {
    const results = await Promise.all([
      this.findMembershipOffers(forSafeAddress, pagination),
      this.findAcceptedMembershipOffers(forSafeAddress, pagination),
      this.findRejectedMembershipOffers(forSafeAddress, pagination),
      this.findChatMessages(forSafeAddress, pagination),
      this.findCreatedInvitations(forSafeAddress, pagination),
      this.findRedeemedInvitations(forSafeAddress, pagination)
    ]);

    let events = results.reduce((p,c) => p.concat(c), []);
    const augmentation = new ProfileEventAugmenter();
    events.forEach(e => augmentation.add(e));
    events = await augmentation.augment();

    return events;
  }
}