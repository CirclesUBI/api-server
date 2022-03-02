import {Context} from "../../context";
import {UtilityDbQueries} from "../../querySources/utilityDbQueries";
import {QueryCitiesArgs} from "../../types";

export const cities = async (parent: any, args: QueryCitiesArgs, context: Context) => {
    if (args.query.byName) {
        const result = await UtilityDbQueries.placesByName(args.query.byName.name_like, args.query.byName.languageCode ?? "en")
        return result;
    } else if (args.query.byId) {
        const result = await UtilityDbQueries.placesById(args.query.byId.geonameid)
        return result;
    } else {
        throw new Error(`One of the query arguments must be set: 'byName', 'byId'`);
    }
}