import {IndexerEvent, IndexerEventProcessor} from "./indexerEventProcessor";
import {ApiPubSub} from "../utils/pubsub";
import {JobQueue} from "../jobs/jobQueue";
import {SendCrcTrustChangedEmail} from "../jobs/descriptions/emailNotifications/sendCrcTrustChangedEmail";
import {SendCrcReceivedEmail} from "../jobs/descriptions/emailNotifications/sendCrcReceivedEmail";

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
            switch (event.type) {
                case "CrcTrust":
                    job = new SendCrcTrustChangedEmail(event.hash, event.address1, event.address2, parseInt(event.value));
                    break;
                case "CrcHubTransfer":
                    job = new SendCrcReceivedEmail(event.timestamp, event.hash, event.address1, event.address2, event.value);
                    break;
                case "CrcSignup":
                case "CrcOrganisationSignup":
                case "EthTransfer":
                case "Erc20Transfer":
                case "GnosisSafeEthTransfer":
                    break;
            }
            if (job) {
                await JobQueue.produce([job]);
            }
        }

        for(let event of events) {
            //from
            if (event.type == "CrcHubTransfer") {
                await ApiPubSub.instance.pubSub.publish(`events_${event.address2}`, {
                    events: {
                        type: "blockchain_event",
                        from: event.address1
                    },
                });
            }
        }
/*
        for (let address of affectedAddresses) {
            await ApiPubSub.instance.pubSub.publish(`events_${address}`, {
                events: {
                    type: "blockchain_event"
                },
            });
        }
 */
    }
}