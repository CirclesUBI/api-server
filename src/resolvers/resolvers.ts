import {Organisation, Profile, Resolvers, Verification} from "../types";
import {queryResolvers} from "./queries/queryResolvers";
import {mutationResolvers} from "./mutations/mutationResolvers";
import {subscriptionResolvers} from "./subscriptions/subscriptionResolvers";
import {profilePropertyResolvers} from "./properties/profile";
import {contactPropertyResolver} from "./properties/contact";
import {purchasePropertyResolvers} from "./properties/purchase";
import {invoicePropertyResolver} from "./properties/invoice";
import {invoiceLinePropertyResolver} from "./properties/invoiceLine";
import {purchaseLinePropertyResolvers} from "./properties/purchaseLine";
import {claimedInvitationPropertyResolver} from "./properties/claimedInvitation";
import {profileEventPropertyResolver} from "./properties/profileEvent";
import {offerPropertyResolver} from "./properties/offer";
import {organisationPropertyResolver} from "./properties/organsiation";
import {GraphQLScalarType, Kind} from "graphql";
import {Context} from "../context";
import {verificationProfileDataLoader} from "./dataLoaders/verificationProfileDataLoader";

export const resolvers: Resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'A date and time value in JSON format.',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toJSON();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    }
  }),
  ...{
    Profile: profilePropertyResolvers,
    Contact: contactPropertyResolver,
    Purchase: purchasePropertyResolvers,
    Invoice: invoicePropertyResolver,
    InvoiceLine: invoiceLinePropertyResolver,
    PurchaseLine: purchaseLinePropertyResolvers,
    ClaimedInvitation: claimedInvitationPropertyResolver,
    ProfileEvent: profileEventPropertyResolver,
    Offer: offerPropertyResolver,
    Organisation: organisationPropertyResolver,
    Verification: {
      verifierProfile: async (parent:Verification, args:any, context:Context) => {
        if (!parent.verifierSafeAddress) {
          return null;
        }
        return <Promise<Organisation>><any>verificationProfileDataLoader.load(parent.verifierSafeAddress);
      },
      verifiedProfile: async (parent:Verification, args:any, context:Context) => {
        if (!parent.verifiedSafeAddress) {
          return null;
        }
        return <Promise<Profile>>verificationProfileDataLoader.load(parent.verifiedSafeAddress);
      }
    }
  },
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers
};