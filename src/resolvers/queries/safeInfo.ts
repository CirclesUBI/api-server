import {Context} from "../../context";
import {Maybe, QuerySafeInfoArgs, SafeInfo} from "../../types";
import {Generate} from "../../utils/generate";
import {Environment} from "../../environment";

export function safeInfo() {
    return async (parent:any, args:QuerySafeInfoArgs, context:Context) => {
        let safeAddress: Maybe<string>|undefined = args.safeAddress;
        if (!safeAddress) {
            const profile = await context.callerInfo;
            if (!profile?.profile) {
                throw new Error(`You need a profile to use this feature.`);
            }
            if (!profile.profile.circlesAddress) {
                throw new Error(`You need a safe to use this feature.`);
            }
            safeAddress = profile.profile.circlesAddress;
        }

        const lastMintingSql = `select s."user"
                                     , s.token
                                     , max(c.timestamp) > (now() - '90 days'::interval) as is_alive
                                     , max(c.timestamp) as last_ubi
                                from crc_signup_2 s
                                         join crc_minting_2 c on s.token = c.token
                                where "user" = $1
                                group by s."user", s.token`;

        const results = await Environment.indexDb.query(lastMintingSql, [safeAddress]);
        if (!results.rows.length) {
            return null;
        }

        return <SafeInfo>{
            __typename: "SafeInfo",
            type: "Person",
            safeAddress: results.rows[0].user,
            lastUbiAt: results.rows[0].last_ubi,
            tokenAddress: results.rows[0].token,
            randomValue: Generate.randomBase64String(1)[0]
        };
    }
}