import {Context} from "../../context";
import {Organisation, Profile, QueryOrganisationsByAddressArgs} from "../../types";
import {ProfileLoader} from "../../querySources/profileLoader";
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

        const allCreationDates = organisationSignupsResult.rows.toLookup(c => c.organisation, c => new Date(c.timestamp));
        const profileLoader = new ProfileLoader();
        const profiles = await profileLoader.profilesBySafeAddress(Environment.readonlyApiDb, Object.keys(allCreationDates));

        return organisationSignupsResult.rows.map(o => {
            const p: Profile = profiles[o.organisation] ?? {
                id: -1,
                askedForEmailAddress: false,
                firstName: o.organisation,
                circlesAddress: o.organisation
            };
            return <Organisation>{
                id: p.id,
                createdAt: allCreationDates[p.circlesAddress ?? ""]?.toJSON(),
                name: p.firstName,
                circlesAddress: p.circlesAddress,
                avatarUrl: p.avatarUrl,
                description: p.dream,
                avatarMimeType: p.avatarMimeType
            }
        });
    }
}