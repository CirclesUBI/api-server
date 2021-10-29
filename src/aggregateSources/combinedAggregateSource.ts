import {AggregateSource} from "./aggregateSource";
import {ProfileAggregate} from "../types";

export class CombinedAggregateSource implements AggregateSource {
  private readonly _resolvers:AggregateSource[];

  constructor(resolvers:AggregateSource[]) {
    this._resolvers = resolvers;
  }

  async getAggregate(forSafeAddress:string) : Promise<ProfileAggregate[]> {
    const resultPromises = this._resolvers.map(resolver => resolver.getAggregate(forSafeAddress));
    const results = await Promise.all(resultPromises);
    const aggregates = results.flatMap(o => o);
    return aggregates;
  }
}