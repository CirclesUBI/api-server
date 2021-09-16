import {Context} from "../../context";
import {events} from "./queryEvents";
import {ChatMessage, ProfileEvent} from "../../types";
import {PrismaClient} from "../../api-db/client";
import {getPool} from "../resolvers";

export function chatHistory(prisma:PrismaClient) {
    return async (parent:any, args:any, context:Context) => {
        const pool = getPool();

        const safeAddress = args.safeAddress.toLowerCase();
        const contactSafeAddress = args.contactSafeAddress.toLowerCase();

        try {
            const eventsResolver = events(prisma, pool);
            const safeEventsPromise = eventsResolver(undefined, {
                safeAddress: safeAddress
            }, context);
            const contactSafeEventsPromise = eventsResolver(undefined, {
                safeAddress: contactSafeAddress
            }, context);
            const chatMessagesPromise = prisma.chatMessage.findMany({
                where: {
                    from: safeAddress,
                    to: contactSafeAddress
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            const eventPromiseResults = await Promise.all([
                safeEventsPromise,
                contactSafeEventsPromise,
                chatMessagesPromise]);

            const safeEventsResult = eventPromiseResults[0];
            const contactEventsResult = eventPromiseResults[1];

            const eventResults = safeEventsResult.concat(contactEventsResult);
            const eventResultsByTransactionHash: { [transactionHash: string]: ProfileEvent[] } = {};
            eventResults.forEach(o => {
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
                    id: o.payload?.id ?? 0
                });
            });
            const mutualEvents = Object.entries(eventResultsByTransactionHash)
              .filter(o => o[1].length == 2)
              .map(o => o[1]);

            const allBlockchainEvents = <ProfileEvent[]>mutualEvents.map(o => {
                let myEvent: ProfileEvent;
                if (o[0].safe_address == args.safeAddress) {
                    myEvent = o[0];
                } else {
                    myEvent = o[1];
                }
                if (myEvent.direction === "in") {
                    return o.filter(o => o !== myEvent)[0];
                }
                return myEvent;
            })
            .filter(o => o !== undefined);

            const chatMessagesResult = eventPromiseResults[2].map(o => {
                return <ProfileEvent>{
                    id: -1,
                    timestamp: o.createdAt.toJSON(),
                    type: "chat_message",
                    direction: "out",
                    safe_address: o.from,
                    payload: <ChatMessage> {
                        __typename: "ChatMessage",
                        id: o.id,
                        from: o.from,
                        to: o.to,
                        text: o.text
                    }
                };
            });

            return allBlockchainEvents.concat(chatMessagesResult)
              .sort((a, b) =>
                a.timestamp > b.timestamp
                  ? 1
                  : (a.timestamp < b.timestamp
                  ? -1
                  : 0));

        } finally {
            await pool.end();
        }
    }
}