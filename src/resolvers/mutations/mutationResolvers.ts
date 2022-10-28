import { upsertProfileResolver } from "./upsertProfile";
import { logout } from "./logout";
import { requestUpdateSafe } from "./requestUpdateSafe";
import { updateSafe } from "./updateSafe";
import { upsertTag } from "./upsertTag";
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
import { revokeSafeVerification, verifySafe } from "./verifySafe";
import { Environment } from "../../environment";
import {
  MutationResolvers,
} from "../../types";
import { TransitivePath, TransitiveTransfer } from "../../types";
import { proofUniqueness } from "./proofUniqueness";
import { isBALIMember, isBILMember } from "../../utils/canAccess";
import { Context } from "../../context";
import BN from "bn.js";
import { addNewLang } from "./addNewLang";
import { updatei18nValue } from "./updatei18nValue";
import { BalanceQueries } from "../../querySources/balanceQueries";
import { EncryptJWT } from "jose";
import { createNewStringAndKey } from "./createNewStringAndKey";
import { setStringUpdateState } from "./setStringUpdateState";

export const mutationResolvers: MutationResolvers = {
  upsertOrganisation: <any>upsertOrganisation(false),
  upsertRegion: <any>upsertOrganisation(true),
  logout: logout(),
  upsertProfile: upsertProfileResolver(),
  requestUpdateSafe: requestUpdateSafe(Environment.readWriteApiDb),
  updateSafe: updateSafe(Environment.readWriteApiDb),
  upsertTag: upsertTag(),
  tagTransaction: tagTransaction(),
  acknowledge: acknowledge(),
  claimInvitation: claimInvitation(),
  redeemClaimedInvitation: redeemClaimedInvitation(),
  requestSessionChallenge: requestSessionChallenge,
  verifySessionChallenge: verifySessionChallengeResolver(Environment.readWriteApiDb),
  addMember: addMemberResolver,
  removeMember: removeMemberResolver,
  importOrganisationsOfAccount: <any>importOrganisationsOfAccount,
  verifySafe: verifySafe,
  revokeSafeVerification: revokeSafeVerification,
  addNewLang: addNewLang,
  updateValue: updatei18nValue,
  createNewStringAndKey: createNewStringAndKey,
  setStringUpdateState: setStringUpdateState,
  proofUniqueness: proofUniqueness,
};
