import { EventSource } from "../eventSource";
import {
  Direction,
  InvoiceLine,
  Maybe,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter, PurchaseEvent,
  SaleEvent,
} from "../../types";
import { Prisma } from "../../api-db/client";
import { Environment } from "../../environment";

export class PurchasesEventSource implements EventSource {
  async getEvents(
    forSafeAddress: string,
    pagination: PaginationArgs,
    filter: Maybe<ProfileEventFilter>
  ): Promise<ProfileEvent[]> {
    if (filter?.direction && filter.direction == Direction.Out) {
      // Exists only for "in"
      return [];
    }

    const createdAt = pagination.continueAt
      ? {
          createdAt:
            pagination.order == "ASC"
              ? {
                  gt: new Date(pagination.continueAt),
                }
              : {
                  lt: new Date(pagination.continueAt),
                },
        }
      : {};

    const purchases = await Environment.readonlyApiDb.invoice.findMany({
      where: {
        customerProfile: {
          circlesAddress: forSafeAddress,
        },
        sellerProfile: {
          circlesAddress: filter?.with
        },
        ...createdAt,
      },
      include: {
        sellerProfile: true,
        lines: {
          include: {
            product: {
              include: {
                createdBy: {
                  select: {
                    circlesAddress: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt:
          pagination.order == "ASC"
            ? Prisma.SortOrder.asc
            : Prisma.SortOrder.desc,
      },
      take: pagination.limit ?? 50,
    });

    return purchases.map((purchaseInvoide) => {
      if (!purchaseInvoide.sellerProfile) {
        throw new Error("");
      }
      return <ProfileEvent>{
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "Purchased",
        block_number: null,
        direction: "in",
        timestamp: purchaseInvoide.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        payload: <PurchaseEvent>{
          __typename: "PurchaseEvent",
          transaction_hash: "",
          seller: purchaseInvoide.sellerProfile.circlesAddress,
          seller_profile: purchaseInvoide.sellerProfile,
          invoice: {
            ...purchaseInvoide,
            sellerAddress: purchaseInvoide.sellerProfile.circlesAddress,
            buyerAddress: forSafeAddress,
            lines: purchaseInvoide.lines.map((o) => {
              return <InvoiceLine>{
                id: o.id,
                offer: {
                  ...o.product,
                  createdByAddress: o.product.createdBy.circlesAddress,
                  createdAt: o.product.createdAt.toJSON(),
                },
                amount: o.amount,
              };
            }),
          },
        },
      };
    });
  }
}
