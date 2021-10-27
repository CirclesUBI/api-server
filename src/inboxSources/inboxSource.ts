import {ProfileEvent} from "../types";

export interface InboxSource {
  getNewEvents(forSafeAddress:string, startFrom: Date) : Promise<ProfileEvent[]>
}