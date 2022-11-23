import {Favorite, FavoriteResolvers} from "../../types";
import { Context } from "../../context";
import {Environment} from "../../environment";
import {ProfileLoader} from "../../querySources/profileLoader";

export const favoritePropertyResolvers: FavoriteResolvers = {
  favorite: async (parent: Favorite, args:any, context: Context) => {
    const profile = await new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, [parent.favoriteAddress]);
    return profile[parent.favoriteAddress];
  }
};
