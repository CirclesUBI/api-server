import {Maybe, ProfileAggregate, ProfileAggregateFilter} from "../types";

export interface AggregateSource {
  getAggregate(forSafeAddress:string, filter?: Maybe<ProfileAggregateFilter>) : Promise<ProfileAggregate[]>
}