import {Invoice, MutationPurchaseArgs, Profile} from "../../types";
import {
  Invoice as DbInvoice, InvoiceLine,
  Offer as DbOffer,
  Purchase as DbPurchase,
  PurchaseLine as DbPurchaseLine,
} from "../../api-db/client";
import {prisma_api_ro, prisma_api_rw} from "../../apiDbClient";
import {Context} from "../../context";
import {createPdfForInvoice} from "../../invoiceGenerator";
import {ProfileLoader} from "../../profileLoader";

export type OfferLookup = {
  [id: number]: {
    id: number,
    version: number,
    amount: number,
    offer: DbOffer
  }
};

export type CreatedDbPurchase = ( DbPurchase & {createdBy: Profile, lines: (DbPurchaseLine & {product:  DbOffer & {createdBy: Profile}})[]});

export async function purchaseResolver(parent: any, args: MutationPurchaseArgs, context: Context) : Promise<Invoice[]> {
  const callerInfo = await context.callerInfo;
  if (!callerInfo) {
    throw new Error(`You need a profile to purchase.`);
  }
  if (!callerInfo.profile?.circlesAddress) {
    throw new Error(`You need a safe to purchase.`)
  }

  // If there are pending payments for this user then
  // don't allow to create a new purchase until the previous
  // one is paid.
  const openInvoices = await prisma_api_rw.purchase.findMany({
    where: {
      createdBy: {
        circlesAddress: callerInfo.profile.circlesAddress
      },
      invoices: {
        some: {
          paymentTransactionHash: null
        }
      }
    }
  });

  if (openInvoices.length > 0)
  {
    throw new Error(`You cannot make another purchase until your last purchase is processed.`)
  }

  const purchasedOffers = await lookupOffers(args);
  const purchase = await createPurchase(ProfileLoader.withDisplayCurrency(callerInfo.profile), args, purchasedOffers);
  const invoices = await createInvoices(ProfileLoader.withDisplayCurrency(callerInfo.profile), args, purchasedOffers, purchase);

  const apiInvoices = invoices.map(o => {
    return <Invoice> {
      id: o.id,
      purchaseId: o.purchaseId,
      buyerAddress: o.customerProfile.circlesAddress,
      sellerAddress: o.sellerProfile.circlesAddress,
      lines: o.lines.map(p => {
        return {
          id: p.id,
          amount: p.amount,
          offer: {
            ...p.product,
            createdByAddress: p.product.createdBy.circlesAddress,
            createdAt: p.product.createdAt.toJSON()
          }
        }
      })
    }
  });

  return apiInvoices;
}

async function lookupOffers(args: MutationPurchaseArgs): Promise<OfferLookup> {
  const offerVersions = await Promise.all(args.lines.map(async o => {
    const maxVersion = await prisma_api_ro.$queryRaw(`
        select id
             , max(o.version) as version
        from "Offer" o
        where id = $1
        group by id`, o.offerId);

    return {
      id: o.offerId,
      version: maxVersion[0].version,
      amount: o.amount
    }
  }));

  const offers = await Promise.all(offerVersions.map(async o => {
    const offer = await prisma_api_ro.offer.findUnique({
      where: {
        id_version: {
          id: o.id,
          version: o.version
        }
      }
    });
    return {
      id: o.id,
      version: o.version,
      amount: o.amount,
      offer: offer
    }
  }));

  return offers.reduce((p,c) => {
    if (!c.offer)
      return p;
    // @ts-ignore
    p[c.id] = c;
    return p;
  }, <OfferLookup>{})
}

async function createPurchase(caller:Profile, args: MutationPurchaseArgs, offersLookup: OfferLookup) : Promise<CreatedDbPurchase> {
  const purchase = await prisma_api_rw.purchase.create({
    data: {
      createdByProfileId: caller.id,
      createdAt: new Date(),
      lines: {
        createMany: {
          data: args.lines.map(o => {
            const offer = offersLookup[o.offerId];
            return <DbPurchaseLine>{
              amount: o.amount,
              productVersion: offer.version,
              productId: offer.id
            };
          })
        }
      }
    },
    include: {
      lines: {
        include: {
          product: {
            include: {
              createdBy: true
            }
          }
        }
      },
      createdBy: true
    }
  });

  return {
    ...purchase,
    createdBy: ProfileLoader.withDisplayCurrency(purchase.createdBy),
    lines: purchase.lines.map(l => {
      return {
        ...l,
        product: {
          ...l.product,
          createdBy: ProfileLoader.withDisplayCurrency(l.product.createdBy)
        }
      }
    })
  };
}

export async function getNextInvoiceNo(profileId: number) : Promise<number> {
  const p = await prisma_api_rw.$queryRaw(`
      WITH updated AS (
        UPDATE "Profile" SET "lastInvoiceNo" = "lastInvoiceNo" + 1
            WHERE id = ${profileId} RETURNING "lastInvoiceNo"
    )
    SELECT "lastInvoiceNo" as invoice_no FROM updated;`);

  return p[0].invoice_no;
}

async function createInvoices(caller:Profile, args: MutationPurchaseArgs, offersLookup: OfferLookup, purchase: CreatedDbPurchase)
  : Promise<(DbInvoice & {customerProfile: Profile, sellerProfile: Profile, lines: (InvoiceLine & {product:  DbOffer & {createdBy: Profile}})[]})[]> {
  const sellersLines: {[sellerAddress:string]:DbPurchaseLine[]} = {};
  const sellers: {[sellerAddress:string]:Profile} = {};

  for(let purchaseLine of purchase.lines) {
    const sellerAddress = purchaseLine.product.createdBy.circlesAddress;
    if (!sellerAddress) {
      throw new Error(`Encountered an offer without seller address in purchase line: ${JSON.stringify(purchaseLine)}`);
    }

    if (!sellersLines[sellerAddress]) {
      sellers[sellerAddress] = purchaseLine.product.createdBy;
      sellersLines[sellerAddress] = [];
    }
    sellersLines[sellerAddress].push(purchaseLine);
  }

  const invoices = await Promise.all(Object.values(sellers).map(async seller => {
    if (!seller.circlesAddress) {
      throw new Error(`Encountered a seller without circlesAddress: ${JSON.stringify(seller)}`);
    }
    const sellerLines = sellersLines[seller.circlesAddress];

    const invoice = prisma_api_rw.invoice.create({
      data: {
        sellerProfileId: seller.id,
        customerProfileId: caller.id,
        purchaseId: purchase.id,
        createdAt: new Date(),
        invoiceNo: "",
        lines: {
          create: sellerLines.map(l => {
            return {
              amount: l.amount,
              productId: l.productId,
              productVersion: l.productVersion
            }
          })
        }
      },
      include: {
        sellerProfile: true,
        customerProfile: true,
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

    return invoice;
  }));

  return invoices.map(i => {
    return {
      ...i,
      customerProfile: ProfileLoader.withDisplayCurrency(i.customerProfile),
      sellerProfile: ProfileLoader.withDisplayCurrency(i.sellerProfile),
      lines: i.lines.map(l => {
        return {
          ...l,
          product: {
            ...l.product,
            createdBy: ProfileLoader.withDisplayCurrency(l.product.createdBy)
          }
        }
      })
    }
  });
}