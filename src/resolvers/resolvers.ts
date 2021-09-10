import {profiles} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_api_ro, prisma_api_rw} from "../apiDbClient";
import {Profile, ProfileEvent, Resolvers, TrustDirection} from "../types";
import {exchangeTokenResolver} from "./mutations/exchangeToken";
import {logout} from "./mutations/logout";
import {sessionInfo} from "./queries/sessionInfo";
import {depositChallengeResolver} from "./mutations/depositChallenge";
import {authenticateAtResolver} from "./mutations/authenticateAt";
import {consumeDepositedChallengeResolver} from "./mutations/consumeDepositedChallenge";
import {search} from "./queries/search";
import {upsertOfferResolver} from "./mutations/upsertOffer";
import {requestUpdateSafe} from "./mutations/requestUpdateSafe";
import {updateSafe} from "./mutations/updateSafe";
import {profileOffers} from "./profile/offers";
import {profileCity} from "./profile/city";
import {offerCreatedBy} from "./offer/createdBy";
import {offerCity} from "./offer/city";
import {whoami} from "./queries/whoami";
import {cities} from "./queries/citites";
import {version} from "./queries/version";
import {offers} from "./queries/offers";
import {offerCategoryTag} from "./offer/offerCategoryTag";
import {offerDeliveryTermsTag} from "./offer/offerDeliveryTermsTag";
import {offerUnitTag} from "./offer/offerUnitTag";
import {tags} from "./queries/tags";
import {stats} from "./queries/stats";
import {tagById} from "./queries/tagById";
import {upsertTag} from "./mutations/upsertTag";
import {claimedInvitation} from "./queries/claimedInvitation";
import {Context} from "../context";
import {ApiPubSub} from "../pubsub";
import {PoolConfig} from "pg";

const { Pool} = require('pg')
const pool = new Pool(<PoolConfig>{
  connectionString: process.env.BLOCKCHAIN_INDEX_DB_CONNECTION_STRING
});

const packageJson = require("../../package.json");

const profileCache: { [safeAddress: string]: Profile } = {};


async function queryEvents(
  context:Context,
  safeAddress?: string,
  transactionHash?:string,
  types?: string[])
{
  const validTypes: { [x: string]: boolean } = {
    "crc_signup": true,
    "crc_hub_transfer": true,
    "crc_trust": true,
    "crc_minting": true,
    "eth_transfer": true,
    "gnosis_safe_eth_transfer": true
  };

  let selectedTypes: string[];
  if (!types) {
    selectedTypes = Object.keys(validTypes);
  } else {
    selectedTypes = types.filter(o => validTypes[o]);
  }

  if (!safeAddress && !transactionHash) {
    throw new Error(`One of the two parameters have to be specified: 'safeAddress', transactionHash`);
  }

  const transactionsQuery = `select transaction_id
                      , timestamp
                      , block_number
                      , transaction_index
                      , transaction_hash
                      , type
                      , safe_address
                      , direction
                      , value
                      , obj as payload
                   from crc_safe_timeline
                   where ((safe_address != '' and safe_address = lower($1)) or $1 = '')
                     and type=ANY($2)
                     and (($3 != '' and transaction_hash = $3) or ($3 = ''))
                   order by timestamp;`;

  const transactionsQueryParameters = [safeAddress?.toLowerCase() ?? "", selectedTypes, transactionHash ?? ""];
  const timeline = await pool.query(transactionsQuery, transactionsQueryParameters);
  const classify = (row: any) => {
    switch (row.type) {
      case "crc_hub_transfer":
        row.payload.__typename = "CrcHubTransfer";
        return "CrcHubTransfer";
      case "crc_organisation_signup":
        row.payload.__typename = "CrcTrust";
        return "CrcTrust";
      case "crc_signup":
        row.payload.__typename = "CrcSignup";
        return "CrcSignup";
      case "crc_trust":
        row.payload.__typename = "CrcTrust";
        return "CrcTrust";
      case "crc_minting":
        row.payload.__typename = "CrcMinting";
        return "CrcMinting";
      case "eth_transfer":
        row.payload.__typename = "EthTransfer";
        return "EthTransfer";
      case "gnosis_safe_eth_transfer":
        row.payload.__typename = "GnosisSafeEthTransfer";
        return "GnosisSafeEthTransfer";
      default:
        return null;
    }
  };

  const allSafeAddressesDict: { [safeAddress: string]: any } = {};
  timeline.rows
    .filter((o: ProfileEvent) => classify(o) != null)
    .forEach((o: ProfileEvent) => {
      const payload = o.payload;
      if (!payload || !payload.__typename) {
        return;
      }
      switch (payload.__typename) {
        case "CrcSignup":
          allSafeAddressesDict[payload.user] = null;
          break;
        case "CrcTrust":
          allSafeAddressesDict[payload.address] = null;
          allSafeAddressesDict[payload.can_send_to] = null;
          break;
        case "CrcTokenTransfer":
          allSafeAddressesDict[payload.from] = null;
          allSafeAddressesDict[payload.to] = null;
          break;
        case "CrcHubTransfer":
          allSafeAddressesDict[payload.from] = null;
          allSafeAddressesDict[payload.to] = null;
          payload.transfers.forEach(t => {
            allSafeAddressesDict[t.from] = null;
            allSafeAddressesDict[t.to] = null;
          });
          break;
        case "CrcMinting":
          allSafeAddressesDict[payload.from] = null;
          allSafeAddressesDict[payload.to] = null;
          break;
        case "EthTransfer":
          allSafeAddressesDict[payload.from] = null;
          allSafeAddressesDict[payload.to] = null;
          break;
        case "GnosisSafeEthTransfer":
          allSafeAddressesDict[payload.from] = null;
          allSafeAddressesDict[payload.to] = null;
          break;
      }
    });

  const allSafeAddressesArr = Object.keys(allSafeAddressesDict)
    .map(o => o.toLowerCase());

  const allCirclesLandProfiles = await profiles(prisma_api_ro)(null, {query: {circlesAddress: allSafeAddressesArr}}, context);
  const allCirclesLandProfilesBySafeAddress: { [safeAddress: string]: Profile } = {};
  allCirclesLandProfiles.forEach(p => {
    if (!p.circlesAddress)
      return;

    allCirclesLandProfilesBySafeAddress[p.circlesAddress.toLowerCase()] = p;
  });
  const nonCirclesLandAddresses = allSafeAddressesArr.filter(o => !allCirclesLandProfilesBySafeAddress[o]);

  timeline.rows
    .filter((o: ProfileEvent) => classify(o) != null)
    .forEach((o: ProfileEvent) => {
      const payload = o.payload;
      if (!payload || !payload.__typename) {
        return;
      }
      switch (payload.__typename) {
        case "CrcSignup":
          payload.user_profile = allCirclesLandProfilesBySafeAddress[payload.user];
          break;
        case "CrcTrust":
          payload.address_profile = allCirclesLandProfilesBySafeAddress[payload.address];
          payload.can_send_to_profile = allCirclesLandProfilesBySafeAddress[payload.can_send_to];
          break;
        case "CrcTokenTransfer":
          payload.from_profile = allCirclesLandProfilesBySafeAddress[payload.from];
          payload.to_profile = allCirclesLandProfilesBySafeAddress[payload.to];
          break;
        case "CrcHubTransfer":
          payload.from_profile = allCirclesLandProfilesBySafeAddress[payload.from];
          payload.to_profile = allCirclesLandProfilesBySafeAddress[payload.to];
          payload.transfers.forEach(t => {
            t.from_profile = allCirclesLandProfilesBySafeAddress[t.from];
            t.to_profile = allCirclesLandProfilesBySafeAddress[t.to];
          });
          break;
        case "CrcMinting":
          payload.from_profile = allCirclesLandProfilesBySafeAddress[payload.from];
          payload.to_profile = allCirclesLandProfilesBySafeAddress[payload.to];
          break;
        case "EthTransfer":
          payload.from_profile = allCirclesLandProfilesBySafeAddress[payload.from];
          payload.to_profile = allCirclesLandProfilesBySafeAddress[payload.to];
          break;
        case "GnosisSafeEthTransfer":
          payload.from_profile = allCirclesLandProfilesBySafeAddress[payload.from];
          payload.to_profile = allCirclesLandProfilesBySafeAddress[payload.to];
          break;
      }
    });

  return timeline.rows
    .filter((o: any) => classify(o) != null)
    .map((o: any) => {
      return <ProfileEvent>{
        __typename: "ProfileEvent",
        id: o.id,
        safe_address: o.safe_address,
        safe_address_profile: allCirclesLandProfilesBySafeAddress[o.safe_address],
        type: o.type,
        block_number: o.block_number,
        direction: o.direction,
        timestamp: o.timestamp,
        value: o.value,
        transaction_hash: o.transaction_hash,
        transaction_index: o.transaction_index,
        payload: {
          __typename: classify(o),
          ...o.payload
        }
      }
    })
}

export const resolvers: Resolvers = {
  Profile: {
    offers: profileOffers(prisma_api_ro),
    city: profileCity
  },
  Offer: {
    createdBy: offerCreatedBy(prisma_api_ro),
    categoryTag: offerCategoryTag(prisma_api_ro),
    deliveryTermsTag: offerDeliveryTermsTag(prisma_api_ro),
    unitTag: offerUnitTag(prisma_api_ro),
    city: offerCity
  },
  ClaimedInvitation: {
    createdBy: (parent, args, context) => {
      throw new Error(`Not implemented`);
    },
    claimedBy: (parent, args, context) => {
      throw new Error(`Not implemented`);
    }
  },
  ProfileEvent: {},
  Query: {
    sessionInfo: sessionInfo,
    whoami: whoami,
    cities: cities,
    claimedInvitation: claimedInvitation,
    profiles: profiles(prisma_api_ro),
    search: search(prisma_api_ro),
    version: version(packageJson),
    offers: offers(prisma_api_ro),
    tags: tags(prisma_api_ro),
    tagById: tagById(prisma_api_ro),
    stats: stats(prisma_api_ro),
    events: async (parent, args, context) => {
      const safeAddress = args.safeAddress.toLowerCase();
      return await queryEvents(context, (safeAddress ?? undefined), undefined, args.types ?? undefined);
    },
    eventByTransactionHash: async (parent, args, context) => {
      const safeAddress = args.safeAddress.toLowerCase();
      return await queryEvents(context, safeAddress, args.transactionHash, args.types ?? undefined);
    },
    balance: async (parent, args, context) => {
      const safeAddress = args.safeAddress.toLowerCase();
      const balanceQuery = `
        select *
        from crc_balances_by_safe
        where safe_address = $1;`;
      const balanceQueryParameters = [safeAddress];
      const balanceResult = await pool.query(balanceQuery, balanceQueryParameters);
      if (balanceResult.rows == 0) {
        return "0";
      }
      return balanceResult.rows[0].balance;
    },
    trustRelations: async (parent, args, context) => {
      const safeAddress = args.safeAddress.toLowerCase();

      const trustQuery = `select "user"
                               , "can_send_to"
                          from crc_current_trust
                          where ("user" = $1
                              or "can_send_to" = $1)
                            and "limit" > 0;`;

      const trustQueryParameters = [safeAddress];
      const trustQueryResult = await pool.query(trustQuery, trustQueryParameters);

      const trusting:{[safeAddress:string]:boolean} = {};
      trustQueryResult.rows
        .filter((o:any) => o.can_send_to == safeAddress)
        .forEach((o:any) => trusting[o.user] = true);

      const trustedBy:{[safeAddress:string]:boolean} = {};
      trustQueryResult.rows
        .filter((o:any) => o.user == safeAddress)
        .forEach((o:any) => trustedBy[o.can_send_to] = true);

      const allSafeAddresses:{[safeAddress:string]:boolean} = {};
      Object.keys(trusting)
        .concat(Object.keys(trustedBy))
        .forEach(o => allSafeAddresses[o] = true);

      const allCirclesLandProfiles = await profiles(prisma_api_ro)(null, {
        query: {circlesAddress: Object.keys(allSafeAddresses)}
      }, context);

      const allCirclesLandProfilesBySafeAddress: { [safeAddress: string]: Profile } = {};
      allCirclesLandProfiles.forEach(p => {
        if (!p.circlesAddress)
          return;

        allCirclesLandProfilesBySafeAddress[p.circlesAddress.toLowerCase()] = p;
      });

      return Object.keys(allSafeAddresses)
        .map(o => {
          return {
            safeAddress: safeAddress,
            safeAddressProfile: allCirclesLandProfilesBySafeAddress[safeAddress],
            otherSafeAddress: o,
            otherSafeAddressProfile: allCirclesLandProfilesBySafeAddress[o],
            direction: trusting[o] && trustedBy[o]
              ? TrustDirection.Mutual
              : (
                trusting[o]
                ? TrustDirection.Out
                : TrustDirection.In
              )
          }
        })
        .filter(o => o.safeAddress != o.otherSafeAddress);
    },
    contacts: async (parent, args, context) => {
      const safeAddress = args.safeAddress.toLowerCase();

      const contactsQuery = `WITH safe_contacts AS (
          SELECT distinct max(b.timestamp) ts,
                          crc_signup."user",
                          case when cht.from = crc_signup."user" then cht."to" else cht."from" end as contact
          FROM crc_hub_transfer cht
                   JOIN crc_signup ON crc_signup."user" = cht."from" OR crc_signup."user" = cht."to"
                   JOIN transaction t ON cht.transaction_id = t.id
                   JOIN block b ON t.block_number = b.number
          group by cht."from", crc_signup."user", cht."to"
          UNION ALL
          SELECT distinct max(b.timestamp),
                          crc_signup."user",
                          case when ct.can_send_to = crc_signup."user" then ct."address" else ct."can_send_to" end as contact
          FROM crc_trust ct
                   JOIN crc_signup ON crc_signup."user" = ct.address OR crc_signup."user" = ct.can_send_to
                   JOIN transaction t ON ct.transaction_id = t.id
                   JOIN block b ON t.block_number = b.number
          group by ct."can_send_to", ct."address", crc_signup."user"
      )
                          SELECT max(st.ts) as last_contact_timestamp,
                                 st."user" AS safe_address,
                                 contact
                          FROM safe_contacts st
                          WHERE st."user" = $1
                          group by st."user", contact
                          order by max(st.ts) desc;`;

      const contactsQueryParameters = [safeAddress];
      const contactsQueryResult = await pool.query(contactsQuery, contactsQueryParameters);

      return contactsQueryResult.rows.map((o:any) => {
        return {
          safeAddress,
          safeAddressProfile: <Profile>{
            id: 0,
            firstName: safeAddress.substr(0, 10),
            lastName: safeAddress.substr(0, 10),
            circlesAddress: safeAddress,
            avatarUrl: null
          },
          contactAddress: o.contact,
          contactAddressProfile: <Profile>{
            id: 0,
            firstName: o.contact.substr(0, 10),
            lastName: o.contact.substr(0, 10),
            circlesAddress: o.contact,
            avatarUrl: null
          }
        };
      });
    }
    // transactions: transactions(prisma_api_ro),
    // events: events(prisma_api_ro),
    /*
    invitationTransaction: async (parent: any, args: any, context:Context) => {
        // TODO: Find the transaction from the "invitation EOA" to the user's EOA (must be the only outgoing transaction from the invite-eoa)
        const session = await context.verifySession()
        if (!session.profileId) {
            throw new Error(`The session has not profile associated.`);
        }
        const profile = await prisma_api_ro.profile.findUnique({
            where: {id: session.profileId},
            include: {
                claimedInvitations: {
                    include: {
                        indexedTransactions: {
                            include: {
                                inviteTransaction: true
                            }
                        }
                    }
                }
            }
        });
        if (!profile) {
            throw new Error(`Couldn't find a profile with id ${session.profileId}`);
        }
        if (!profile.circlesSafeOwner) {
            throw new Error(`The profile with the id ${session.profileId} has no EOA.`)
        }
        if (!profile.claimedInvitations.length) {
            throw new Error(`Profile ${session.profileId} has no claimed invitation so there can be no invitation transactions`);
        }
        const claimedInvitation = profile.claimedInvitations[0];
        if (!claimedInvitation.indexedTransactions.length) {

            return null;
        }

        const inviteTransactionRequest = claimedInvitation.indexedTransactions[0];
        if (!inviteTransactionRequest.inviteTransaction) {
            return null;
        }

        return inviteTransactionRequest.inviteTransaction;
    },
    safeFundingTransaction: async (parent: any, args: any, context:any) => {
        return null;
    }*/
  },
  Mutation: {
    upsertOffer: upsertOfferResolver(prisma_api_rw),
    exchangeToken: exchangeTokenResolver(prisma_api_rw),
    logout: logout(prisma_api_rw),
    upsertProfile: upsertProfileResolver(prisma_api_rw),
    authenticateAt: authenticateAtResolver(prisma_api_rw),
    depositChallenge: depositChallengeResolver(prisma_api_rw),
    consumeDepositedChallenge: consumeDepositedChallengeResolver(prisma_api_rw),
    requestUpdateSafe: requestUpdateSafe(prisma_api_rw),
    updateSafe: updateSafe(prisma_api_rw),
    upsertTag: upsertTag(prisma_api_ro, prisma_api_rw),


    // requestIndexTransaction: requestIndexTransaction(prisma_api_rw),
    // acknowledge: acknowledge(prisma_api_rw),
    /*
    claimInvitation: claimInvitation(prisma_api_rw),
    redeemClaimedInvitation: async (parent, args, context) => {
        const session = await context.verifySession();
        const claimedInvitation = await prisma_api_ro.invitation.findFirst({
            where: {
                claimedByProfileId: session.profileId
            }
        });

        if (!claimedInvitation) {
            throw new Error(`No claimed invitation for profile ${session.profileId}`);
        }



        throw new Error(`Not implemented`);
    }
     */
  },
  Subscription: {
    events: {
      resolve: async (parent: ProfileEvent[], args: any, context: Context) => {
        //const session = await context.verifySession();
        /*if (!session.profileId) {
          throw new Error(`You must have a profile before you can use the stream.`)
        }
        const profile = await prisma_api_ro.profile.findUnique({
          where: {
            id: session.profileId
          }
        });
        if (!profile) {
          throw new Error(`You must have a profile before you can use the stream.`)
        }*/

        const profile = {
          circlesAddress: "0xde374ece6fa50e781e81aac78e811b33d16912c7"
        }

        const eventsByAddress: { [x: string]: ProfileEvent[] } = {};
        parent.forEach(event => {
          // Filter all events that do not concern this client
          if (profile.circlesAddress != event.safe_address)
            return;
          if (!eventsByAddress[event.safe_address])
            eventsByAddress[event.safe_address] = [];
          eventsByAddress[event.safe_address].push(event);
        });

        const involvedAddresses:{[x:string]:unknown} = {};
        Object.values(eventsByAddress)
          .flatMap(o => o)
          .forEach(event => {
            if (!event.payload) {
              return;
            }
            if (event.payload.__typename === "CrcHubTransfer") {
              involvedAddresses[event.payload.from] = null;
              involvedAddresses[event.payload.to] = null;
            } else if (event.payload.__typename === "CrcMinting") {
              involvedAddresses[event.payload.to] = null;
            } else if (event.payload.__typename === "CrcSignup") {
              involvedAddresses[event.payload.user] = null;
            } else if (event.payload.__typename === "CrcTokenTransfer") {
              involvedAddresses[event.payload.from] = null;
              involvedAddresses[event.payload.to] = null;
            } else if (event.payload.__typename === "CrcTrust") {
              involvedAddresses[event.payload.address] = null;
              involvedAddresses[event.payload.can_send_to] = null;
            } else if (event.payload.__typename === "EthTransfer") {
              involvedAddresses[event.payload.from] = null;
              involvedAddresses[event.payload.to] = null;
            } else if (event.payload.__typename === "GnosisSafeEthTransfer") {
              involvedAddresses[event.payload.from] = null;
              involvedAddresses[event.payload.to] = null;
            }
          });

        const safeAddresses = Object.keys(involvedAddresses);
        console.log(`Got events for ${safeAddresses.length} safes`);

        try {
          return parent;
        } catch (e) {
          console.warn(e);
          return [];
        }
      },
      subscribe: () => ApiPubSub.instance.pubSub.asyncIterator(["event"])
    }
  }
};
