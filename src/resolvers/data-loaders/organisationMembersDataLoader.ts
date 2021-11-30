import DataLoader from "dataloader";
import {ProfileOrOrganisation} from "../../types";
import {prisma_api_ro} from "../../apiDbClient";
import {ProfileLoader} from "../../profileLoader";

export const organisationMembersDataLoader = new DataLoader<number, ProfileOrOrganisation[]>(async (organisationIds) => {
  const memberships = (await prisma_api_ro.membership.findMany({
    where: {
      memberAtId: {
        in: organisationIds.map(o => o)
      }
    },
    include: {
      memberAt: true
    }
  }));

  const membersBySafeAddress = await new ProfileLoader().profilesBySafeAddress(prisma_api_ro, memberships.map(o => o.memberAddress));
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