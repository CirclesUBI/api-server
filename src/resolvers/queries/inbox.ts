import { Context } from "../../context";
import { ChatMessage, ProfileEvent } from "../../types";
import { getPool } from "../resolvers";
import { PrismaClient } from "../../api-db/client";
import { events } from "./queryEvents";
import { profilesBySafeAddress, ProfilesBySafeAddressLookup } from "./profiles";

export function inbox(prisma: PrismaClient) {
  return async (
    parent: any,
    args: any,
    context: Context
  ): Promise<ProfileEvent[]> => {
    const profile = await context.callerProfile;
    if (!profile || !profile.circlesAddress) {
      throw new Error(`You need a complete profile to use this feature.`);
    }

    const pool = getPool();
    try {
      const blockNumberRangeQuery = `
                select min(number) since_block, max(number) until_block
                from block
                where timestamp > $1
                  and timestamp <= $2;`;

      const sinceDate = profile.lastAcknowledged
        ? new Date(profile.lastAcknowledged)
        : new Date(0);
      const untilDate = new Date();

      const balanceQueryParameters = [sinceDate, untilDate.toUTCString()];

      const range = await pool.query(
        blockNumberRangeQuery,
        balanceQueryParameters
      );
      const sinceBlock = range.rows[0].since_block ?? 1;
      const untilBlock = sinceBlock != 0 ? range.rows[0].until_block ?? 1 : 1;

      // get unread events
      const eventsResolver = events(prisma, pool);
      const eventsPromise = eventsResolver(
        null,
        {
          safeAddress: profile.circlesAddress,
          fromBlock: sinceBlock,
          toBlock: untilBlock,
        },
        context
      );

      // get unread chat messages
      const chatMessagesPromise = prisma.chatMessage.findMany({
        where: {
          createdAt: {
            gt: sinceDate,
            lte: untilDate,
          },
          OR: [
            {
              from: profile.circlesAddress,
            },
            {
              to: profile.circlesAddress,
            },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      const results = await Promise.all([eventsPromise, chatMessagesPromise]);

      const eventsResult = results[0];
      const chatMessagesResult = results[1];

      const allChatMessageProfiles: ProfilesBySafeAddressLookup = {};
      chatMessagesResult.forEach((o) => {
        allChatMessageProfiles[o.from] = null;
        allChatMessageProfiles[o.to] = null;
      });
      const chatMessageProfilesResolver = profilesBySafeAddress(prisma, false);
      const chatMessageProfilesResult = await chatMessageProfilesResolver(
        null,
        {
          safeAddresses: Object.keys(allChatMessageProfiles),
        },
        context
      );
      chatMessageProfilesResult.forEach((o) => {
        if (!o.circlesAddress) {
          return;
        }
        allChatMessageProfiles[o.circlesAddress] = o;
      });

      const chatMessageEvents = chatMessagesResult.map((o) => {
        return <ProfileEvent>{
          id: o.id ?? 0,
          timestamp: <any>o.createdAt,
          type: "chat_message",
          direction: profile.circlesAddress == o.from ? "out" : "in",
          safe_address: profile.circlesAddress,
          safe_address_profile: profile,
          payload: <ChatMessage>{
            __typename: "ChatMessage",
            id: o.id,
            from: o.from,
            from_profile: allChatMessageProfiles[o.from],
            to: o.to,
            to_profile: allChatMessageProfiles[o.to],
            text: o.text,
          },
        };
      });

      const sorted = eventsResult.map(e => {
          e.timestamp = <any>Date.parse(e.timestamp)
          return e;
        })
        .concat(chatMessageEvents.map(e => {
          e.timestamp = <any>(<Date><any>e.timestamp).getTime()
          return e;
        }))
        .sort((a, b) =>
          a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0
        )
        .map(e => {
          e.timestamp = new Date(e.timestamp).toJSON()
          return e;
        })
        .filter((o) => o.direction === "in");
      return sorted;
    } finally {
      await pool.end();
    }
  };
}
