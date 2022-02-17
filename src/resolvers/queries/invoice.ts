import { Context } from "../../context";
import { QueryInvoiceArgs } from "../../types";
import { Environment } from "../../environment";

export const invoice = async (
  parent: any,
  args: QueryInvoiceArgs,
  context: Context
) => {
  const caller = await context.callerInfo;
  if (!caller?.profile)
    throw new Error(`You need a profile to use this feature.`);

  const invoice = await Environment.readonlyApiDb.invoice.findFirst({
    where: {
      id: args.invoiceId,
      OR: [
        {
          customerProfile: {
            circlesAddress: caller.profile.circlesAddress,
          },
        },
        {
          sellerProfile: {
            circlesAddress: caller.profile.circlesAddress,
          },
        },
      ],
    },
    include: {
      sellerProfile: true,
    },
  });

  if (!invoice) {
    return null;
  }

  const invoicePdfObj = await Environment.filesBucket
    .getObject({
      Bucket: "circlesland-invoices",
      Key: `${invoice.sellerProfile.circlesAddress}/${invoice.invoiceNo}.pdf`,
    })
    .promise();

  if (!invoicePdfObj.Body) {
    return null;
  }

  return invoicePdfObj.Body.toString("base64");
};
