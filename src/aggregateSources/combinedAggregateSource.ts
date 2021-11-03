import {AggregateSource} from "./aggregateSource";
import {ProfileAggregate} from "../types";
import {AggregateAugmenter} from "./aggregateAugmenter";

export class CombinedAggregateSource implements AggregateSource {
  private readonly _resolvers:AggregateSource[];

  constructor(resolvers:AggregateSource[]) {
    this._resolvers = resolvers;
  }

  async getAggregate(forSafeAddress:string) : Promise<ProfileAggregate[]> {
    const resultPromises = this._resolvers.map(resolver => resolver.getAggregate(forSafeAddress));
    const results = await Promise.all(resultPromises);
    let aggregates = results.flatMap(o => o);

    const aggregateAugmenter = new AggregateAugmenter();
    aggregates.forEach(a => aggregateAugmenter.add(a));
    aggregates = await aggregateAugmenter.augment();

    return aggregates;
  }
}