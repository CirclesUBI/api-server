import {Context} from "../../context";
import {getPool} from "../resolvers";
import {CommonTrust, Profile} from "../../types";
import {profilesBySafeAddress} from "./profiles";
import {PrismaClient} from "../../api-db/client";

export function commonTrust(prisma:PrismaClient) {
  return async (parent:any, args:any, context:Context) : Promise<CommonTrust[]> => {
    const pool = getPool();
    try {
      const commonTrustsQuery = `
          with common_incoming_trust as (
              select 'in' direction, $1 as safe_address, ct."user", ct.can_send_to, ct."limit"
              from crc_current_trust_2 ct
              where ct.can_send_to = $1
                and "limit" > 0
              union all
              select 'in' direction, $2 as safe_address, ct."user", ct.can_send_to, ct."limit"
              from crc_current_trust_2 ct
              where ct.can_send_to = $2
                and "limit" > 0
          ), common_outgoing_trust as (
              select 'out' direction, $1 as safe_address, ct."user", ct.can_send_to, ct."limit"
              from crc_current_trust_2 ct
              where ct."user" = $1
                and "limit" > 0
              union all
              select 'out' direction, $2 as safe_address, ct."user", ct.can_send_to, ct."limit"
              from crc_current_trust_2 ct
              where ct."user" = $2
                and "limit" > 0
          ), common_in_and_out_trusts as (
              select 'in' direction, "user"
              from common_incoming_trust
              where "limit" > 0
              group by "user"
              having count(can_send_to) > 1
              union all
              select 'out' direction, can_send_to
              from common_outgoing_trust
              where "limit" > 0
              group by can_send_to
              having count("user") > 1
          ), common_mutual_trusts as (
              select 'mutual' direction, "user"
              from common_in_and_out_trusts
              group by "user"
              having count(direction) > 1
          ), distinct_mutual_trusts as (
              select *
              from common_mutual_trusts
              union all
              select ciot.*
              from common_in_and_out_trusts ciot
                  left join common_mutual_trusts cmt on cmt."user" = ciot."user"
              where cmt."user" is null
          )
          select *
          from distinct_mutual_trusts
          where "user" != $1
            and "user" != $2
            and direction = 'mutual';`;

      const commonTrustsQueryParameters = [args.safeAddress1, args.safeAddress2];
      const commonTrustsResult = await pool.query(commonTrustsQuery, commonTrustsQueryParameters);
      if (commonTrustsResult.rows.length == 0) {
        return [];
      }

      const profileResolver = profilesBySafeAddress(prisma);
      const allSafeAddresses = commonTrustsResult.rows.reduce((p,c) => {
        p[c.user] = true;
        return p;
      },{});
      const profiles = await profileResolver(null, {safeAddresses:Object.keys(allSafeAddresses)}, context);
      const _profilesBySafeAddress = profiles.reduce((p,c) => {
        if (!c.circlesAddress)
          return p;
         p[c.circlesAddress] = c;
        return p;
      },<{[x:string]:Profile}>{});

      return commonTrustsResult.rows.map(o => {
        return <CommonTrust>{
          ...o,
          type: o.direction,
          safeAddress1: args.safeAddress1,
          safeAddress2: args.safeAddress2,
          profile: _profilesBySafeAddress[o.user]
        }
      });
    } finally {
      await pool.end();
    }
  }
}