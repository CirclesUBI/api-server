import {ProfileEvent, ProfileEventResolvers} from "../../types";
import {Context} from "../../context";
import {profileEventContactProfileDataLoader} from "../dataLoaders/profileEventContactProfileDataLoader";

export const profileEventPropertyResolver : ProfileEventResolvers = {
  contact_address_profile: async (parent:ProfileEvent, args:any, context:Context) => {
    if (!parent.contact_address) {
      return null;
    }
    return profileEventContactProfileDataLoader.load(parent.contact_address);
  }
}