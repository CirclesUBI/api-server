import DataLoader from "dataloader";
import {City, Invoice, InvoiceLine, PostAddress, PurchaseLine} from "../../types";
import {Environment} from "../../environment";
import {UtilityDbQueries} from "../../querySources/utilityDbQueries";

export const invoiceDeliveryAddressDataLoader = new DataLoader<number, PostAddress>(async (keys) => {
    const invoices = await Environment.readWriteApiDb.invoice.findMany({
      where: {
        id: {
          in: keys.map(o => o)
        }
      },
      include: {
        deliveryAddress: true
      }
    });

    const cities = await UtilityDbQueries.placesById(
      invoices.filter(o => !!o.deliveryAddress?.cityGeonameid).map(o => <number>(o.deliveryAddress?.cityGeonameid)),
      true);

    const citiesLookup = cities.toLookup(o => o.geonameid, o => o);
    const deliveryAddressLookup = invoices.toLookup(o => o.id, o => {
      const city:any = citiesLookup[<string>o.deliveryAddress?.cityGeonameid?.toString()];
      if (!city) {
        return undefined;
      }
      return {
        ...o.deliveryAddress,
        city: city.name,
        country: city?.country
      }
    });

    return <any>keys.map(o => deliveryAddressLookup[o]);
  }, {
    cache: false
  });
