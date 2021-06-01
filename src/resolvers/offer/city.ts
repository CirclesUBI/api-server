import {Query} from "../../utility_db/query";
import {Offer} from "../../types";

export const offerCity = async (parent:Offer) => {
    if (!parent.geonameid) {
        return null;
    }
    const citiy = await Query.placesById([parent.geonameid])
    return citiy.length > 0 ? citiy[0] : null;
}