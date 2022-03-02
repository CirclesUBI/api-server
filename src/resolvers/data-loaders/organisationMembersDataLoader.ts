import DataLoader from "dataloader";
import {ProfileOrOrganisation} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export const organisationMembersDataLoader = new DataLoader<number, ProfileOrOrganisation[]>(async (organisationIds) => {
  const memberships = (await Environment.readonlyApiDb.membership.findMany({
    where: {
      memberAtId: {
        in: organisationIds.map(o => o)
      }
    },
    include: {
      memberAt: true
    }
  }));

  const membersBySafeAddress = await new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, memberships.map(o => o.memberAddress));
  const memberProfilesByOrganisation = memberships.map(o => {
    return  {
      memberProfile: <any>{
        ...membersBySafeAddress[o.memberAddress],
        __typename: "Profile"
      },
      membership: o
    }
  })
    .reduce((p,c) => {
      if (!p[c.membership.memberAtId]) {
        p[c.membership.memberAtId] = [];
      }
      if (c.memberProfile) {
        p[c.membership.memberAtId].push(c.memberProfile);
      }
      return p;
    }, <{[organisationId: number]: ProfileOrOrganisation[]}>{});

  return organisationIds.map(o => {
    const members = memberProfilesByOrganisation[o];
    return members ?? [];
  });
});