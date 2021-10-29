import {PaginationArgs, ProfileEvent} from "../types";

export interface EventSource {
  getEvents(forSafeAddress:string, pagination:PaginationArgs) : Promise<ProfileEvent[]>
}