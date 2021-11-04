import {Context} from "../../context";
import {getPool} from "../resolvers";
import {profilesBySafeAddress} from "./profiles";
import {prisma_api_ro} from "../../apiDbClient";
import {Organisation, Profile, QueryOrganisationsByAddressArgs} from "../../types";
import {ProfileLoader} from "../../profileLoader";

export function organisationsByAddress() {
    return async (parent:any, args:QueryOrganisationsByAddressArgs, context:Context) => {
        const pool = getPool();
        try {
            let organisationSignupQuery = `
            select organisation, timestamp
            from crc_organisation_signup_2
            where organisation = ANY ($1)`;

            const organisationSignupsResult = await pool.query(organisationSignupQuery, [args.addresses]);
            if (organisationSignupsResult.rows.length == 0) {
                return [];
            }

            const allSafeAddresses = organisationSignupsResult.rows.reduce((p, c) => {
                p[c.organisation] = c.timestamp;
                return p;
            }, {});


            const profileLoader = new ProfileLoader();
            const profiles = await profileLoader.profilesBySafeAddress(prisma_api_ro, Object.keys(allSafeAddresses));

            return organisationSignupsResult.rows.map(o => {
                const p: Profile = profiles[o.organisation] ?? {
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
                    trustsYou: p.trustsYou,
                    avatarMimeType: p.avatarMimeType
                }
            });
        } finally {
            await pool.end();
        }
    }
}