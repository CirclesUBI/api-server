import { Context } from "../../context";
import { events } from "./queryEvents";
import { ChatMessage, ProfileEvent } from "../../types";
import { PrismaClient } from "../../api-db/client";
import { getPool } from "../resolvers";
import { profilesBySafeAddress } from "./profiles";

export function chatHistory(prisma: PrismaClient) {
  return async (parent: any, args: any, context: Context) => {
    const pool = getPool();

    const safeAddress = args.safeAddress.toLowerCase();
    const contactSafeAddress = args.contactSafeAddress.toLowerCase();

    try {
      const profilesResolver = profilesBySafeAddress(prisma, false);
      const profilesPromise = profilesResolver(
        null,
        { safeAddresses: [safeAddress, contactSafeAddress] },
        context
      );

      const eventsResolver = events(prisma, pool, false);
      const safeEventsPromise = eventsResolver(
        undefined,
        {
          safeAddress: safeAddress,
        },
        context
      );
      const contactSafeEventsPromise = eventsResolver(
        undefined,
        {
          safeAddress: contactSafeAddress,
        },
        context
      );
      const chatMessagesPromise = prisma.chatMessage.findMany({
        where: {
          from: {
            in: [safeAddress, contactSafeAddress],
          },
          to: {
            in: [safeAddress, contactSafeAddress],
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const eventPromiseResults = await Promise.all([
        safeEventsPromise,
        contactSafeEventsPromise,
        chatMessagesPromise,
        profilesPromise,
      ]);

      const safeEventsResult = eventPromiseResults[0];
      const contactEventsResult = eventPromiseResults[1];
      const chatMessagesResult = eventPromiseResults[2];
      const profilesResult = eventPromiseResults[3];

      const eventResults = safeEventsResult.concat(contactEventsResult);
      const eventResultsByTransactionHash: {
        [transactionHash: string]: ProfileEvent[];
      } = {};
      eventResults.forEach((o) => {
        if (!o.transaction_hash) {
          return; // These are all blockchain events so the hash should be present
        }
        let events = eventResultsByTransactionHash[o.transaction_hash];
        if (!events) {
          events = [];
          eventResultsByTransactionHash[o.transaction_hash] = events;
        }
        events.push({
          ...o,
        });
      });
      const mutualEvents = Object.entries(eventResultsByTransactionHash)
        .filter((o) => o[1].length == 2)
        .map((o) => o[1]);

      const allBlockchainEvents = <ProfileEvent[]>mutualEvents
        .map((o) => {
          let myEvent: ProfileEvent;
          if (o[0].safe_address == args.safeAddress) {
            myEvent = o[0];
          } else {
            myEvent = o[1];
          }
          if (myEvent.direction === "in") {
            return o.filter((o) => o !== myEvent)[0];
          }
          return myEvent;
        })
        .filter((o) => o !== undefined);

      const safeAddressProfile = profilesResult.find(
        (o) => o.circlesAddress == safeAddress
      );
      const chatMessageProfileEvents = chatMessagesResult.map((o) => {
        return <ProfileEvent>{
          id: o.id,
          timestamp: o.createdAt.toJSON(),
          type: "chat_message",
          direction: safeAddress == o.from ? "out" : "in",
          safe_address: safeAddress,
          safe_address_profile: safeAddressProfile,
          payload: <ChatMessage>{
            __typename: "ChatMessage",
            id: o.id,
            from: o.from,
            from_profile: profilesResult.find(
              (p) => p.circlesAddress == o.from
            ),
            to: o.to,
            to_profile: profilesResult.find((p) => p.circlesAddress == o.to),
            text: o.text,
          },
        };
      });

      return allBlockchainEvents
        .concat(chatMessageProfileEvents)
        .sort((a, b) =>
          a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0
        );
    } finally {
      await pool.end();
    }
  };
}
