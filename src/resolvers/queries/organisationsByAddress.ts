import {Context} from "../../context";
import {getPool} from "../resolvers";
import {profilesBySafeAddress} from "./profiles";
import {prisma_api_ro} from "../../apiDbClient";
import {Organisation, Profile, QueryOrganisationsByAddressArgs} from "../../types";

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

            const profileResolver = profilesBySafeAddress(prisma_api_ro);
            const allSafeAddresses = organisationSignupsResult.rows.reduce((p, c) => {
                p[c.organisation] = c.timestamp;
                return p;
            }, {});
            const profiles = await profileResolver(null, {safeAddresses: Object.keys(allSafeAddresses)}, context);
            const _profilesBySafeAddress = profiles.reduce((p, c) => {
                if (!c.circlesAddress)
                    return p;
                p[c.circlesAddress] = c;
                return p;
            }, <{ [x: string]: Profile }>{});

            return organisationSignupsResult.rows.map(o => {
                const p: Profile = _profilesBySafeAddress[o.organisation] ?? {
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