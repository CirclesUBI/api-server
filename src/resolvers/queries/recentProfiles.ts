import { Context } from "../../context";
import { ProfileLoader } from "../../profileLoader";
import { QueryRecentProfilesArgs, Profile } from "../../types";
import { Environment } from "../../environment";

export const recentProfiles = async (
  parent: any,
  args: QueryRecentProfilesArgs,
  context?: Context
) => {
  const profiles = await new ProfileLoader().queryRecentProfiles(
    Environment.readWriteApiDb
  );
  return <Profile[]>Object.values(profiles.idProfileMap).map((o) => {
    // @ts-ignore
    delete o.newsletter;
    // @ts-ignore
    o.memberships = [];
    return o;
  });
};
