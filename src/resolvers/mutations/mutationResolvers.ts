import { upsertProfileResolver } from "./upsertProfile";
import { logout } from "./logout";
import { authenticateAtResolver } from "./authenticateAt";
import { consumeDepositedChallengeResolver } from "./consumeDepositedChallenge";
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
import { MutationResolvers } from "../../types";

export const mutationResolvers: MutationResolvers = {
  purchase: purchaseResolver,
  upsertOrganisation: upsertOrganisation(false),
  upsertRegion: upsertOrganisation(true),
  logout: logout(),
  upsertProfile: upsertProfileResolver(),
  authenticateAt: authenticateAtResolver(),
  consumeDepositedChallenge: consumeDepositedChallengeResolver(
    Environment.readWriteApiDb
  ),
  requestUpdateSafe: requestUpdateSafe(Environment.readWriteApiDb),
  updateSafe: updateSafe(Environment.readWriteApiDb),
  upsertTag: upsertTag(),
  tagTransaction: tagTransaction(),
  sendMessage: sendMessage(Environment.readWriteApiDb),
  acknowledge: acknowledge(),
  claimInvitation: claimInvitation(),
  redeemClaimedInvitation: redeemClaimedInvitation(),
  requestSessionChallenge: requestSessionChallenge,
  verifySessionChallenge: verifySessionChallengeResolver(
    Environment.readWriteApiDb
  ),
  createTestInvitation: createTestInvitation(),
  addMember: addMemberResolver,
  removeMember: removeMemberResolver,
  importOrganisationsOfAccount: importOrganisationsOfAccount,
  completePurchase: completePurchase,
  completeSale: completeSale,
  verifySafe: verifySafe,
  revokeSafeVerification: revokeSafeVerification,
  announcePayment: announcePayment(),
};
