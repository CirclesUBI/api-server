import {PrismaClient} from "../../api-db/client";
import {Context} from "../../context";
import {getPool} from "../resolvers";
import {Organisation, Profile, QueryOrganisationsArgs} from "../../types";
import {ProfileLoader} from "../../profileLoader";

export function organisations(prisma: PrismaClient) {
  return async (
    parent: any,
    args: QueryOrganisationsArgs,
    context: Context
  ) => {
    let organisationSignupQuery = `
          select organisation, timestamp
          from crc_organisation_signup_2`;

    let limit = 100;

    if (args.pagination) {
      limit = Number.isInteger(args.pagination.limit) && args.pagination.limit > 0 && args.pagination.limit <= 100
        ? args.pagination.limit
        : 100

      const continueAtDate = new Date(Date.parse(args.pagination.continueAt));
      organisationSignupQuery += ` where timestamp < '${continueAtDate.toISOString()}'`;
    }
    organisationSignupQuery += ` order by timestamp desc`;
    organisationSignupQuery += ` limit ${limit}`;

    const organisationSignupsResult = await getPool().query(organisationSignupQuery);
    if (organisationSignupsResult.rows.length == 0) {
      return [];
    }

    const allSafeAddresses = organisationSignupsResult.rows.reduce((p,c) => {
      p[c.organisation] = c.timestamp;
      return p;
    },{});

    const profileLoader = new ProfileLoader();
    const profiles = await profileLoader.profilesBySafeAddress(prisma, Object.keys(allSafeAddresses));

    return organisationSignupsResult.rows.map(o => {
      const p:Profile = profiles[o.organisation] ?? {
        id: -1,
        firstName: o.organisation,
        circlesAddress: o.organisation
      };

      return <Organisation>{
        id: p.id,
        createdAt: allSafeAddresses[p.circlesAddress ?? ""],
        name: p.firstName,
        cityGeonameid: p.cityGeonameid,
        circlesAddress: p.circlesAddress,
        avatarUrl: p.avatarUrl,
        description: p.dream,
        avatarMimeType: p.avatarMimeType
      }
    });
  }
}