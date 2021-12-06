import {Context} from "../../context";
import {prisma_api_ro} from "../../apiDbClient";
import {Organisation, Profile, QueryOrganisationsByAddressArgs} from "../../types";
import {ProfileLoader} from "../../profileLoader";
import {Environment} from "../../environment";

export function organisationsByAddress() {
    return async (parent:any, args:QueryOrganisationsByAddressArgs, context:Context) => {
        let organisationSignupQuery = `
            select organisation, timestamp
            from crc_organisation_signup_2
            where organisation = ANY ($1)`;

        const organisationSignupsResult = await Environment.indexDb.query(organisationSignupQuery, [args.addresses]);
        if (organisationSignupsResult.rows.length == 0) {
            return [];
        }

        const allCreationDates = organisationSignupsResult.rows.reduce((p, c) => {
            p[c.organisation] = new Date(c.timestamp);
            return p;
        }, {});


        const profileLoader = new ProfileLoader();
        const profiles = await profileLoader.profilesBySafeAddress(prisma_api_ro, Object.keys(allCreationDates));

        return organisationSignupsResult.rows.map(o => {
            const p: Profile = profiles[o.organisation] ?? {
                id: -1,
                firstName: o.organisation,
                circlesAddress: o.organisation
            };
            return <Organisation>{
                id: p.id,
                createdAt: allCreationDates[p.circlesAddress ?? ""],
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