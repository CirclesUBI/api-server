import {Context} from "../../context";
import {events} from "./queryEvents";
import {ProfileEvent} from "../../types";
import {PrismaClient} from "../../api-db/client";
import {getPool} from "../resolvers";

export function chatHistory(prisma:PrismaClient) {
    return async (parent:any, args:any, context:Context) => {
        const pool = getPool();
        try {
            const eventsResolver = events(prisma, pool);
            const safeEventsPromise = eventsResolver(undefined, {
                safeAddress: args.safeAddress
            }, context);
            const contactSafeEventsPromise = eventsResolver(undefined, {
                safeAddress: args.contactSafeAddress
            }, context);

            const eventPromiseResults = await Promise.all([safeEventsPromise, contactSafeEventsPromise]);
            const eventResults = eventPromiseResults.reduce((p, c) => p.concat(c), []);
            const eventResultsByTransactionHash: { [transactionHash: string]: ProfileEvent[] } = {};
            eventResults.forEach(o => {
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

            return <ProfileEvent[]>mutualEvents.map(o => {
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
              .filter(o => o !== undefined)
              .sort((a, b) => a.timestamp > b.timestamp ? 1 : (a.timestamp < b.timestamp ? -1 : 0));
        } finally {
            await pool.end();
        }
    }
}