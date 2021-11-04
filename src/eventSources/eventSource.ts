import {Maybe, PaginationArgs, ProfileEvent, ProfileEventFilter} from "../types";

export interface EventSource {
  getEvents(forSafeAddress:string, pagination:PaginationArgs, filter:Maybe<ProfileEventFilter>) : Promise<ProfileEvent[]>
}