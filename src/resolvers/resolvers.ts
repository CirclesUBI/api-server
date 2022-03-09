import {Resolvers} from "../types";
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

export const resolvers: Resolvers = {
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
    Organisation: organisationPropertyResolver
  },
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers
};