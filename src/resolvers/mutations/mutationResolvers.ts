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
import {ProfileLoader} from "../../querySources/profileLoader";

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
  toggleFavorite: async (parent, args, context: Context) => {
    const caller = await context.callerInfo;
    if (!caller?.profile?.circlesAddress)
      throw new Error(`Only profiles with a circlesAddress can create favorites.`);

    const circlesAddress = args.circlesAddress.toLowerCase();
    const existingFavorite = await Environment.readWriteApiDb.favorites.findFirst({where:{favoriteCirclesAddress: circlesAddress}});
    const favoriteProfile = await new ProfileLoader().profilesBySafeAddress(Environment.readWriteApiDb, [circlesAddress]);

    if (!favoriteProfile[circlesAddress])
      throw new Error(`Couldn't find a profile for circles address ${circlesAddress}.`);

    if (!existingFavorite) {
      await Environment.readWriteApiDb.favorites.create({
        data: {
          createdAt: new Date().toJSON(),
          createdByCirclesAddress: caller.profile.circlesAddress,
          favoriteCirclesAddress: circlesAddress,
          comment: null
        }
      });
      return true;
    }

    await Environment.readWriteApiDb.favorites.delete({
      where: {
        id: existingFavorite.id
      }
    });
    return false;
  }
};
