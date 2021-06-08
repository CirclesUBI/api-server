import {Query} from "../../utility_db/query";
import {Offer} from "../../types";
import {Context} from "../../context";

export const offerCity = async (parent:Offer, args:any, context:Context) => {
    context.logger?.trace([{
        key: `call`,
        value: `/resolvers/offer/city.ts/offerCity(parent:Offer, args:any, context:Context)`
    }], `Resolving city of offer ${parent.id} by geonameid ${parent.geonameid}`);
    if (!parent.geonameid) {
        return null;
    }
    const citiy = await Query.placesById([parent.geonameid])
    return citiy.length > 0 ? citiy[0] : null;
}