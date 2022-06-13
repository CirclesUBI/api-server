import DataLoader from "dataloader";
import {City, Invoice, InvoiceLine, PostAddress, PurchaseLine} from "../../types";
import {Environment} from "../../environment";
import {UtilityDbQueries} from "../../querySources/utilityDbQueries";

export const shopPickupAddressDataLoader = new DataLoader<number, PostAddress>(async (keys) => {
    const invoices = await Environment.readWriteApiDb.shop.findMany({
      where: {
        id: {
          in: keys.map(o => o)
        }
      },
      include: {
        pickupAddress: true
      }
    });

    const cities = await UtilityDbQueries.placesById(
      invoices.filter(o => !!o.pickupAddress?.cityGeonameid).map(o => <number>(o.pickupAddress?.cityGeonameid)),
      true);

    const citiesLookup = cities.toLookup(o => o.geonameid, o => o);
    const deliveryAddressLookup = invoices.toLookup(o => o.id, o => {
      const city:any = citiesLookup[<string>o.pickupAddress?.cityGeonameid?.toString()];
      if (!city) {
        return undefined;
      }
      return {
        ...o.pickupAddress,
        city: city.name,
        country: city?.country
      }
    });

    return <any>keys.map(o => deliveryAddressLookup[o]);
  }, {
    cache: false
  });
