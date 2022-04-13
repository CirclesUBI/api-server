import {Organisation, OrganisationResolvers, Profile} from "../../types";
import {Context} from "../../context";
import {organisationMembersDataLoader} from "../dataLoaders/organisationMembersDataLoader";
import {organisationOffersDataLoader} from "../dataLoaders/organisationOffersDataLoader";
import {organisationCityDataLoader} from "../dataLoaders/organisationCityDataLoader";

export const organisationPropertyResolver : OrganisationResolvers = {
  members: async (parent:Organisation, args:any, context:Context) => {
    return organisationMembersDataLoader.load(parent.id);
  },
  offers: async (parent:Organisation, args:any, context:Context) => {
    if (!parent.circlesAddress) {
      return [];
    }

    return organisationOffersDataLoader.load(parent.circlesAddress);
  },
  displayName: (parent:Organisation, args:any, context: Context) => {
    return parent.name.trim();
  },
  city: async (parent: Organisation) => {
    if (!parent.cityGeonameid) return null;
    return await organisationCityDataLoader.load(parent.cityGeonameid);
  },
}