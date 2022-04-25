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
import { createTestInvitation } from "./createTestInvitation";
import { addMemberResolver } from "./addMember";
import { removeMemberResolver } from "./removeMember";
import { purchaseResolver } from "./purchase";
import { requestSessionChallenge } from "./requestSessionChallenge";
import { importOrganisationsOfAccount } from "./importOrganisationsOfAccount";
import { completePurchase } from "./completePurchase";
import { completeSale } from "./completeSale";
import { revokeSafeVerification, verifySafe } from "./verifySafe";
import { announcePayment } from "./announcePayment";
import { Environment } from "../../environment";
import {
  MutationProofUniquenessArgs,
  MutationResolvers, ProofUniquenessResult
} from "../../types";
import {upsertOffer} from "./upsertOffer";
import {upsertShop} from "./upsertShop";
import {upsertShopCategories} from "./upsertShopCategories";
import {upsertShopCategoryEntries} from "./upsertShopCategoryEntries";
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
  createTestInvitation: createTestInvitation(),
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
  proofUniqueness: async (parent, args, context) => {
    const caller = await context.callerInfo;
    if (!caller?.profile?.circlesAddress) {
      throw new Error("You must have a complete profile to use this function.");
    }

    return <ProofUniquenessResult>{
      isUnique: true,
      existingSafe: ""
    }
  }
};