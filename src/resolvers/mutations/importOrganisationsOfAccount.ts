import {Context} from "../../context";
import {ProfileLoader} from "../../querySources/profileLoader";
import {upsertOrganisation} from "./upsertOrganisation";
import {Environment} from "../../environment";

export const importOrganisationsOfAccount = async (parent:any, args:{}, context: Context) => {
  const sql = `
          select organisation
          from crc_organisation_signup_2
          where owners @> $1::text[];`;

  const session = await context.verifySession();
  const organisationSignups = await Environment.indexDb.query(sql, [[session.ethAddress]]);
  const orgSafeAddresses = organisationSignups.rows.map(o => o.organisation);
  const existingOrgProfiles = await new ProfileLoader().queryCirclesLandBySafeAddress(Environment.readWriteApiDb, orgSafeAddresses);
  const missingOrgProfiles = orgSafeAddresses.filter(o => !existingOrgProfiles[o]);
  const missingOrgProfilesFromCirclesGarden = await new ProfileLoader().queryCirclesGardenRemote(Environment.readWriteApiDb, missingOrgProfiles);

  const importResults = await Promise.all(missingOrgProfiles.map(async org => {
    const createOrgMutation = upsertOrganisation(false);
    const circlesGardenProfile = missingOrgProfilesFromCirclesGarden[org];
    if (circlesGardenProfile) {
      const importOrgResult = await createOrgMutation(null, {
        organisation: {
          circlesAddress: org,
          name: circlesGardenProfile.firstName,
          avatarUrl: circlesGardenProfile.avatarUrl
        }
      }, context);

      return importOrgResult;
    }
  }));

  // @ts-ignore
  return importResults.filter(o => o && o.organisation).map((o) => o.organisation);
}