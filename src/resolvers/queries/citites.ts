import {Context} from "../../context";
import {Query} from "../../utility_db/query";
import {QueryCitiesArgs} from "../../types";

export const cities = async (parent: any, args: QueryCitiesArgs, context: Context) => {
    if (args.query.byName) {
        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/queries/cities.ts/cities(parent: any, args: QueryCitiesArgs, context: Context)`
        }], `Querying cities by name '${args.query.byName.name_like}' language_code: '${args.query.byName.languageCode}'`);

        const result = await Query.placesByName(args.query.byName.name_like, args.query.byName.languageCode ?? "en")
        return result;
    } else if (args.query.byId) {
        context.logger?.debug([{
            key: `call`,
            value: `/resolvers/queries/cities.ts/cities(parent: any, args: QueryCitiesArgs, context: Context)`
        }], `Querying cities by geonameid '${args.query.byId.geonameid}'`);

        const result = await Query.placesById(args.query.byId.geonameid)
        return result;
    } else {
        throw new Error(`One of the query arguments must be set: 'byName', 'byId'`);
    }
}