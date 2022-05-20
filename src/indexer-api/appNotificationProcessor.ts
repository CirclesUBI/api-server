import {IndexerEvent, IndexerEventProcessor} from "./indexerEventProcessor";
import {ApiPubSub} from "../utils/pubsub";
import {JobQueue} from "../jobs/jobQueue";
import {SendCrcTrustChangedEmail} from "../jobs/descriptions/emailNotifications/sendCrcTrustChangedEmail";
import {SendCrcReceivedEmail} from "../jobs/descriptions/emailNotifications/sendCrcReceivedEmail";
import {EventType, NotificationEvent} from "../types";
import {Environment} from "../environment";
import {MintCheckInNfts} from "../jobs/descriptions/mintCheckInNfts";

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
                case EventType.CrcMinting:
                    notification = <NotificationEvent>{
                        type: event.type,
                        from: event.address1,
                        to: event.address2,
                        transaction_hash: event.hash
                    };
                    await ApiPubSub.instance.pubSub.publish(`events_${event.address2}`, {
                        events: notification
                    });
                    break;
                case EventType.GnosisSafeEthTransfer:
                    notification = <NotificationEvent>{
                        type: event.type,
                        from: event.address2,
                        to: event.address3,
                        transaction_hash: event.hash
                    };
                    await ApiPubSub.instance.pubSub.publish(`events_${event.address2}`, {
                        events: notification
                    });
                    await ApiPubSub.instance.pubSub.publish(`events_${event.address3}`, {
                        events: notification
                    });
                    break;
                case EventType.CrcTrust:
                    if (parseInt(event.value) > 0) {
                        await JobQueue.produce([new MintCheckInNfts(event.address2, event.address1)]);
                    }

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
            }

            // If one of the contacts is an organisation, then notify all members of that organisation
            // because organisations don't subscribe.
            if (notification) {
                const maybeAnOrga = [notification.from, notification.to].filter(o => !!o);
                const maybeAnOrgaResult = await Environment.readonlyApiDb.profile.findMany({
                    where: {
                        circlesAddress: {
                            in: maybeAnOrga
                        },
                        type: "ORGANISATION"
                    },
                    include: {
                        members: true
                    }
                });
                await Promise.all(maybeAnOrgaResult.map(async o => {
                    await Promise.all(o.members?.map(async m => {
                        await ApiPubSub.instance.pubSub.publish(`events_${m.memberAddress}`, {
                            events: notification
                        });
                    }));
                }));
            }


            if (job) {
                await JobQueue.produce([job]);
            }
        }
    }
}
