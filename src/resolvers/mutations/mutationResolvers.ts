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
import { MutationResolvers, MutationConfirmLegalAgeArgs } from "../../types";
import { upsertOffer } from "./upsertOffer";
import { upsertShop } from "./upsertShop";
import { upsertShopCategories } from "./upsertShopCategories";
import { upsertShopCategoryEntries } from "./upsertShopCategoryEntries";
import { proofUniqueness } from "./proofUniqueness";
import { upsertShippingAddress } from "./upsertShippingAddress";
import { purchaseResolver } from "./purchase";
import { Context } from "../../context";

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
  confirmLegalAge: async (parent: any, args: MutationConfirmLegalAgeArgs, context: Context) => {
    const ci = await context.callerInfo;
    if (!ci?.profile) return false;

    if (!ci.profile.confirmedLegalAge || ci.profile.confirmedLegalAge < args.age) {
      await Environment.readWriteApiDb.profile.update({
        where: { id: ci.profile.id },
        data: {
          confirmedLegalAge: args.age,
        },
      });
    }

    return true;
  },
};
