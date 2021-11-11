import {AggregateSource} from "../aggregateSource";
import {AggregateType, Maybe, Offer, Offers, ProfileAggregate, ProfileAggregateFilter} from "../../types";
import {prisma_api_ro} from "../../apiDbClient";

export type OfferRow = {
  id: number
  version: number
  created_at: string
  last_updated_at: string
  createdByAddress: string
  title: string
  pictureUrl: string
  pictureMimeType: string
  description: string
  pricePerUnit: string
};

export class OffersSource implements AggregateSource {
  async getAggregate(forSafeAddress: string, filter?: Maybe<ProfileAggregateFilter>): Promise<ProfileAggregate[]> {
    const offersResult = <OfferRow[]>(await prisma_api_ro.$queryRaw(`
        with "latest" as (
            select id
                 , max(o.version) as latest_version
                 , min(o."createdAt") as created_at
                 , max(o."createdAt") as last_updated_at
            from "Offer" o
            group by id
        ), data as (
            select o.id
                 , version
                 , l."created_at"
                 , l."last_updated_at"
                 , p."circlesAddress" as "createdByAddress"
                 , o.title
                 , o."pictureUrl"
                 , o."pictureMimeType"
                 , o."description"
                 , o."pricePerUnit"
            from "Offer" o
                     join "Profile" p on p.id = o."createdByProfileId"
                     join "latest" l on o.id = l.id and o.version = l.latest_version
            where p."circlesAddress" is not null
        )
        select *
        from data
        where ($1 = ARRAY[]::integer[] or id = ANY($1))
          and ($2 = ARRAY[]::text[] or "createdByAddress" = ANY($2));`,
      filter?.offers?.offerIds ?? [], filter?.offers?.createdByAddresses ?? []));

    const lastUpdatedAt = new Date(offersResult.reduce((p,c) => Math.max(p, new Date(c.created_at).getTime()), 0));
    const apiOffers = offersResult.map(o => {
      return <Offer>{
        ...o,
        pictureUrl: o.pictureUrl ? o.pictureUrl : "",
        pictureMimeType: o.pictureMimeType ? o.pictureMimeType : "",
        createdAt: o.created_at,
        createdByAddress: o.createdByAddress
      }
    });

    return [<ProfileAggregate>{
      type: AggregateType.Offers,
      safe_address: forSafeAddress,
      lastUpdatedAt: lastUpdatedAt.toJSON(),
      payload: <Offers> {
        __typename: "Offers",
        lastUpdatedAt: lastUpdatedAt.toJSON(),
        offers: apiOffers
      }
    }]
  }
}