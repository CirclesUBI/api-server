import {InboxSource} from "./inboxSource";
import {PaginationArgs, ProfileEvent} from "../types";
import {BlockchainEventsInboxSource, BlockchainEventType} from "./blockchainEventsInboxSource";
import {ApiEventsInboxSource} from "./apiEventsInboxSource";

export class AggregateInboxSource implements InboxSource {
  async getNewEvents(forSafeAddress: string, pagination:PaginationArgs): Promise<ProfileEvent[]> {
    const blockchainInboxSource = new BlockchainEventsInboxSource([
      BlockchainEventType.CRC_HUB_TRANSFER,
      BlockchainEventType.CRC_MINTING,
      BlockchainEventType.CRC_SIGNUP,
      BlockchainEventType.CRC_TRUST,
      BlockchainEventType.ETH_TRANSFER,
      BlockchainEventType.GNOSIS_SAFE_ETH_TRANSFER
    ]);

    const blockchainEvents = await blockchainInboxSource.getNewEvents(
      forSafeAddress,
      pagination);

    const apiEventSource = new ApiEventsInboxSource();
    const apiEvents = await apiEventSource.getNewEvents(
      forSafeAddress,
      pagination);

    return blockchainEvents
      .concat(apiEvents)
      .sort((a,b) => {
        const aTime = new Date(a.timestamp).getTime();
        const bTime = new Date(b.timestamp).getTime();
        return aTime > bTime
          ? -1
          : aTime < bTime
            ? 1
            : 0;
      });
  }
}