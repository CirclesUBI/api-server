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
import {QueryOffersByIdAndVersionArgs, QueryResolvers} from "../../types";
import {Context} from "../../context";
import {shop} from "./shop";
import {clientAssertionJwt} from "./clientAssertionJwt";
import {shops, shopsById} from "./shops";
import {lastAcknowledgedAt} from "./lastAcknowledgedAt";
import {Offer} from "../../api-db/client";

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
  lastAcknowledgedAt: lastAcknowledgedAt,
  shops: shops,
  shopsById: shopsById,
  shop: shop,
  clientAssertionJwt: clientAssertionJwt,
  offersByIdAndVersion: async (parent: any, args: QueryOffersByIdAndVersionArgs, context: Context) => {
    const offerVersions = args.query.filter(o => !!o.offerVersion).map(o => <number>o.offerVersion);
    const offerIds = args.query.map(o => o.offerId);

    let result: Offer[];
    if (offerVersions.length > 0) {
      result = await Environment.readonlyApiDb.offer.findMany({
        where: {
          id: {
            in: offerIds
          },
          version: {
            in: offerVersions
          }
        },
        orderBy: {
          version: "desc"
        }
      });
    } else {
      result = await Environment.readonlyApiDb.offer.findMany({
        where: {
          id: {
            in: offerIds
          }
        },
        orderBy: {
          version: "desc"
        }
      });
    }

    const offerVersionsById = result.groupBy(o => o.id);
    const offers = Object.values(offerVersionsById).map(offers => offers[0]);

    return offers.map(o => {
      return {
        ...o,
        createdByAddress: "",
        createdAt: o.createdAt.toJSON(),
        pictureMimeType: o.pictureMimeType ?? "",
        pictureUrl: o.pictureUrl ?? ""
      }
    });
  },
  allProfiles: async (parent:any, args:any, context:Context) => {
    const profilesSql = `
      select "circlesAddress", "firstName", "lastName", "avatarUrl"
      from "Profile"
      where "circlesAddress" is not null;`;

    const profilesRows = await Environment.pgReadWriteApiDb.query(profilesSql);
    const profileAddresses = profilesRows.rows.map(o => o.circlesAddress);
    const profileLookup = profilesRows.rows.toLookup(o => o.circlesAddress, o => o);

    const trustRelationsSql = `select "can_send_to" as truster_address,
                                      "user"        as trustee_address,
                                      "limit"       as trust_limit,
                                      last_change
                               from crc_current_trust_2
                               where "user" = ANY ($1);`;


    function getDisplayName(address: string): string {
      let profileData = profileLookup[address];
      if (!profileData)
        return "";

      let displayName = profileData.firstName;
      if (profileData.lastName) {
        displayName += ` ${profileData.lastName}`;
      }
      return displayName;
    }

    function getAvatarUrl(address: string): string {
      return (profileLookup[address])
          ? profileLookup[address].avatarUrl ?? ""
          : "";
    }

    const trustRelationRows = await Environment.indexDb.query(trustRelationsSql, [profileAddresses]);
    const result = trustRelationRows.rows.map(o => {

      const truster_name = getDisplayName(o.truster_address);
      const truster_image = getAvatarUrl(o.truster_address);

      const trustee_name = getDisplayName(o.trustee_address);
      const trustee_image = getAvatarUrl(o.trustee_address);

      return `${o.truster_address},${truster_name},${truster_image},${o.trustee_address},${trustee_name},${trustee_image},${o.limit}`;
    }).join('\n');

    const header = `truster_address,truster_name,truster_image_url,trustee_address,trustee_name,truster_image_url,amount,block_number,limit\n`;
    const all = header + result;
    return all;
  }
}
