import DataLoader from "dataloader";
import {Membership, Profile} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export const profileMembersDataLoader = new DataLoader<string, Profile[]>(async (keys) => {
  const memberships = await Environment.readonlyApiDb.membership.findMany({
    where: {
      memberAt: {
        circlesAddress: {
          in: keys.map(o => o)
        }
      }
    }
  });

  const orgaProfilesById = (await new ProfileLoader().queryCirclesLandById(
    Environment.readonlyApiDb,
    memberships.map(o => o.memberAtId))).idProfileMap;

  const memberProfiles = await new ProfileLoader().profilesBySafeAddress(
    Environment.readonlyApiDb,
    memberships.map(o => o.memberAddress));

  const membershipsWithProfiles = memberships.map(o => {
    return {
      membership: o,
      memberProfile: memberProfiles[o.memberAddress],
      memberAtId: o.memberAtId,
      memberAtCirclesAddress: orgaProfilesById[o.memberAtId]?.circlesAddress
    }
  })
  .groupBy(o => o.memberAtCirclesAddress);

  return keys.map(o => membershipsWithProfiles[o]?.map(o => <Profile>o.memberProfile) ?? []);
}, {
  cache: false
});