import {Context} from "../../context";
import {Profile} from "../../types";
import {Invitation} from "../../api-db/client";
import {prisma_api_ro} from "../../apiDbClient";
import {hubSignupTransactionResolver} from "./hubSignupTransactionResolver";
import {ProfileLoader} from "../../profileLoader";
import {safeFundingTransactionResolver} from "./safeFundingTransaction";

export function initAggregateState() {
  return async (parent: any, args: any, context: Context) => {
    const session = await context.verifySession();

    let registration: (Profile & { redeemedInvitations: Invitation[] }) | null;
    if (session.profileId) {
      const p = await prisma_api_ro.profile.findUnique({
        where: {id: session.profileId},
        include: {redeemedInvitations: true}
      });
      if (!p){
        return {};
      }
      registration = {
        ...p,
        redeemedInvitations: p.redeemedInvitations,
        displayCurrency: ProfileLoader.getDisplayCurrency(p)
      };
    } else {
      // No profile, no anything..
      return {};
    }
    let safeFundingTx;
    let ubi;
    if (registration?.circlesSafeOwner) {
      const safeFundingTxPromise = safeFundingTransactionResolver(null, null, context);
      const ubiPromise = hubSignupTransactionResolver(null, null, context);
      const promisedResults = await Promise.all([safeFundingTxPromise, ubiPromise]);
      safeFundingTx = promisedResults[0];
      ubi = promisedResults[1];
    }

    return {
      safeFundingTransaction: safeFundingTx?.transaction_hash ?? undefined,
      invitationTransaction: registration?.redeemedInvitations?.length ? registration.redeemedInvitations[0].redeemTxHash : undefined,
      registration: registration ?? undefined,
      invitation: registration?.claimedInvitation ?? undefined,
      hubSignupTransaction: ubi?.transaction_hash ?? undefined
    }
  }
}