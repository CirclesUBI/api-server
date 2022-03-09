import {ClaimedInvitation, ClaimedInvitationResolvers} from "../../types";
import {Context} from "../../context";
import {claimedInvitationCreatedByProfileDataLoader} from "../dataLoaders/claimedInvitationCreatedByProfileDataLoader";
import {claimedInvitationClaimedByProfileDataLoader} from "../dataLoaders/claimedInvitationClaimedByProfileDataLoader";

export const claimedInvitationPropertyResolver : ClaimedInvitationResolvers = {
  createdBy: async (parent: ClaimedInvitation, args: any, context: Context) => {
    return claimedInvitationCreatedByProfileDataLoader.load(parent.createdByProfileId);
  },
  claimedBy: async (parent: ClaimedInvitation, args: any, context: Context) => {
    return claimedInvitationClaimedByProfileDataLoader.load(parent.claimedByProfileId);
  }
}