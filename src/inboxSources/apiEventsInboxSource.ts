import {InboxSource} from "./inboxSource";
import {ChatMessage, MembershipAccepted, MembershipOffer, MembershipRejected, ProfileEvent} from "../types";
import {prisma_api_ro} from "../apiDbClient";
import {ProfileEventAugmenter} from "./profileEventAugmenter";

export class ApiEventsInboxSource implements InboxSource {
  private async findMembershipOffers(forSafeAddress: string, startFrom: Date) : Promise<ProfileEvent[]> {
    const pendingMembershipOffers = await prisma_api_ro.membership.findMany({
      where: {
        createdAt: {
          gt: startFrom
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
      }
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

  private async findRejectedMembershipOffers(forSafeAddress: string, startFrom: Date) : Promise<ProfileEvent[]> {
    const rejectedMembershipOffers = await prisma_api_ro.membership.findMany({
      where: {
        createdBy: {
          circlesAddress: forSafeAddress
        },
        rejectedAt: {
          gt: startFrom
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
      }
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

  private async findAcceptedMembershipOffers(forSafeAddress: string, startFrom: Date) : Promise<ProfileEvent[]> {
    const acceptedMembershipOffers = await prisma_api_ro.membership.findMany({
      where: {
        createdBy: {
          circlesAddress: forSafeAddress
        },
        acceptedAt: {
          gt: startFrom
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
      }
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

  private async findChatMessages(forSafeAddress: string, startFrom: Date) : Promise<ProfileEvent[]> {
    const chatMessages = await prisma_api_ro.chatMessage.findMany({
      where: {
        to: forSafeAddress,
        createdAt: {
          gt: startFrom
        }
      }
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

  async getNewEvents(forSafeAddress: string, startFrom: Date): Promise<ProfileEvent[]> {
    /*
    const results = await Promise.all([
      this.findMembershipOffers(forSafeAddress, startFrom),
      this.findAcceptedMembershipOffers(forSafeAddress, startFrom),
      this.findRejectedMembershipOffers(forSafeAddress, startFrom),
      this.findChatMessages(forSafeAddress, startFrom)
    ]);
     */

    const results = [await this.findMembershipOffers(forSafeAddress, startFrom)];

    let events = results.reduce((p,c) => p.concat(c), []);
    const augmentation = new ProfileEventAugmenter();
    events.forEach(e => augmentation.add(e));
    events = await augmentation.augment();

    return events;
  }
}