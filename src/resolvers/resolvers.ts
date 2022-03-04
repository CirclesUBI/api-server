import { myProfile, profilesBySafeAddress } from "./queries/profiles";
import { upsertProfileResolver } from "./mutations/upsertProfile";
import {
  AssetBalance, ClaimedInvitation,
  Contact,
  Invoice, InvoiceLine,
  Profile,
  ProfileOrigin,
  Purchase, PurchaseLine,
  Resolvers
} from "../types";
import { logout } from "./mutations/logout";
import { sessionInfo } from "./queries/sessionInfo";
import { authenticateAtResolver } from "./mutations/authenticateAt";
import { consumeDepositedChallengeResolver } from "./mutations/consumeDepositedChallenge";
import { search } from "./queries/search";
import { profilesCount } from "./queries/profilesCount";
import { requestUpdateSafe } from "./mutations/requestUpdateSafe";
import { updateSafe } from "./mutations/updateSafe";
import { whoami } from "./queries/whoami";
import { cities } from "./queries/citites";
import { version } from "./queries/version";
import { tags } from "./queries/tags";
import { tagById } from "./queries/tagById";
import { upsertTag } from "./mutations/upsertTag";
import { claimedInvitation } from "./queries/claimedInvitation";
import { Context } from "../context";
import { ApiPubSub } from "../utils/pubsub";
import { trustRelations } from "./queries/trustRelations";
import { commonTrust } from "./queries/commonTrust";
import { sendMessage } from "./mutations/sendMessage";
import { tagTransaction } from "./mutations/tagTransaction";
import { acknowledge } from "./mutations/acknowledge";
import { claimInvitation } from "./mutations/claimInvitation";
import { redeemClaimedInvitation } from "./mutations/redeemClaimedInvitation";
import { invitationTransaction } from "./queries/invitationTransaction";
import { verifySessionChallengeResolver } from "./mutations/verifySessionChallengeResolver";
import { organisations } from "./queries/organisations";
import { safeInfo } from "./queries/safeInfo";
import { hubSignupTransactionResolver } from "./queries/hubSignupTransactionResolver";
import { upsertOrganisation } from "./mutations/upsertOrganisation";
import { myInvitations } from "./queries/myInvitations";
import { organisationsByAddress } from "./queries/organisationsByAddress";
import { createTestInvitation } from "./mutations/createTestInvitation";
import { addMemberResolver } from "./mutations/addMember";
import { removeMemberResolver } from "./mutations/removeMember";
import { regionsResolver } from "./queries/regions";
import { findSafesByOwner } from "./queries/findSafesByOwner";
import { purchaseResolver } from "./mutations/purchase";
import { profileCityDataLoader } from "./data-loaders/profileCityDataLoader";
import { profileMembershipsDataLoader } from "./data-loaders/profileMembershipsDataLoader";
import { organisationMembersDataLoader } from "./data-loaders/organisationMembersDataLoader";
import { profilesById } from "./queries/profilesById";
import { aggregates } from "./queries/aggregates";
import { events } from "./queries/events";
import { directPath } from "./queries/directPath";
import { invoice } from "./queries/invoice";
import { offerCreatedByLoader } from "./data-loaders/offerCreatedByLoader";
import { requestSessionChallenge } from "./mutations/requestSessionChallenge";
import { importOrganisationsOfAccount } from "./mutations/importOrganisationsOfAccount";
import { completePurchase } from "./mutations/completePurchase";
import { completeSale } from "./mutations/completeSale";
import { revokeSafeVerification, verifySafe } from "./mutations/verifySafe";
import { verifications, verificationsCount } from "./queries/verifications";
import { Environment } from "../environment";
import { findInvitationCreator } from "./queries/findInvitationCreator";
import { recentProfiles } from "./queries/recentProfiles";
import {announcePayment} from "./mutations/announcePayment";
import {profileOffersDataLoader} from "./data-loaders/profileOffersDataLoader";
import {profileVerificationsDataLoader} from "./data-loaders/profileVerificationsDataLoader";
import {profilePurchasesDataLoader} from "./data-loaders/profilePurchasesDataLoader";
import {profileSalesDataLoader} from "./data-loaders/profileSalesDataLoader";
import {getDateWithOffset} from "../utils/getDateWithOffset";
import BN from "bn.js";
import {profileAllContactsDataLoader} from "./data-loaders/profileAllContactsDataLoader";
import {profilePublicContactsDataLoader} from "./data-loaders/profilePublicContactsDataLoader";
import {contactProfileDataLoader} from "./data-loaders/contactProfileDataLoader";
import {purchaseInvoicesDataLoader} from "./data-loaders/purchaseInvoicesDataLoader";
import {invoiceLinesDataLoader} from "./data-loaders/invoiceLinesDataLoader";
import {invoiceLineOfferDataLoader} from "./data-loaders/invoiceLineOfferDataLoader";
import {purchaseLinesDataLoader} from "./data-loaders/purchaseLinesDataLoader";
import {purchaseLineOfferDataLoader} from "./data-loaders/purchaseLineOfferDataLoader";
import {invoicePaymentTransactionDataLoader} from "./data-loaders/invoicePaymentTransactionDataLoader";
import {profileEventContactProfileDataLoader} from "./data-loaders/profileEventContactProfileDataLoader";
import {profileClaimedInvitationDataLoader} from "./data-loaders/profileClaimedInvitationDataLoader";
import {claimedInvitationCreatedByProfileDataLoader} from "./data-loaders/claimedInvitationCreatedByProfileDataLoader";
import {claimedInvitationClaimedByProfileDataLoader} from "./data-loaders/claimedInvitationClaimedByProfileDataLoader";
import {profileInvitationTransactionDataLoader} from "./data-loaders/profileInvitationTransactionDataLoader";
import {profileCirclesTokenAddressDataLoader} from "./data-loaders/profileCirclesTokenAddressDataLoader";

const packageJson = require("../../package.json");

function isOwnProfile(profileId:number, context:Context) : boolean {
  return !!context.session?.profileId && context.session.profileId == profileId;
}

export const resolvers: Resolvers = {
  Profile: {
    origin: (parent: Profile) => {
      return !parent.origin ? ProfileOrigin.Unknown : parent.origin;
    },
    emailAddress: async (parent: Profile, args:any, context:Context) =>
      isOwnProfile(parent.id, context)
      && parent.emailAddress
        ? parent.emailAddress
        : null,
    newsletter: async (parent: Profile, args:any, context:Context) =>
      isOwnProfile(parent.id, context)
      && parent.newsletter !== undefined
        ? parent.newsletter
        : null,
    city: async (parent: Profile) => {
      if (!parent.cityGeonameid) return null;
      return await profileCityDataLoader.load(parent.cityGeonameid);
    },
    memberships: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesAddress) {
        return [];
      }
      return await profileMembershipsDataLoader.load(parent.circlesAddress);
    },
    offers: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesAddress) {
        return [];
      }
      return await profileOffersDataLoader.load(parent.id);
    },
    verifications: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesAddress) {
        return [];
      }
      return await profileVerificationsDataLoader.load(parent.circlesAddress);
    },
    purchases: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesAddress || !isOwnProfile(parent.id, context)) {
        return [];
      }
      return await profilePurchasesDataLoader.load(parent.id);
    },
    sales: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesAddress || !isOwnProfile(parent.id, context)) {
        return [];
      }
      return await profileSalesDataLoader.load(parent.id);
    },
    balances: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesAddress) {
        return null;
      }

      const crcBalancesPromise = Environment.indexDb.query(`
        select last_change_at, token, token_owner, balance
        from crc_balances_by_safe_and_token_2
        where safe_address = $1
        order by balance desc;`,
        [parent.circlesAddress.toLowerCase()]);

      const erc20BalancesPromise = Environment.indexDb.query(`
       select safe_address
            , token
            , balance
            , last_changed_at
       from erc20_balances_by_safe_and_token
       where safe_address = $1;`,
        [parent.circlesAddress.toLowerCase()]);

      const queryResults = await Promise.all([crcBalancesPromise, erc20BalancesPromise]);
      const crcBalancesResult = queryResults[0];
      const erc20BalancesResult = queryResults[1];

      const crcLastChangeAt = crcBalancesResult.rows.reduce((p,c) => Math.max(new Date(c.last_change_at).getTime(), p) ,0);
      const crcLastChangeAtTs = getDateWithOffset(crcLastChangeAt);

      const ercLastChangeAt = crcBalancesResult.rows.reduce((p,c) => Math.max(new Date(c.last_change_at).getTime(), p) ,0);
      const ercLastChangeAtTs = getDateWithOffset(ercLastChangeAt);

      return {
        crcBalances: {
          __typename: "CrcBalances",
          lastUpdatedAt: crcLastChangeAtTs.toJSON(),
          total: crcBalancesResult.rows.reduce((p,c) => p.add(new BN(c.balance)), new BN("0")).toString(),
          balances: crcBalancesResult.rows.map((o: any) => {
            return <AssetBalance> {
              token_owner_profile: null,
              token_symbol: "CRC",
              token_address: o.token,
              token_owner_address: o.token_owner,
              token_balance: o.balance
            }
          })
        },
        erc20Balances:{
          __typename: "Erc20Balances",
          lastUpdatedAt: ercLastChangeAtTs.toJSON(),
          balances: erc20BalancesResult.rows.map((o: any) => {
            return <AssetBalance> {
              token_address: o.token,
              token_owner_address: "0x0000000000000000000000000000000000000000",
              token_symbol: "erc20",
              token_balance: o.balance
            }
          })
        }
      }
    },
    contacts: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesAddress) {
        return [];
      }
      if (!isOwnProfile(parent.id, context)) {
        return await profilePublicContactsDataLoader.load(parent.circlesAddress);
      } else {
        return await profileAllContactsDataLoader.load(parent.circlesAddress);
      }
    },
    claimedInvitation: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesAddress || !isOwnProfile(parent.id, context)) {
        return null;
      }
      return await profileClaimedInvitationDataLoader.load(parent.id);
    },
    invitationTransaction: async (parent: Profile, args, context: Context) => {
      if (!parent.circlesSafeOwner || !isOwnProfile(parent.id, context)) {
        return null;
      }
      return await profileInvitationTransactionDataLoader.load(parent.circlesSafeOwner);
    },
    circlesTokenAddress: async (parent:Profile, args, context) => {
      if (!parent.circlesAddress) {
        return null;
      }
      return await profileCirclesTokenAddressDataLoader.load(parent.circlesAddress);
    },
    displayName: (parent:Profile, args, context) => {
      return parent.firstName.trim() == ""
        ? parent.circlesAddress ?? ""
        : `${parent.firstName}${parent.lastName ? " " + parent.lastName : ""}`;
    }
  },
  Contact: {
    contactAddress_Profile: async (parent: Contact, args, context: Context) => {
      return await contactProfileDataLoader.load(parent.contactAddress);
    }
  },
  Purchase: {
    invoices: async (parent: Purchase, args: any, context: Context) => {
      return purchaseInvoicesDataLoader.load(parent.id);
    },
    lines: async (parent: Purchase, args: any, context: Context) => {
      return purchaseLinesDataLoader.load(parent.id);
    }
  },
  Invoice: {
    lines: async (parent: Invoice, args: any, context: Context) => {
      return invoiceLinesDataLoader.load(parent.id);
    },
    paymentTransaction: async (parent: Invoice, args: any, context: Context) => {
      if (!parent.paymentTransactionHash){
        return null;
      }
      return invoicePaymentTransactionDataLoader.load({
        buyerAddress: parent.buyerAddress,
        transactionHash: parent.paymentTransactionHash
      });
    },
  },
  InvoiceLine: {
    offer: async (parent: InvoiceLine, args: any, context: Context) => {
      return invoiceLineOfferDataLoader.load(parent.id);
    }
  },
  PurchaseLine: {
    offer: async (parent: PurchaseLine, args: any, context: Context) => {
      return purchaseLineOfferDataLoader.load(parent.id);
    }
  },
  ClaimedInvitation: {
    createdBy: async (parent: ClaimedInvitation, args: any, context: Context) => {
      return claimedInvitationCreatedByProfileDataLoader.load(parent.createdByProfileId);
    },
    claimedBy:async (parent: ClaimedInvitation, args: any, context: Context) => {
      return claimedInvitationClaimedByProfileDataLoader.load(parent.claimedByProfileId);
    }
  },
  ProfileEvent: {
    contact_address_profile: async (parent, args, context) => {
      if (!parent.contact_address)
      {
        return null;
      }
      return profileEventContactProfileDataLoader.load(parent.contact_address);
    },
  },
  Offer: {
    createdByProfile: async (parent, args, context) => {
      return offerCreatedByLoader.load(parent.createdByAddress);
    },
  },
  Organisation: {
    members: async (parent, args, context) => {
      return organisationMembersDataLoader.load(parent.id);
    },
  },
  Query: {
    sessionInfo: sessionInfo,
    whoami: whoami,
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
    profilesCount: profilesCount(Environment.readonlyApiDb),
    verificationsCount: verificationsCount(Environment.readWriteApiDb),
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
  },
  Mutation: {
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
    announcePayment: announcePayment()
  },
  Subscription: {
    events: {
      subscribe: async function subscribe(parent:any, args:any, context: Context) : Promise<AsyncIterable<any>> {
        const callerInfo = await context.callerInfo;
        if (!callerInfo?.profile && !callerInfo?.session.ethAddress)
          throw new Error(`You need a registration to subscribe`);

        const subscriberInfo = callerInfo.profile?.circlesAddress
          ? "subscriber circlesAddress: " + callerInfo.profile?.circlesAddress
          : "subscriber ethAddress: " + callerInfo.session.ethAddress;

        console.log(
          `-->: [${new Date().toJSON()}] [${Environment.instanceId}] [${context.session?.id}] [${context.id}] [${context.ipAddress}] [Subscription.events.subscribe]: ${subscriberInfo}`
        );

        const subscriptionIterable = class implements AsyncIterable<any> {
          readonly address:string;
          constructor(address:string) {
            this.address = address;
          }
          [Symbol.asyncIterator](): AsyncIterator<any> {
            return ApiPubSub.instance.pubSub.asyncIterator([
              `events_${this.address}`
            ]);
          }
        };

        if (!callerInfo.profile?.circlesAddress && callerInfo.session.ethAddress) {
          return new subscriptionIterable(callerInfo.session.ethAddress.toLowerCase());
        } else if (callerInfo.profile?.circlesAddress) {
          return new subscriptionIterable(callerInfo.profile?.circlesAddress.toLowerCase());
        }

        console.error(`Err: [${new Date().toJSON()}] [${Environment.instanceId}] [${context.id}] [${context.ipAddress}] [Subscription.events]: Cannot subscribe without an eoa- or safe-address`);
        throw new Error(`Cannot subscribe without an eoa- or safe-address.`);
      },
    },
  },
};
