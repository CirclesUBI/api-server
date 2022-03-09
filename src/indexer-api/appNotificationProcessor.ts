import {IndexerEvent, IndexerEventProcessor} from "./indexerEventProcessor";
import {ApiPubSub} from "../utils/pubsub";
import {JobQueue} from "../jobs/jobQueue";
import {SendCrcTrustChangedEmail} from "../jobs/descriptions/emailNotifications/sendCrcTrustChangedEmail";
import {SendCrcReceivedEmail} from "../jobs/descriptions/emailNotifications/sendCrcReceivedEmail";
import {EventType, NotificationEvent} from "../types";

export class AppNotificationProcessor implements IndexerEventProcessor {
    constructor() {
    }

    async onMessage(messageNo:number,
                    sourceUrl:string,
                    affectedAddresses:string[],
                    events:IndexerEvent[])
        : Promise<void> {
        for(let event of events) {
            let job:any = undefined;
            let notification:NotificationEvent|undefined = undefined;

            switch (event.type) {
                case EventType.CrcHubTransfer:
                    job = new SendCrcReceivedEmail(event.timestamp, event.hash, event.address1, event.address2, event.value);
                case EventType.Erc20Transfer:
                case EventType.GnosisSafeEthTransfer:
                case EventType.EthTransfer:
                    notification = <NotificationEvent>{
                        type: event.type,
                        from: event.address1,
                        to: event.address2,
                        transaction_hash: event.hash
                    };

                    await ApiPubSub.instance.pubSub.publish(`events_${event.address1}`, {
                        events: notification
                    });
                    await ApiPubSub.instance.pubSub.publish(`events_${event.address2}`, {
                        events: notification
                    });
                    break;
                case "CrcTrust":
                    job = new SendCrcTrustChangedEmail(event.hash, event.address1, event.address2, parseInt(event.value));
                    notification = <NotificationEvent>{
                        type: event.type,
                        from: event.address2,
                        to: event.address1,
                        transaction_hash: event.hash
                    };

                    await ApiPubSub.instance.pubSub.publish(`events_${event.address1}`, {
                        events: notification
                    });
                    await ApiPubSub.instance.pubSub.publish(`events_${event.address2}`, {
                        events: notification
                    });
                    break;
                case "CrcSignup":
                case "CrcOrganisationSignup":
                    break;
            }

            if (job) {
                await JobQueue.produce([job]);
            }
        }
    }
}