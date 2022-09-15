import { upsertProfileResolver } from "./upsertProfile";
import { logout } from "./logout";
import { requestUpdateSafe } from "./requestUpdateSafe";
import { updateSafe } from "./updateSafe";
import { upsertTag } from "./upsertTag";
import { sendMessage } from "./sendMessage";
import { tagTransaction } from "./tagTransaction";
import { acknowledge } from "./acknowledge";
import { claimInvitation } from "./claimInvitation";
import { redeemClaimedInvitation } from "./redeemClaimedInvitation";
import { verifySessionChallengeResolver } from "./verifySessionChallengeResolver";
import { upsertOrganisation } from "./upsertOrganisation";
import { addMemberResolver } from "./addMember";
import { removeMemberResolver } from "./removeMember";
import { requestSessionChallenge } from "./requestSessionChallenge";
import { importOrganisationsOfAccount } from "./importOrganisationsOfAccount";
import { completePurchase } from "./completePurchase";
import { completeSale } from "./completeSale";
import { revokeSafeVerification, verifySafe } from "./verifySafe";
import { announcePayment } from "./announcePayment";
import { Environment } from "../../environment";
import {
  MutationAddNewLangArgs,
  MutationConfirmLegalAgeArgs,
  MutationCreateNewStringAndKeyArgs,
  MutationPayWithPathArgs,
  MutationResolvers,
  MutationSetStringUpdateStateArgs,
  MutationUpdateValueArgs,
} from "../../types";
import { TransitivePath, TransitiveTransfer } from "../../types";
import { upsertOffer } from "./upsertOffer";
import { upsertShop } from "./upsertShop";
import { upsertShopCategories } from "./upsertShopCategories";
import { upsertShopCategoryEntries } from "./upsertShopCategoryEntries";
import { proofUniqueness } from "./proofUniqueness";
import { upsertShippingAddress } from "./upsertShippingAddress";
import { purchaseResolver } from "./purchase";
import { isBALIMember, isBILMember } from "../../utils/canAccess";
import { Context } from "../../context";
import BN from "bn.js";
import { confirmLegalAge } from "./confirmLegalAge";
import { addNewLang } from "./addNewLang";
import { updatei18nValue } from "./updatei18nValue";
import { BalanceQueries } from "../../querySources/balanceQueries";
import { EncryptJWT } from "jose";

export const mutationResolvers: MutationResolvers = {
  purchase: purchaseResolver,
  upsertOrganisation: <any>upsertOrganisation(false),
  upsertRegion: <any>upsertOrganisation(true),
  logout: logout(),
  upsertProfile: upsertProfileResolver(),
  requestUpdateSafe: requestUpdateSafe(Environment.readWriteApiDb),
  updateSafe: updateSafe(Environment.readWriteApiDb),
  upsertTag: upsertTag(),
  tagTransaction: tagTransaction(),
  sendMessage: sendMessage(Environment.readWriteApiDb),
  acknowledge: acknowledge(),
  claimInvitation: claimInvitation(),
  redeemClaimedInvitation: redeemClaimedInvitation(),
  requestSessionChallenge: requestSessionChallenge,
  verifySessionChallenge: verifySessionChallengeResolver(Environment.readWriteApiDb),
  addMember: addMemberResolver,
  removeMember: removeMemberResolver,
  importOrganisationsOfAccount: <any>importOrganisationsOfAccount,
  completePurchase: completePurchase,
  completeSale: completeSale,
  verifySafe: verifySafe,
  revokeSafeVerification: revokeSafeVerification,
  announcePayment: announcePayment(),
  addNewLang: addNewLang,
  updateValue: updatei18nValue,

  createNewStringAndKey: async (parent: any, args: MutationCreateNewStringAndKeyArgs, context: Context) => {
    let callerInfo = await context.callerInfo;
    let isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
    if (!isBilMember) {
      throw new Error(`Your need to be a member of Basic Income Lab to edit the content.`);
    } else {
      let createdBy = callerInfo?.profile?.circlesAddress;
      const queryResult = await Environment.pgReadWriteApiDb.query(
        `
      insert into i18n (
          lang,
          key,
          "createdBy",
          version,
          "needsUpdate",
          value
        ) values (
          $1,
          $2,
          $3,
          1,
          false,
          $4) returning lang, key, "createdBy", version, value, "needsUpdate";
      `,
        [args.lang, args.key, createdBy, args.value]
      );
      return queryResult.rows[0];
    }
  },

  setStringUpdateState: async (parent: any, args: MutationSetStringUpdateStateArgs, context: Context) => {
    let callerInfo = await context.callerInfo;
    let isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
    if (!isBilMember) {
      throw new Error(`Your need to be a member of Basic Income Lab to edit the content.`);
    } else {
      let queryResult = await Environment.pgReadWriteApiDb.query(
        `
      update i18n 
			  set "needsUpdate" = true
			    where lang != 'en'
			    and key = $1;
      `,
        [args.key]
      );
      return queryResult.rows[0];
    }
  },

  upsertOffer: upsertOffer,
  upsertShop: upsertShop,
  upsertShopCategories: upsertShopCategories,
  upsertShopCategoryEntries: upsertShopCategoryEntries,
  proofUniqueness: proofUniqueness,
  upsertShippingAddress: upsertShippingAddress,
  confirmLegalAge: confirmLegalAge,

  payWithPath: async (parent: any, args: MutationPayWithPathArgs, context: Context) => {
    const ci = await context.callerInfo;
    if (!ci?.profile) {
      throw new Error("You need to be logged in to use this method.");
    }

    const trustedTokenBalances = await BalanceQueries.getHumanodeVerifiedTokens(args.from);

    let remainingAmount = new BN(args.amount);
    const transfers: TransitivePath[] = [];

    while (remainingAmount.gt(new BN("0"))) {
      const trustedToken = trustedTokenBalances.shift();
      if (!trustedToken) {
        throw new Error("Not enough tokens to pay with.");
      }

      remainingAmount = remainingAmount.sub(trustedToken.balance);

      transfers.push(<TransitivePath>{});
    }

    const myTokenAddress = ci.profile.circlesAddress;
    const trustedTokenBalanceSum = trustedTokenBalances.reduce((acc, cur) => acc.add(cur.balance), new BN(0));

    if (trustedTokenBalanceSum.lt(new BN(args.amount))) {
      // Not enough tokens
      return <TransitivePath>{
        success: false,
        flow: trustedTokenBalanceSum.toString(),
        requestedAmount: args.amount,
        transfers: [],
      };
    }

    return <TransitivePath>{
      flow: args.amount,
      requestedAmount: args.amount,
      transfers: trustedTokenBalances.map((o) => {
        return <TransitiveTransfer>{
          isHubTransfer: false,
          from: o.safeAddress,
          to: args.to,
          value: "1",
          token: o.token,
          tokenOwner: o.tokenOwner,
        };
      }),
    };
  },
};
