import {Query} from "../../utility_db/query";
import {Profile} from "../../types";
import {Context} from "../../context";

export const profileCity = async (parent: Profile,args:any, context:Context) => {
    context.logger?.trace([{
        key: `call`,
        value: `/resolvers/profile/city.ts/profileCity(parent: Profile,args:any, context:Context)`
    }], `Resolving city of profile ${parent.id} by cityGeonameid ${parent.cityGeonameid}`);

    if (!parent.cityGeonameid) {
        return null;
    }
    const city = await Query.placesById([parent.cityGeonameid])
    return city.length > 0 ? city[0] : null;
}