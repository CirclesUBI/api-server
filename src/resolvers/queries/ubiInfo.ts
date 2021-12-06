import {Context} from "../../context";
import {UbiInfo} from "../../types";
import {Generate} from "../../generate";
import {Environment} from "../../environment";

export function ubiInfo() {
    return async (parent:any, args:any, context:Context) => {
        const profile = await context.callerInfo;
        if (!profile?.profile) {
            throw new Error(`You need a profile to use this feature.`);
        }
        if (!profile.profile.circlesAddress) {
            throw new Error(`You need a safe to use this feature.`);
        }

        const lastMintingSql = `select timestamp, type
                                from crc_safe_timeline_2
                                where safe_address = $1
                                  and type = 'CrcMinting'
                                order by timestamp desc
                                limit 1;`;

        const tokenAddressSql = `select token
                                 from crc_signup_2
                                 where "user" = $1
                                 limit 1;`;

        const results = await Promise.all([
            Environment.indexDb.query(lastMintingSql, [profile.profile.circlesAddress]),
            Environment.indexDb.query(tokenAddressSql, [profile.profile.circlesAddress])
        ])

        const lastMintingResult = results[0].rows;
        const tokenAddressResult = results[1].rows;

        return <UbiInfo>{
            __typename: "UbiInfo",
            lastTransactionAt: lastMintingResult.length > 0 ? lastMintingResult[0].timestamp : null,
            tokenAddress: tokenAddressResult.length > 0 ? tokenAddressResult[0].token : null,
            randomValue: Generate.randomBase64String(1)[0]
        };
    }
}