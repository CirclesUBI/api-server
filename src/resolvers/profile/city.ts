import {Query} from "../../utility_db/query";
import {Profile} from "../../types";

export const profileCity = async (parent:Profile) => {
    if (!parent.cityGeonameid) {
        return null;
    }
    const city = await Query.placesById([parent.cityGeonameid])
    return city.length > 0 ? city[0] : null;
}