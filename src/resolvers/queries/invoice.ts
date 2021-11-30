import {Context} from "../../context";
import AWS from "aws-sdk";
import {prisma_api_ro} from "../../apiDbClient";
import {QueryInvoiceArgs} from "../../types";

export const invoice = async (parent: any, args:QueryInvoiceArgs, context: Context) => {
  const caller = await context.callerInfo;
  if (!caller?.profile)
    throw new Error(`You need a profile to use this feature.`);

  if (!process.env.DIGITALOCEAN_SPACES_ENDPOINT)
    throw new Error(`Missing configuration: process.env.DIGITALOCEAN_SPACES_ENDPOINT`);

  const spacesEndpoint = new AWS.Endpoint(process.env.DIGITALOCEAN_SPACES_ENDPOINT);
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
    secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET
  });

  const invoice = await prisma_api_ro.invoice.findFirst({
    where: {
      id: args.invoiceId,
      OR: [{
        customerProfileId: caller.profile.id
      }, {
        sellerProfileId: caller.profile.id
      }]
    },
    include: {
      sellerProfile: true
    }
  });

  if (!invoice) {
    return null;
  }

  const invoicePdfObj = await s3.getObject({
    Bucket: "circlesland-invoices",
    Key: `${invoice.sellerProfile.circlesAddress}/${invoice.invoiceNo}.pdf`
  }).promise();

  if (!invoicePdfObj.Body) {
    return null;
  }

  return invoicePdfObj.Body.toString("base64");
}