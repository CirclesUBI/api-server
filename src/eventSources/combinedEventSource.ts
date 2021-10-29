import {EventSource} from "./eventSource";
import {PaginationArgs, ProfileEvent, SortOrder} from "../types";

export class CombinedEventSource implements EventSource {
  private readonly _resolvers:EventSource[];

  constructor(resolvers:EventSource[]) {
    this._resolvers = resolvers;
  }

  async getEvents(forSafeAddress: string, pagination:PaginationArgs): Promise<ProfileEvent[]> {
    const resultPromises = this._resolvers.map(resolver => resolver.getEvents(forSafeAddress, pagination));
    const results = await Promise.all(resultPromises);
    const events = results.flatMap(o => o);

    const sortedEvents = events.sort((a,b) => {
        const aTime = new Date(a.timestamp).getTime();
        const bTime = new Date(b.timestamp).getTime();
        return (
          pagination.order == SortOrder.Asc
            ? aTime < bTime
            : aTime > bTime
        )
          ? -1
          : aTime < bTime
            ? 1
            : 0;
      });

    if (sortedEvents.length == 0) {
      return [];
    }

    return sortedEvents.slice(0, Math.min(pagination.limit, sortedEvents.length));
  }
}