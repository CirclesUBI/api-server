import {Contact, ContactResolvers} from "../../types";
import {Context} from "../../context";
import {contactProfileDataLoader} from "../dataLoaders/contactProfileDataLoader";

export const contactPropertyResolver : ContactResolvers = {
  contactAddress_Profile: async (parent: Contact, args:any, context: Context) => {
    return await contactProfileDataLoader.load(parent.contactAddress);
  }
};