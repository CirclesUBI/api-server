import {ProfileAggregate} from "../types";

export interface AggregateSource {
  getAggregate(forSafeAddress:string) : Promise<ProfileAggregate[]>
}