import { IndexerEvent, IndexerEventProcessor } from "./indexerEventProcessor";
import { ApiPubSub } from "../utils/pubsub";
import { JobQueue } from "../jobs/jobQueue";

import { EventType, NotificationEvent } from "../types";
import { Environment } from "../environment";
import { UnreadNotification } from "../jobs/descriptions/unreadNotification";

export class AppNotificationProcessor implements IndexerEventProcessor {
  constructor() {}

  async onMessage(
    messageNo: number,
    sourceUrl: string,
    affectedAddresses: string[],
    events: IndexerEvent[]
  ): Promise<void> {
    for (let event of events) {
      let job: any = undefined;
      let notification: NotificationEvent | undefined = undefined;

      switch (event.type) {
        case EventType.CrcHubTransfer:
        case EventType.EthTransfer:
          notification = <NotificationEvent>{
            type: event.type,
            from: event.address1,
            to: event.address2,
            transaction_hash: event.hash,
          };
          await ApiPubSub.instance.pubSub.publish(`events_${event.address1}`, {
            events: notification,
          });
          await ApiPubSub.instance.pubSub.publish(`events_${event.address2}`, {
            events: notification,
          });

          if (event.type == EventType.CrcHubTransfer) {
            const unreadTransferNotification = new UnreadNotification(
              event.timestamp.toJSON(),
              event.type,
              event.address2,
              event.address1,
              "in",
              event.hash
            );
            await JobQueue.produce([unreadTransferNotification]);
          }
          break;
        case EventType.CrcMinting:
          notification = <NotificationEvent>{
            type: event.type,
            from: event.address1,
            to: event.address2,
            transaction_hash: event.hash,
          };
          await ApiPubSub.instance.pubSub.publish(`events_${event.address2}`, {
            events: notification,
          });
          const unreadMintingNotification = new UnreadNotification(
            event.timestamp.toJSON(),
            event.type,
            event.address2,
            event.address1,
            "in",
            event.hash
          );
          await JobQueue.produce([unreadMintingNotification]);
          break;
        case EventType.GnosisSafeEthTransfer:
          notification = <NotificationEvent>{
            type: event.type,
            from: event.address2,
            to: event.address3,
            transaction_hash: event.hash,
          };
          await ApiPubSub.instance.pubSub.publish(`events_${event.address2}`, {
            events: notification,
          });
          await ApiPubSub.instance.pubSub.publish(`events_${event.address3}`, {
            events: notification,
          });
          break;
        case EventType.CrcTrust:
          notification = <NotificationEvent>{
            type: event.type,
            from: event.address2,
            to: event.address1,
            transaction_hash: event.hash,
          };

          await ApiPubSub.instance.pubSub.publish(`events_${event.address1}`, {
            events: notification,
          });
          await ApiPubSub.instance.pubSub.publish(`events_${event.address2}`, {
            events: notification,
          });

          const unreadTrustNotification = new UnreadNotification(
            event.timestamp.toJSON(),
            event.type,
            event.address1,
            event.address2,
            "in",
            event.hash
          );
          await JobQueue.produce([unreadTrustNotification]);
          break;
      }

      // If one of the contacts is an organisation, then notify all members of that organisation
      // because organisations don't subscribe.
      if (notification) {
        const maybeAnOrga = [notification.from, notification.to].filter((o) => !!o);
        const maybeAnOrgaResult = await Environment.readonlyApiDb.profile.findMany({
          where: {
            circlesAddress: {
              in: maybeAnOrga,
            },
            type: "ORGANISATION",
          },
          include: {
            members: true,
          },
        });
        await Promise.all(
          maybeAnOrgaResult.map(async (o) => {
            await Promise.all(
              o.members?.map(async (m) => {
                await ApiPubSub.instance.pubSub.publish(`events_${m.memberAddress}`, {
                  events: notification,
                });
              })
            );
          })
        );
      }

      if (job) {
        await JobQueue.produce([job]);
      }
    }
  }
}
