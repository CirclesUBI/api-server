import {upsertProfileResolver} from "./upsertProfile";
import {logout} from "./logout";
import {authenticateAtResolver} from "./authenticateAt";
import {consumeDepositedChallengeResolver} from "./consumeDepositedChallenge";
import {requestUpdateSafe} from "./requestUpdateSafe";
import {updateSafe} from "./updateSafe";
import {upsertTag} from "./upsertTag";
import {sendMessage} from "./sendMessage";
import {tagTransaction} from "./tagTransaction";
import {acknowledge} from "./acknowledge";
import {claimInvitation} from "./claimInvitation";
import {redeemClaimedInvitation} from "./redeemClaimedInvitation";
import {verifySessionChallengeResolver} from "./verifySessionChallengeResolver";
import {upsertOrganisation} from "./upsertOrganisation";
import {createTestInvitation} from "./createTestInvitation";
import {addMemberResolver} from "./addMember";
import {removeMemberResolver} from "./removeMember";
import {purchaseResolver} from "./purchase";
import {requestSessionChallenge} from "./requestSessionChallenge";
import {importOrganisationsOfAccount} from "./importOrganisationsOfAccount";
import {completePurchase} from "./completePurchase";
import {completeSale} from "./completeSale";
import {revokeSafeVerification, verifySafe} from "./verifySafe";
import {announcePayment} from "./announcePayment";
import {Environment} from "../../environment";
import {MutationAddNewLangArgs, MutationResolvers, MutationUpdateValueArgs} from "../../types";
import { Context } from "../../context";
import { isBILMember } from "../../utils/canAccess";

export const mutationResolvers : MutationResolvers = {
  purchase: purchaseResolver,
  upsertOrganisation: upsertOrganisation(false),
  upsertRegion: upsertOrganisation(true),
  logout: logout(),
  upsertProfile: upsertProfileResolver(),
  authenticateAt: authenticateAtResolver(),
  consumeDepositedChallenge: consumeDepositedChallengeResolver(Environment.readWriteApiDb),
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
  importOrganisationsOfAccount: importOrganisationsOfAccount,
  completePurchase: completePurchase,
  completeSale: completeSale,
  verifySafe: verifySafe,
  revokeSafeVerification: revokeSafeVerification,
  announcePayment: announcePayment(),
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
    };
  } 
}

