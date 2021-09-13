import {Context} from "../../context";
import {Pool} from "pg";
import {loadAllProfilesBySafeAddress} from "./profiles";
import {prisma_api_ro} from "../../apiDbClient";
import {TrustDirection} from "../../types";

export function trustRelations(pool:Pool) {
  return async (parent:any, args:any, context:Context) => {
    const safeAddress = args.safeAddress.toLowerCase();

    const trustQuery = `select "user"
                               , "can_send_to"
                          from crc_current_trust
                          where ("user" = $1
                              or "can_send_to" = $1)
                            and "limit" > 0;`;

    const trustQueryParameters = [safeAddress];
    const trustQueryResult = await pool.query(trustQuery, trustQueryParameters);

    const trusting:{[safeAddress:string]:boolean} = {};
    trustQueryResult.rows
      .filter((o:any) => o.can_send_to == safeAddress)
      .forEach((o:any) => trusting[o.user] = true);

    const trustedBy:{[safeAddress:string]:boolean} = {};
    trustQueryResult.rows
      .filter((o:any) => o.user == safeAddress)
      .forEach((o:any) => trustedBy[o.can_send_to] = true);

    const allSafeAddresses:{[safeAddress:string]:boolean} = {};
    Object.keys(trusting)
      .concat(Object.keys(trustedBy))
      .forEach(o => allSafeAddresses[o] = true);

    const allSafeAddressesArr = Object.keys(allSafeAddresses);
    const profilesBySafeAddress = await loadAllProfilesBySafeAddress(context, prisma_api_ro, allSafeAddressesArr);

    return Object.keys(allSafeAddresses)
      .map(o => {
        return {
          safeAddress: safeAddress,
          safeAddressProfile: profilesBySafeAddress[safeAddress],
          otherSafeAddress: o,
          otherSafeAddressProfile: profilesBySafeAddress[o],
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
  }
}