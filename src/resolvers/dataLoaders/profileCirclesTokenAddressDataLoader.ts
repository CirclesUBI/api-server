import DataLoader from "dataloader";
import {Environment} from "../../environment";

export const profileCirclesTokenAddressDataLoader = new DataLoader<string, string>(async (keys: readonly any[]) => {
  const signupQuery = `
      select *
      from crc_signup_2
      where "user" = ANY($1)`;

  const signupResult = await Environment.indexDb.query(
    signupQuery,
    [keys]);

  const tokens = signupResult.rows.reduce((p,c) => {
    if (!c.token)
      return p;

    p[c.user] = c.token;
    return p;
  },<{[x:number]:string}>{});

  return keys.map(o => tokens[o]);
}, {
  cache: false
});