import {IndexerEvent, IndexerEventProcessor} from "./indexerEventProcessor";
import {ApiPubSub} from "../pubsub";

export class AppNotificationProcessor implements IndexerEventProcessor {
    constructor() {
    }

    async onMessage(messageNo:number,
                    sourceUrl:string,
                    affectedAddresses:string[],
                    events:IndexerEvent[])
        : Promise<void> {
        await AppNotificationProcessor.notifyClients(affectedAddresses);
    }

    private static async notifyClients(addresses: string[]) {
        for (let address of addresses) {
            await ApiPubSub.instance.pubSub.publish(`events_${address}`, {
                events: {
                    type: "blockchain_event",
                },
            });
        }
    }
}