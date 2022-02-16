import { AggregateSource } from "../aggregateSource";
import {
  AggregateType,
  Maybe,
  ProfileAggregate,
  ProfileAggregateFilter,
  Purchases,
} from "../../types";
import { Environment } from "../../environment";

export class PurchasesSource implements AggregateSource {
  async getAggregate(
    forSafeAddress: string,
    filter?: Maybe<ProfileAggregateFilter>
  ): Promise<ProfileAggregate[]> {
    const idFilter = filter?.purchases?.purchaseIds
      ? {
          id: {
            in: filter?.purchases?.purchaseIds ?? [],
          },
        }
      : {};

    const pickupCodeFilter = filter?.purchases?.pickupCode
      ? {
          invoices: {
            some: {
              pickupCode: filter?.purchases?.pickupCode,
            },
          },
        }
      : {};

    const purchasesResult = await Environment.readonlyApiDb.purchase.findMany({
      where: {
        createdBy: {
          circlesAddress: forSafeAddress,
        },
        ...idFilter,
        ...pickupCodeFilter,
      },
      include: {
        createdBy: true,
        lines: {
          include: {
            product: {
              include: {
                createdBy: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const lastUpdatedAt = new Date(
      purchasesResult.reduce(
        (p, c) => Math.max(p, new Date(c.createdAt).getTime()),
        0
      )
    );

    return [
      <ProfileAggregate>{
        type: AggregateType.Purchases,
        safe_address: forSafeAddress,
        lastUpdatedAt: lastUpdatedAt.toJSON(),
        payload: <Purchases>{
          __typename: "Purchases",
          lastUpdatedAt: lastUpdatedAt.toJSON(),
          purchases: <any>purchasesResult.map((o) => {
            const total = o.lines
              .reduce(
                (p, c) => p + c.amount * parseFloat(c.product.pricePerUnit),
                0
              )
              .toString();
            return <any>{
              ...o,
              total: total,
              lines: o.lines.map((p) => {
                (<any>p.product).createdByAddress =
                  p.product.createdBy.circlesAddress;
                return {
                  ...p,
                  offer: p.product,
                };
              }),
              createdAt: o.createdAt.toJSON(),
              createdByAddress: o.createdBy.circlesAddress,
            };
          }),
        },
      },
    ];
  }
}
