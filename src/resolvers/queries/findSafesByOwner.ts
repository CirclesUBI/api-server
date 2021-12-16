import {QueryFindSafesByOwnerArgs, SafeInfo} from "../../types";
import {Context} from "../../context";
import {Environment} from "../../environment";
import {Generate} from "../../generate";
import {ProfileLoader} from "../../profileLoader";

export const findSafesByOwner = async (parent:any, args: QueryFindSafesByOwnerArgs, context: Context) => {
    const safeOwnersQuery = `
        with safes as (
            select 'Person' as type, "user" as safe_address, token
            from crc_signup_2
            where owners @> ARRAY [$1]
            union all
            select 'Organisation' as type, organisation as safe_address, null as token
            from crc_organisation_signup_2
            where owners @> ARRAY [$1]
        ), ubi_info as (
            select sa.safe_address
                 , sa.token
                 , sa.type
                 , max(c.timestamp) > (now() - '90 days'::interval) as is_alive
                 , max(c.timestamp) as last_ubi
            from safes sa
                     left join crc_minting_2 c on sa.token = c.token
            group by sa.safe_address, sa.token, sa.type
        )
        select *
        from ubi_info`;

    const safeOwnersResult = await Environment.indexDb.query(safeOwnersQuery, [args.owner.toLowerCase()]);
    const profiles = await new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, safeOwnersResult.rows.map(o => o.safe_address));

    const safeOwnerSafes = safeOwnersResult.rows.map(o => {
        return <SafeInfo>{
            __typename: "SafeInfo",
            type: o.type,
            safeAddress: o.safe_address,
            safeProfile: ProfileLoader.withDisplayCurrency(profiles[o.safe_address]),
            lastUbiAt: o.last_ubi,
            tokenAddress: o.token,
            randomValue: Generate.randomBase64String(1)[0]
        }
    });
    return safeOwnerSafes;
}