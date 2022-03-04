import {canAccess} from "../../utils/canAccess";
import {ProfileLoader} from "../../querySources/profileLoader";
import {MutationCompleteSaleArgs} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";

export const completeSale = async (parent:any, args:MutationCompleteSaleArgs, context:Context) => {
  if (!context.session?.profileId) {
    throw new Error(`You must have a profile to use this function.`);
  }
  let invoice = await Environment.readonlyApiDb.invoice.findFirst({
    where: {
      id: args.invoiceId
    },
    include: {
      sellerProfile: true,
      customerProfile: true,
      cancelledBy: true,
      lines: {
        include: {
          product: {
            include: {
              createdBy: true
            }
          }
        }
      }
    }
  });

  if (!invoice) {
    throw new Error(`Couldn't find a invoice with id ${args.invoiceId}.`);
  }
  if (!invoice.sellerProfile.circlesAddress) {
    throw new Error(`The seller profile of invoice ${invoice.id} has no safe address.`)
  }
  let canActAsOrganisation = await canAccess(context, invoice.sellerProfile.circlesAddress);
  if (!canActAsOrganisation) {
    throw new Error(`Couldn't find a invoice with id ${args.invoiceId}.`);
  }
  if (invoice.buyerSignature && invoice.sellerSignature) {
    throw new Error(`The purchase is already accepted by both parties.`)
  }
  const data = {
    sellerSignature: !args.revoke,
    sellerSignedDate: !args.revoke ? new Date() : null
  };
  await Environment.readWriteApiDb.invoice.update({
    where: {
      id: args.invoiceId
    },
    data: data
  });
  invoice.sellerSignature = data.sellerSignature;
  invoice.sellerSignedDate = data.sellerSignedDate;

  return {
    ...invoice,
    buyerAddress: invoice.customerProfile.circlesAddress ?? "",
    sellerAddress: invoice.sellerProfile.circlesAddress ?? "",
    buyerProfile: ProfileLoader.withDisplayCurrency(invoice.customerProfile),
    sellerProfile: ProfileLoader.withDisplayCurrency(invoice.sellerProfile),
    buyerSignedDate: invoice.buyerSignedDate?.toJSON(),
    sellerSignedDate: invoice.sellerSignedDate?.toJSON(),
    cancelledAt: invoice.cancelledAt?.toJSON(),
    cancelledBy: ProfileLoader.withDisplayCurrency(invoice.cancelledBy),
    cancelReason: invoice.cancelReason,
    lines: invoice.lines.map(l => {
      return {
        ...l,
        offer: {
          ...l.product,
          pictureUrl: l.product.pictureUrl ?? "",
          pictureMimeType: l.product.pictureMimeType ?? "",
          createdAt: l.product.createdAt.toJSON(),
          createdByAddress: l.product.createdBy.circlesAddress ?? "",
          createdByProfile: ProfileLoader.withDisplayCurrency(l.product.createdBy)
        }
      }
    })
  };
};