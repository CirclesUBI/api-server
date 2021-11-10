import {AggregateSource} from "../aggregateSource";
import {
  AggregateType,
  Maybe,
  Offer,
  Offers,
  ProfileAggregate,
  ProfileAggregateFilter,
  Purchase,
  Purchases
} from "../../types";
import {prisma_api_ro} from "../../apiDbClient";

export class PurchasesSource implements AggregateSource {
  async getAggregate(forSafeAddress: string, filter?: Maybe<ProfileAggregateFilter>): Promise<ProfileAggregate[]> {

    const purchasesResult = await prisma_api_ro.purchase.findMany({
      where: {
        createdBy: {
          circlesAddress: forSafeAddress
        }
      },
      include: {
        createdBy: true,
        lines: {
          include: {
            product: true
          }
        }
      }
    });

    const lastUpdatedAt = new Date(purchasesResult.reduce((p,c) => Math.max(p, new Date(c.createdAt).getTime()), 0));

    return [<ProfileAggregate>{
      type: AggregateType.Purchases,
      safe_address: forSafeAddress,
      lastUpdatedAt: lastUpdatedAt.toJSON(),
      payload: <Purchases> {
        __typename: "Purchases",
        lastUpdatedAt: lastUpdatedAt.toJSON(),
        purchases: <any>purchasesResult.map(o => {
          return <any>{
            ...o,
            createdAt: o.createdAt.toJSON(),
            createdByAddress: o.createdBy.circlesAddress,
          }
        })
      }
    }]
  }
}