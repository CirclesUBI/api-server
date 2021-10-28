import {PaginationArgs, ProfileEvent} from "../types";

export interface InboxSource {
  getNewEvents(forSafeAddress:string, pagination:PaginationArgs) : Promise<ProfileEvent[]>
}