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
  LinkTargetType,
  MutationResolvers,
} from "../../types";
import { proofUniqueness } from "./proofUniqueness";
import { Context } from "../../context";
import { addNewLang } from "./addNewLang";
import { updatei18nValue } from "./updatei18nValue";
import { createNewStringAndKey } from "./createNewStringAndKey";
import { setStringUpdateState } from "./setStringUpdateState";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Generate} from "../../utils/generate";
import {RpcGateway} from "../../circles/rpcGateway";

export const mutationResolvers: MutationResolvers = {
  upsertOrganisation: upsertOrganisation,
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
  setIsFavorite: async (parent, args, context: Context) => {
    const caller = await context.callerInfo;
    if (!caller?.profile?.circlesAddress)
      throw new Error(`Only profiles with a circlesAddress can create favorites.`);

    const circlesAddress = args.circlesAddress.toLowerCase();
    const existingFavorite = await Environment.readWriteApiDb.favorites.findFirst({where:{
      favoriteCirclesAddress: circlesAddress,
      createdByCirclesAddress: caller.profile.circlesAddress
    }});
    const favoriteProfile = await new ProfileLoader().profilesBySafeAddress(Environment.readWriteApiDb, [circlesAddress]);

    if (!favoriteProfile[circlesAddress])
      throw new Error(`Couldn't find a profile for circles address ${circlesAddress}.`);

    if (!existingFavorite && args.isFavorite) {
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
    if (existingFavorite && !args.isFavorite) {
      await Environment.readWriteApiDb.favorites.delete({
        where: {
          id: existingFavorite.id
        }
      });
    }
    return false;
  },
  shareLink: async (parent, args, context) => {
    const caller = await context.callerInfo;
    if (!caller?.profile?.circlesAddress)
      throw new Error(`Only profiles with a circlesAddress can share links.`);

    if ([LinkTargetType.Business, LinkTargetType.Person].indexOf(args.targetType) < 0)
      throw new Error(`'targetType' must be either '${LinkTargetType.Business}' or '${LinkTargetType.Person}'`);

    if (!RpcGateway.get().utils.isAddress(args.targetKey))
      throw new Error(`'targetKey' must be an ethereum address`);

    const link = await Environment.readWriteApiDb.link.create({
      data: {
        id: Generate.randomHexString(),
        createdAt: new Date().toJSON(),
        createdByCirclesAddress: caller.profile.circlesAddress,
        linkTargetKeyField: "circlesAddress",
        linkTargetKey: args.targetKey,
        linkTargetType: args.targetType
      }
    });

    const protocol = Environment.isLocalDebugEnvironment ? "http://" : "https://";
    return protocol + Environment.externalDomain + "/link?id=" + link.id;
  },
  markAsRead: async (parent, args, context:Context) => {
    const caller = await context.callerInfo;
    if (!caller?.profile?.circlesAddress) {
      throw new Error(`Cannot markAsRead without complete profile.`);
    }

    const unreadEvents = await Environment.readWriteApiDb.unreadEvent.findMany({
      where: {
        safe_address: caller.profile.circlesAddress,
        id: {
          in: args.entries
        }
      }
    });

    const now = new Date();
    await Environment.readWriteApiDb.unreadEvent.updateMany({
      where: {
        id: {
          in: unreadEvents.map(o => o.id)
        }
      },
      data: {
        readAt: now
      }
    });

    return {
      count: unreadEvents.length
    }
  }
};
