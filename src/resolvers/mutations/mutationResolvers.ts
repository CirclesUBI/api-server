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
import { MutationResolvers } from "../../types";
import { upsertOffer } from "./upsertOffer";
import { upsertShop } from "./upsertShop";
import { upsertShopCategories } from "./upsertShopCategories";
import { upsertShopCategoryEntries } from "./upsertShopCategoryEntries";
import { proofUniqueness } from "./proofUniqueness";
import { upsertShippingAddress } from "./upsertShippingAddress";
import {purchaseResolver} from "./purchase";
import {Context} from "../../context";

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
  upsertOffer: upsertOffer,
  upsertShop: upsertShop,
  upsertShopCategories: upsertShopCategories,
  upsertShopCategoryEntries: upsertShopCategoryEntries,
  proofUniqueness: proofUniqueness,
  upsertShippingAddress: upsertShippingAddress,
  confirmLegalAge: async (parent:any, args, context:Context) => {
    const ci = await context.callerInfo;
    if (!ci?.profile)
      return false;

    await Environment.readWriteApiDb.profile.update({
      where: {id: ci.profile.id},
      data: {
        confirmedLegalAge: new Date()
      }
    });

    return true;
  },
  addNewLang: async (parent: any, args: MutationAddNewLangArgs, context: Context) => {
    const callerInfo = await context.callerInfo;
    const isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
    if (!isBilMember) {
      throw new Error (`You need to be a member of Basic Income Lab to add a new Language.`)
    } else {
      const queryResult = await Environment.pgReadWriteApiDb.query(`
      insert into i18n (lang, key, "createdBy", version, value)
          select $1 as lang
              , i18n.key
              , i18n."createdBy"
              , 1 as version
              , i18n.value
          from i18n
          join (
        select lang, key, max(version) as version
              from i18n
              where lang = $2
              group by lang, key
          ) max_versions on i18n.key = max_versions.key
                      and i18n.lang = max_versions.lang
                      and i18n.version = max_versions.version;
      `,
        [args.langToCreate, args.langToCopyFrom]);
      return queryResult.rowCount
    }
  },
  updateValue: async (parent: any, args: MutationUpdateValueArgs, context: Context) => {
    let callerInfo = await context.callerInfo;
    let isBilMember = await isBILMember(callerInfo?.profile?.circlesAddress);
    if (!isBilMember) {
      throw new Error(`You need to be a member of Basic Income Lab to edit the content.`)
    } else {
      let createdBy = callerInfo?.profile?.circlesAddress
      const queryResult = await Environment.pgReadWriteApiDb.query(`
      insert into i18n (
          lang,
          key, 
          "createdBy", 
          version, 
          value
      ) values (
          $1,
          $2, 
          $3, 
          (select max(version) + 1 
          from i18n 
          where key=$2 and lang=$1),
          $4);
      `,
        [args.lang, args.key, createdBy, args.value]);
      return queryResult.rowCount
    }
  }
}

