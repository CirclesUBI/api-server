import {AggregateSource} from "../aggregateSource";
import {
  AggregateType,
  Maybe,
  ProfileAggregate,
  ProfileAggregateFilter, Sales
} from "../../types";
import {Environment} from "../../environment";

export class SalesSource implements AggregateSource {
  async getAggregate(forSafeAddress: string, filter?: Maybe<ProfileAggregateFilter>): Promise<ProfileAggregate[]> {

    const idFilter = filter?.sales?.salesIds ? {
      id: {
        in: filter?.sales?.salesIds ?? []
      }
    } : {};

    const pickupCodeFilter = filter?.sales?.pickupCode ? {
        every: {
          pickupCode: filter?.sales?.pickupCode
        }
    } : {};

    const salesResult = await Environment.readonlyApiDb.purchase.findMany({
      where: {
        ...idFilter,
        invoices: {
          some: {
            sellerProfile: {
              circlesAddress: forSafeAddress
            }
          },
          ...pickupCodeFilter
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        invoices: {
          include: {
            sellerProfile: {
              select: {
                circlesAddress: true
              }
            },
            customerProfile: {
              select: {
                circlesAddress: true
              }
            }
          }
        },
        lines: {
          include: {
            product: {
              include: {
                createdBy: {
                  select: {
                    circlesAddress: true
                  }
                }
              }
            }
          }
        }
      }
    });

    const lastUpdatedAt = new Date(salesResult.reduce((p,c) => Math.max(p, new Date(c.createdAt).getTime()), 0));

    return [<ProfileAggregate>{
      type: AggregateType.Sales,
      safe_address: forSafeAddress,
      lastUpdatedAt: lastUpdatedAt.toJSON(),
      payload: <Sales> {
        __typename: "Sales",
        lastUpdatedAt: lastUpdatedAt.toJSON(),
        sales: <any>salesResult.map(o => {
          const total = o.lines.reduce((p,c) => p + c.amount * parseFloat(c.product.pricePerUnit), 0).toString();
          return <any>{
            ...o,
            sellerAddress: o.invoices[0].sellerProfile.circlesAddress,
            buyerAddress: o.invoices[0].customerProfile.circlesAddress,
            total: total,
            lines: o.lines.map(p => {
              (<any>p.product).createdByAddress = p.product.createdBy.circlesAddress;
              return {
                ...p,
                offer: p.product
              }
            }),
            invoices: o.invoices.map(i => {
              return {
                ...i,
                sellerAddress: o.invoices[0].sellerProfile.circlesAddress,
                buyerAddress: o.invoices[0].customerProfile.circlesAddress
              }
            }),
            createdAt: o.createdAt.toJSON(),
            createdByAddress: forSafeAddress,
          }
        })
      }
    }]
  }
}