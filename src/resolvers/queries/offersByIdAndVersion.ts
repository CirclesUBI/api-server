import {QueryOffersByIdAndVersionArgs} from "../../types";
import {Context} from "../../context";
import {Offer} from "../../api-db/client";
import {Environment} from "../../environment";

export const offersByIdAndVersion = async (parent: any, args: QueryOffersByIdAndVersionArgs, context: Context) => {
  const offerVersions = args.query.filter((o) => !!o.offerVersion).map((o) => <number>o.offerVersion);
  const offerIds = args.query.map((o) => o.offerId);

  let result: Offer[];
  if (offerVersions.length > 0) {
    result = await Environment.readonlyApiDb.offer.findMany({
      where: {
        id: {
          in: offerIds,
        },
        version: {
          in: offerVersions,
        },
      },
      orderBy: {
        version: "desc",
      },
    });
  } else {
    result = await Environment.readonlyApiDb.offer.findMany({
      where: {
        id: {
          in: offerIds,
        },
      },
      orderBy: {
        version: "desc",
      },
    });
  }

  const offerVersionsById = result.groupBy((o) => o.id);
  const offers = Object.values(offerVersionsById).map((offers) => offers[0]);

  return offers.map((o) => {
    return {
      ...o,
      createdByAddress: "",
      createdAt: o.createdAt.toJSON(),
      pictureMimeType: o.pictureMimeType ?? "",
      pictureUrl: o.pictureUrl ?? "",
    };
  });
}
