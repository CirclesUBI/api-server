import { MutationUpsertShippingAddressArgs, PostAddress } from "../../types";
import { Context } from "../../context";
import { Environment } from "../../environment";
import { UtilityDbQueries } from "../../querySources/utilityDbQueries";

export const upsertShippingAddress = async (parent: any, args: MutationUpsertShippingAddressArgs, context: Context) => {
  const caller = await context.callerInfo;
  if (!caller?.profile) {
    throw new Error("You need a profile to use this function.");
  }

  const result = await Environment.readWriteApiDb.postAddress.upsert({
    create: {
      ...args.data,
      id: undefined,
      shippingAddressOfProfileId: caller.profile.id,
    },
    update: {
      ...args.data,
      id: <number>args.data.id,
      shippingAddressOfProfileId: caller.profile.id,
    },
    where: {
      id: args.data.id ?? -1,
    },
  });

  const place = await UtilityDbQueries.placesById([result.cityGeonameid ?? -1]);
  return <PostAddress>{
    id: result.id,
    name: result.name,
    city: place[0].name,
    cityGeonameid: result.cityGeonameid,
    country: place[0].country,
    zip: result.zip,
    house: result.house,
    state: result.state,
    street: result.street,
    notificationEmail: result.notificationEmail,
  };
};
