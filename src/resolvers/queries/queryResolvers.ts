import {myProfile, profilesBySafeAddress} from "./profiles";
import {sessionInfo} from "./sessionInfo";
import {search} from "./search";
import {cities} from "./citites";
import {version} from "./version";
import {tags} from "./tags";
import {tagById} from "./tagById";
import {claimedInvitation} from "./claimedInvitation";
import {trustRelations} from "./trustRelations";
import {commonTrust} from "./commonTrust";
import {organisations} from "./organisations";
import {safeInfo} from "./safeInfo";
import {hubSignupTransactionResolver} from "./hubSignupTransactionResolver";
import {invitationTransaction} from "./invitationTransaction";
import {myInvitations} from "./myInvitations";
import {organisationsByAddress} from "./organisationsByAddress";
import {regionsResolver} from "./regions";
import {findSafesByOwner} from "./findSafesByOwner";
import {profilesById} from "./profilesById";
import {aggregates} from "./aggregates";
import {events} from "./events";
import {directPath} from "./directPath";
import {invoice} from "./invoice";
import {verifications} from "./verifications";
import {findInvitationCreator} from "./findInvitationCreator";
import {recentProfiles} from "./recentProfiles";
import {stats} from "./stats";
import {init} from "./init";
import {Environment} from "../../environment";
import {Organisation, QueryLastAcknowledgedAtArgs, QueryResolvers, QueryShopArgs, Shop} from "../../types";
import {Context} from "../../context";
import {canAccess} from "../../utils/canAccess";
import * as jose from "jose";
import {Generate} from "../../utils/generate";

const crypto = require('crypto').webcrypto;
const nodeJose = require('node-jose');

const packageJson = require("../../../package.json");

export const queryResolvers: QueryResolvers = {
  sessionInfo: sessionInfo,
  init: init,
  stats: async (parent: any, args: any, context: Context) => {
    const caller = await context.callerInfo;
    if (!caller?.profile?.circlesAddress) {
      throw new Error(`You must have a safe to execute this query.`);
    }
    return stats(caller.profile.circlesAddress);
  },
  cities: cities,
  claimedInvitation: claimedInvitation,
  findSafesByOwner: findSafesByOwner,
  invitationTransaction: invitationTransaction(),
  hubSignupTransaction: hubSignupTransactionResolver,
  myProfile: myProfile(Environment.readWriteApiDb),
  myInvitations: myInvitations(),
  organisations: organisations(Environment.readonlyApiDb),
  regions: regionsResolver,
  organisationsByAddress: organisationsByAddress(),
  profilesBySafeAddress: profilesBySafeAddress(Environment.readonlyApiDb),
  search: search(Environment.readonlyApiDb),
  version: version(packageJson),
  tags: tags(Environment.readonlyApiDb),
  tagById: tagById(Environment.readonlyApiDb),
  trustRelations: trustRelations(Environment.readonlyApiDb),
  commonTrust: commonTrust(Environment.readonlyApiDb),
  safeInfo: safeInfo(),
  profilesById: profilesById,
  recentProfiles: recentProfiles,
  aggregates: aggregates,
  events: events,
  directPath: directPath,
  invoice: invoice,
  verifications: verifications,
  findInvitationCreator: findInvitationCreator,
  lastAcknowledgedAt: async (parent: any, args: QueryLastAcknowledgedAtArgs, context: Context) => {
    if (!(await canAccess(context, args.safeAddress))) {
      throw new Error(`You cannot access the specified safe address.`);
    }
    const lastAcknowledgedDate = await Environment.readWriteApiDb.profile.findFirst({
      where: {
        circlesAddress: args.safeAddress
      },
      select: {
        lastAcknowledged: true
      }
    });
    return lastAcknowledgedDate?.lastAcknowledged;
  },
  shops: async (parent: any, args: any, context: Context) => {
    const shops = await Environment.readWriteApiDb.shop.findMany({
      where: {
        enabled: true,
        owner: {
          type: "ORGANISATION"
        }
      },
      include: {
        owner: true
      },
      orderBy: {
        sortOrder: "asc"
      }
    });
    return shops.map(o => {
      return <Shop>{
        ...o,
        owner: <Organisation>{
          ...o.owner,
          createdAt: o.createdAt.toJSON(),
          name: o.owner.firstName
        }
      }
    });
  },
  shop: async (parent: any, args: QueryShopArgs, context: Context) => {
    const shops = await Environment.readWriteApiDb.shop.findMany({
      where: {
        id: args.id,
        enabled: true
      },
      include: {
        owner: true
      },
      orderBy: {
        sortOrder: "asc"
      }
    });
    const shop = shops.map(o => {
      return <Shop>{
        ...o,
        owner: <Organisation>{
          ...o.owner,
          createdAt: o.createdAt.toJSON(),
          name: o.owner.firstName
        }
      }
    });
    return shop.length > 0 ? shop[0] : null;
  },
  clientAssertionJwt: async (parent: any, args: any, context: Context) => {
    const callerInfo = await context.callerInfo;
    if (!callerInfo?.profile?.circlesAddress) {
      throw new Error(`You need a completed profile to use this feature.`);
    }

    const privateKeyObj = await Environment.readonlyApiDb.jwks.findFirst({
      where: {},
      orderBy: {createdAt: "desc"}
    });
    if (!privateKeyObj) {
      throw new Error(`No signing key available.`);
    }

    const clientId = "circles-ubi-jwks";
    const iat = Date.now();
    const exp = iat + 5 * 60 * 1000;

    const payload = JSON.stringify({
      jti: Generate.randomHexString(),
      iss: clientId,
      sub: clientId,
      aud: "https://auth.staging.oauth2.humanode.io/oauth2/auth",
      iat: iat,
      exp: exp
    });

    const opt = {
      compact: true,
      jwk: privateKeyObj
    }
    const token = await nodeJose.JWS
      .createSign(opt, privateKeyObj)
      .update(payload)
      .final();

    return token;
  }
}