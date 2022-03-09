import {Offer, OfferResolvers} from "../../types";
import {Context} from "../../context";
import {offerCreatedByLoader} from "../dataLoaders/offerCreatedByLoader";

export const offerPropertyResolver : OfferResolvers = {
  createdByProfile: async (parent:Offer, args:any, context:Context) => {
    return offerCreatedByLoader.load(parent.createdByAddress);
  }
}