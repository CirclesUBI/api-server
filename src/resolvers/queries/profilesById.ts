import {Context} from "../../context";
import {ProfileLoader} from "../../profileLoader";
import {prisma_api_rw} from "../../apiDbClient";
import {Profile, QueryProfilesByIdArgs} from "../../types";

export const profilesById = async (parent:any, args:QueryProfilesByIdArgs, context: Context) => {
  const profiles = await new ProfileLoader().queryCirclesLandById(prisma_api_rw, args.ids);
  return <Profile[]>Object.values(profiles.idProfileMap).map(o => {
    // @ts-ignore
    delete o.newsletter;
    // @ts-ignore
    o.memberships = [];
    return o;
  });
}