import DataLoader from "dataloader";
import { Membership } from "../../types";
import { ProfileLoader } from "../../querySources/profileLoader";
import { Environment } from "../../environment";

export const profileMembershipsDataLoader = new DataLoader<string, Membership[]>(
  async (keys) => {
    const memberships = await Environment.readonlyApiDb.membership.findMany({
      where: {
        memberAddress: {
          in: keys.map((o) => o),
        },
      },
      include: {
        memberAt: true,
      },
    });

    const formattedMemberships = memberships
      .map((o) => {
        return {
          organisation: {
            id: o.memberAt.id,
            firstName: o.memberAt.firstName,
            cityGeonameid: o.memberAt.cityGeonameid,
            avatarUrl: o.memberAt.avatarUrl,
            avatarMimeType: o.memberAt.avatarMimeType,
            circlesSafeOwner: o.memberAt.circlesSafeOwner?.toLowerCase(),
            description: o.memberAt.dream,
            createdAt: o.createdAt.toJSON(), // TODO: This is the creation date of the membership, not the one of the organisation
            circlesAddress: o.memberAt.circlesAddress,
            displayCurrency: o.memberAt.displayCurrency,
          },
          createdByProfileId: o.createdByProfileId,
          memberAddress: o.memberAddress,
          createdAt: o.createdAt.toJSON(),
          acceptedAt: o.acceptedAt?.toJSON(),
          rejectedAt: o.rejectedAt?.toJSON(),
          validTo: o.validTo?.toJSON(),
          isAdmin: o.isAdmin ?? false,
        };
      })
      .reduce((p, c) => {
        if (!p[c.memberAddress]) {
          p[c.memberAddress] = [];
        }
        p[c.memberAddress].push({
          ...c,
          organisation: {
            ...c.organisation,
            displayCurrency: ProfileLoader.getDisplayCurrency(c),
            displayName: c.organisation.firstName,
          },
        });
        return p;
      }, <{ [x: string]: Membership[] }>{});

    return keys.map((o) => formattedMemberships[o]);
  },
  {
    cache: false,
  }
);
