import { EventSource } from "../eventSource";
import {
  Direction,
  InvoiceLine,
  Maybe,
  PaginationArgs,
  ProfileEvent,
  ProfileEventFilter,
  SaleEvent,
} from "../../../types";
import { Prisma } from "../../../api-db/client";
import { Environment } from "../../../environment";

export class SalesEventSource implements EventSource {
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

    const sales = await Environment.readonlyApiDb.invoice.findMany({
      where: {
        sellerProfile: {
          circlesAddress: forSafeAddress,
        },
        customerProfile: {
          circlesAddress: filter?.with
        },
        ...createdAt,
      },
      include: {
        customerProfile: true,
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

    return sales.map((salesInvoice) => {
      if (!salesInvoice.customerProfile) {
        throw new Error("");
      }
      return <ProfileEvent>{
        __typename: "ProfileEvent",
        safe_address: forSafeAddress,
        type: "Purchased",
        block_number: null,
        direction: "in",
        timestamp: salesInvoice.createdAt.toJSON(),
        value: null,
        transaction_hash: null,
        transaction_index: null,
        payload: <SaleEvent>{
          __typename: "SaleEvent",
          transaction_hash: "",
          buyer: salesInvoice.customerProfile.circlesAddress,
          buyer_profile: salesInvoice.customerProfile,
          invoice: {
            ...salesInvoice,
            sellerAddress: forSafeAddress,
            buyerAddress: salesInvoice.customerProfile.circlesAddress,
            lines: salesInvoice.lines.map((o) => {
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