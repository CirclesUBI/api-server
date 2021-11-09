import {AggregateSource} from "../aggregateSource";
import {AggregateType, Maybe, Offer, Offers, ProfileAggregate, ProfileAggregateFilter} from "../../types";
import {prisma_api_ro} from "../../apiDbClient";

export class OffersSource implements AggregateSource {
  async getAggregate(forSafeAddress: string, filter?: Maybe<ProfileAggregateFilter>): Promise<ProfileAggregate[]> {
    const offers = await prisma_api_ro.offer.findMany({
      where: {},
      orderBy: {
        createdAt: "desc"
      }
    });

    const lastUpdatedAt = new Date(offers.reduce((p,c) => Math.max(p, c.createdAt.getTime()), 0));
    const apiOffers = offers.map(o => {
      return <Offer>{
        ...o,
        pictureUrl: o.pictureUrl ? o.pictureUrl : "",
        pictureMimeType: o.pictureMimeType ? o.pictureMimeType : "",
        createdAt: o.createdAt.toJSON()
      }
    });

    return [<ProfileAggregate>{
      type: AggregateType.Offers,
      safe_address: forSafeAddress,
      lastUpdatedAt: lastUpdatedAt.toJSON(),
      payload: <Offers> {
        offers: apiOffers
      }
    }]
  }
}