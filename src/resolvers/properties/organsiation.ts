import {Organisation, OrganisationResolvers} from "../../types";
import {Context} from "../../context";
import {organisationMembersDataLoader} from "../../../dist/resolvers/dataLoaders";

export const organisationPropertyResolver : OrganisationResolvers = {
  members: async (parent:Organisation, args:any, context:Context) => {
    return organisationMembersDataLoader.load(parent.id);
  },
}