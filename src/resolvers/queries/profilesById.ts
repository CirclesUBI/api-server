import {Context} from "../../context";
import {ProfileLoader} from "../../profileLoader";
import {Profile, QueryProfilesByIdArgs} from "../../types";
import {Environment} from "../../environment";

export const profilesById = async (parent:any, args:QueryProfilesByIdArgs, context: Context) => {
  const profiles = await new ProfileLoader().queryCirclesLandById(Environment.readWriteApiDb, args.ids);
  return <Profile[]>Object.values(profiles.idProfileMap).map(o => {
    // @ts-ignore
    delete o.newsletter;
    // @ts-ignore
    o.memberships = [];
    return o;
  });
}