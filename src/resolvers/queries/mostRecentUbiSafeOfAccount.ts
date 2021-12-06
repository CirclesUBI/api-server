import {Context} from "../../context";
import {QueryMostRecentUbiSafeOfAccountArgs} from "../../types";
import {Environment} from "../../environment";

export const mostRecentUbiSafeOfAccount = async (parent:any, args:QueryMostRecentUbiSafeOfAccountArgs, context:Context) => {
    const findSafeOfOwnerSql = `select "user"
                                  from crc_signup_2
                                  where "owners" @> $1::text[];`;

    const safesResult = await Environment.indexDb.query(findSafeOfOwnerSql, [[args.account]]);
    if (safesResult.rows.length == 0) {
      return null;
    }
    const safeAddresses = safesResult.rows.map(o => o.user);

    const lastActiveSafeSql = `
          select st.safe_address, max(st.timestamp)
          from crc_safe_timeline_2 st
          where st.safe_address = ANY ($1::text[])
            and st.type = 'CrcMinting'
          group by st.safe_address
          order by max(st.timestamp) desc
          limit 1;`;

    const activeSafeResult = await Environment.indexDb.query(lastActiveSafeSql, [safeAddresses]);
    if (activeSafeResult.rows.length == 0) {
      return null;
    }

    return activeSafeResult.rows[0].safe_address;
  };