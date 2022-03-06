import { EventSource } from "../eventSource";
import {
  Direction, Maybe,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter,
  Purchased,
} from "../../../types";
import { Prisma } from "../../../api-db/client";
import { Environment } from "../../../environment";

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

    const purchaseIdFilter = filter?.purchased?.id ? {
      purchase: {
        id: filter.purchased.id
      }
    } : {};

    const purchaseInvoices = await Environment.readonlyApiDb.invoice.findMany({
      where: {
        ...purchaseIdFilter,
        customerProfile: {
          circlesAddress: forSafeAddress,
        },
        sellerProfile: {
          circlesAddress: filter?.with,
        },
        ...createdAt,
      },
      include: {
        purchase: true,
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

    return purchaseInvoices.map((purchaseInvoice) => {
      if (!purchaseInvoice.sellerProfile) {
        throw new Error("");
      }
      const total = purchaseInvoice.lines
        .reduce((p, c) => p + c.amount * parseFloat(c.product.pricePerUnit), 0)
        .toString();
      return <ProfileEvent>{
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "Purchased",
        block_number: null,
        direction: "out",
        timestamp: purchaseInvoice.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        payload: <Purchased>{
          __typename: "Purchased",
          transaction_hash: "",
          seller: purchaseInvoice.sellerProfile.circlesAddress,
          seller_profile: purchaseInvoice.sellerProfile,
          purchase: {
            ...purchaseInvoice.purchase,
            createdByAddress: forSafeAddress,
            total: total,
            createdAt: purchaseInvoice.purchase.createdAt.toJSON()
          }
        },
      };
    });
  }
}
