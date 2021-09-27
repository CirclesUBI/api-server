import {Context} from "../../context";
import {TrustDirection} from "../../types";
import {profilesBySafeAddress, ProfilesBySafeAddressLookup} from "./profiles";
import {PrismaClient} from "../../api-db/client";
import {getPool} from "../resolvers";

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
      const profilesBySafeAddressResolver = profilesBySafeAddress(prisma);
      const profiles = await profilesBySafeAddressResolver(null, {safeAddresses: allSafeAddressesArr}, context);

      const _profilesBySafeAddress: ProfilesBySafeAddressLookup = {};
      profiles.filter(o => o.circlesAddress)
        .forEach(o => _profilesBySafeAddress[<string>o.circlesAddress] = o);

      return Object.keys(allSafeAddresses)
        .map(o => {
          return {
            safeAddress: safeAddress,
            safeAddressProfile: _profilesBySafeAddress[safeAddress],
            otherSafeAddress: o,
            otherSafeAddressProfile: _profilesBySafeAddress[o],
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