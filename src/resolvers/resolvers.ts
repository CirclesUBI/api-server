import {
  LeaderboardEntry,
  Organisation,
  Profile,
  Resolvers,

  Verification
} from "../types";
import {queryResolvers} from "./queries/queryResolvers";
import {mutationResolvers} from "./mutations/mutationResolvers";
import {subscriptionResolvers} from "./subscriptions/subscriptionResolvers";
import {profilePropertyResolvers} from "./properties/profile";
import {favoritePropertyResolvers} from "./properties/favorite";
import {contactPropertyResolver} from "./properties/contact";
import {claimedInvitationPropertyResolver} from "./properties/claimedInvitation";
import {profileEventPropertyResolver} from "./properties/profileEvent";
import {organisationPropertyResolver} from "./properties/organsiation";
import {GraphQLScalarType, Kind} from "graphql";
import {Context} from "../context";
import {verificationProfileDataLoader} from "./dataLoaders/verificationProfileDataLoader";
import {leaderboardEntryProfileDataLoader} from "./dataLoaders/leaderboardEntryProfileDataLoader";

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
    LeaderboardEntry: {
      createdByProfile: async (parent:LeaderboardEntry, args:any, context:Context) => {
        return leaderboardEntryProfileDataLoader.load(parent.createdByCirclesAddress);
      }
    },
    Profile: profilePropertyResolvers,
    Contact: contactPropertyResolver,
    ClaimedInvitation: claimedInvitationPropertyResolver,
    ProfileEvent: profileEventPropertyResolver,
    Organisation: organisationPropertyResolver,
    Favorite: favoritePropertyResolvers,
    Verification: {
      verifierProfile: async (parent:Verification, args:any, context:Context) => {
        if (!parent.verifierSafeAddress) {
          return null;
        }
        return <Promise<Organisation>><any>await verificationProfileDataLoader.load(parent.verifierSafeAddress);
      },
      verifiedProfile: async (parent:Verification, args:any, context:Context) => {
        if (!parent.verifiedSafeAddress) {
          return null;
        }
        return <Promise<Profile>>await verificationProfileDataLoader.load(parent.verifiedSafeAddress);
      }
    },
  },
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers
};