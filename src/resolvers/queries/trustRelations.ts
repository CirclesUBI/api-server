import {Context} from "../../context";
import {TrustDirection} from "../../types";
import {profilesBySafeAddress, ProfilesBySafeAddressLookup} from "./profiles";
import {PrismaClient} from "../../api-db/client";
import {getPool} from "../resolvers";
import {ProfileLoader} from "../../profileLoader";

export function trustRelations(prisma:PrismaClient) {
  return async (parent:any, args:any, context:Context) => {

    const pool = getPool();
    try {
      const safeAddress = args.safeAddress.toLowerCase();

      const trustQuery = `select "user"
                               , "can_send_to"
                          from crc_current_trust_2
                          where ("user" = $1
                              or "can_send_to" = $1)
                            and "limit" > 0;`;

      const trustQueryParameters = [safeAddress];
      const trustQueryResult = await pool.query(trustQuery, trustQueryParameters);

      const trusting: { [safeAddress: string]: boolean } = {};
      trustQueryResult.rows
        .filter((o: any) => o.can_send_to == safeAddress)
        .forEach((o: any) => trusting[o.user] = true);

      const trustedBy: { [safeAddress: string]: boolean } = {};
      trustQueryResult.rows
        .filter((o: any) => o.user == safeAddress)
        .forEach((o: any) => trustedBy[o.can_send_to] = true);

      const allSafeAddresses: { [safeAddress: string]: boolean } = {};
      Object.keys(trusting)
        .concat(Object.keys(trustedBy))
        .forEach(o => allSafeAddresses[o] = true);

      const allSafeAddressesArr = Object.keys(allSafeAddresses);
      const profileLoader = new ProfileLoader();
      const profiles = await profileLoader.profilesBySafeAddress(prisma, allSafeAddressesArr);

      return Object.keys(allSafeAddresses)
        .map(o => {
          return {
            safeAddress: safeAddress,
            safeAddressProfile: profiles[safeAddress],
            otherSafeAddress: o,
            otherSafeAddressProfile: profiles[o],
            direction: trusting[o] && trustedBy[o]
              ? TrustDirection.Mutual
              : (
                trusting[o]
                  ? TrustDirection.Out
                  : TrustDirection.In
              )
          }
        })
        .filter(o => o.safeAddress != o.otherSafeAddress);
    } finally {
      await pool.end();
    }
  }
}