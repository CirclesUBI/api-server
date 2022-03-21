import { ProfileLoader } from "../../querySources/profileLoader";
import { MutationCompletePurchaseArgs, Invoice } from "../../types";
import { Context } from "../../context";
import { Environment } from "../../environment";

export const completePurchase = async (
  parent: any,
  args: MutationCompletePurchaseArgs,
  context: Context
) => {
  const callerInfo = await context.callerInfo;
  if (!callerInfo?.profile) {
    throw new Error(`You must have a profile to use this function.`);
  }
  const invoice = await Environment.readonlyApiDb.invoice.findFirst({
    where: {
      id: args.invoiceId,
      customerProfile: {
        circlesAddress: callerInfo.profile.circlesAddress,
      },
    },
    include: {
      sellerProfile: true,
      customerProfile: true,
      cancelledBy: true,
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
  });
  if (!invoice) {
    throw new Error(`Couldn't find a invoice with id ${args.invoiceId}.`);
  }
  if (invoice.buyerSignature && invoice.sellerSignature) {
    throw new Error(`The purchase is already accepted by both parties.`);
  }
  const data = {
    buyerSignature: !args.revoke,
    buyerSignedDate: !args.revoke ? new Date() : null,
  };
  await Environment.readWriteApiDb.invoice.update({
    where: {
      id: args.invoiceId,
    },
    data: data,
  });
  invoice.buyerSignature = data.buyerSignature;
  invoice.buyerSignedDate = data.buyerSignedDate;

  return <Invoice>{
    ...invoice,
    buyerAddress: invoice.customerProfile.circlesAddress ?? "",
    sellerAddress: invoice.sellerProfile.circlesAddress ?? "",
    buyerProfile: ProfileLoader.withDisplayCurrency(invoice.customerProfile),
    sellerProfile: ProfileLoader.withDisplayCurrency(invoice.sellerProfile),
    buyerSignedDate: invoice.buyerSignedDate?.toJSON() ?? null,
    sellerSignedDate: invoice.sellerSignedDate?.toJSON() ?? null,
    cancelledAt: invoice.cancelledAt?.toJSON() ?? null,
    createdAt: invoice.createdAt?.toJSON() ?? null,
    cancelledBy: ProfileLoader.withDisplayCurrency(invoice.cancelledBy),
    cancelReason: invoice.cancelReason,
    lines: invoice.lines.map((l) => {
      return {
        ...l,
        offer: {
          ...l.product,
          pictureUrl: l.product.pictureUrl ?? "",
          pictureMimeType: l.product.pictureMimeType ?? "",
          createdAt: l.product.createdAt.toJSON(),
          createdByAddress: l.product.createdBy.circlesAddress ?? "",
          createdByProfile: ProfileLoader.withDisplayCurrency(
            l.product.createdBy
          ),
        },
      };
    }),
  };
};
