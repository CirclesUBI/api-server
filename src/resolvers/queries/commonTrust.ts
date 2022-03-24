import {Context} from "../../context";
import {CommonTrust} from "../../types";
import {PrismaClient} from "../../api-db/client";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";

export function commonTrust(prisma:PrismaClient) {
  return async (parent:any, args:any, context:Context) : Promise<CommonTrust[]> => {
    const commonTrustsQuery = `
        with common_trusts as (
            select "user"
            from crc_current_trust_2
            where can_send_to = $1
              and "limit" > 0
            intersect
            select "user"
            from crc_current_trust_2
            where can_send_to = $2
              and "limit" > 0
            intersect
            select "can_send_to"
            from crc_current_trust_2
            where "user" = $1
              and "limit" > 0
            intersect
            select "can_send_to"
            from crc_current_trust_2
            where "user" = $2
              and "limit" > 0
        )
        select *
        from common_trusts
        where "user" != $1
          and "user" != $2;`;

    const commonTrustsQueryParameters = [args.safeAddress1, args.safeAddress2];
    const commonTrustsResult = await Environment.indexDb.query(commonTrustsQuery, commonTrustsQueryParameters);
    if (commonTrustsResult.rows.length == 0) {
      return [];
    }

    const allSafeAddresses = commonTrustsResult.rows.toLookup(c => c.user);
    const profiles = await new ProfileLoader().profilesBySafeAddress(prisma, Object.keys(allSafeAddresses));

    return commonTrustsResult.rows.map(o => {
      return <CommonTrust>{
        ...o,
        type: 'common',
        safeAddress1: args.safeAddress1,
        safeAddress2: args.safeAddress2,
        profile: profiles[o.user]
      }
    });
  }
}