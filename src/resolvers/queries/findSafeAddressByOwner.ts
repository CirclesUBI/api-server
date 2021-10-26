import {getPool} from "../resolvers";
import {QueryFindSafeAddressByOwnerArgs} from "../../types";
import {Context} from "../../context";

export const findSafeAddressByOwnerResolver = async (parent:any, args: QueryFindSafeAddressByOwnerArgs, context: Context) => {
  const pool = getPool();
  try {
    const query1 = "select safe_address from crc_safe_owners where \"owner\" = $1";
    const query1Result = await pool.query(query1, [args.owner.toLowerCase()]);
    const query1SafeAddresses = query1Result.rows.map(o => o.safe_address);

    const query2 = `select *
                        from crc_signup_2
                        where owners @> ARRAY[$1]`;
    const query2Result = await pool.query(query2, [args.owner.toLowerCase()]);
    const query2SafeAddresses = query1Result.rows.map(o => o.safe_address);

    const allAddresses = query1SafeAddresses.concat(query2SafeAddresses)
      .reduce((p,c) => { p[c] = true; return p; }, <{[x:string]:any}>{});

    return Object.keys(allAddresses);
  } finally {
    await pool.end();
  }
}