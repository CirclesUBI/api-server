import {QueryFindSafeAddressByOwnerArgs, SafeAddressByOwnerResult} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";

export const findSafeAddressByOwnerResolver = async (parent:any, args: QueryFindSafeAddressByOwnerArgs, context: Context) => {
    const safeOwnersQuery = `
            select 'ubi' as type, "user" as safe_address
            from crc_signup_2
            where owners @> ARRAY[$1]
            union all
            select 'organisation' as type, organisation as safe_address
            from crc_organisation_signup_2
            where owners @> ARRAY[$1]`;

    const safeOwnersResult = await Environment.indexDb.query(safeOwnersQuery, [args.owner.toLowerCase()]);
    const safeOwnerSafes = safeOwnersResult.rows.map(o => {
        return <SafeAddressByOwnerResult>{
            type: o.type,
            safeAddress: o.safe_address
        }
    });
    return safeOwnerSafes;
}