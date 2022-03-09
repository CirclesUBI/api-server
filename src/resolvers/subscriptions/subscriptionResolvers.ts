import {Context} from "../../context";
import {Environment} from "../../environment";
import {ApiPubSub} from "../../utils/pubsub";
import {SubscriptionResolvers} from "../../types";

export const subscriptionResolvers : SubscriptionResolvers = {
  events: {
    subscribe: async function subscribe(parent: any, args: any, context: Context): Promise<AsyncIterable<any>> {
      const callerInfo = await context.callerInfo;
      if (!callerInfo?.profile && !callerInfo?.session.ethAddress)
        throw new Error(`You need a registration to subscribe`);

      const subscriberInfo = callerInfo.profile?.circlesAddress
        ? "subscriber circlesAddress: " + callerInfo.profile?.circlesAddress
        : "subscriber ethAddress: " + callerInfo.session.ethAddress;

      console.log(
        `-->: [${new Date().toJSON()}] [${Environment.instanceId}] [${context.session?.id}] [${context.id}] [${context.ipAddress}] [Subscription.events.subscribe]: ${subscriberInfo}`
      );

      const subscriptionIterable = class implements AsyncIterable<any> {
        readonly address: string;

        constructor(address: string) {
          this.address = address;
        }

        [Symbol.asyncIterator](): AsyncIterator<any> {
          return ApiPubSub.instance.pubSub.asyncIterator([
            `events_${this.address}`
          ]);
        }
      };

      if (!callerInfo.profile?.circlesAddress && callerInfo.session.ethAddress) {
        return new subscriptionIterable(callerInfo.session.ethAddress.toLowerCase());
      } else if (callerInfo.profile?.circlesAddress) {
        return new subscriptionIterable(callerInfo.profile?.circlesAddress.toLowerCase());
      }

      console.error(`Err: [${new Date().toJSON()}] [${Environment.instanceId}] [${context.id}] [${context.ipAddress}] [Subscription.events]: Cannot subscribe without an eoa- or safe-address`);
      throw new Error(`Cannot subscribe without an eoa- or safe-address.`);
    }
  }
}