import DataLoader from "dataloader";
import {Contact, Contacts} from "../../types";
import {ContactPoints, ContactsSource} from "../../querySources/aggregateSources/api/contactsSource";

export const profileAllContactsDataLoader = new DataLoader<string, Contact[]>(async (keys) => {
  const contactsSource = new ContactsSource([
    ContactPoints.ChatMessage,
    ContactPoints.CrcTrust,
    ContactPoints.CrcHubTransfer,
    ContactPoints.Invitation,
    ContactPoints.Erc20Transfers,
    ContactPoints.MembershipOffer,
    ContactPoints.InvitationRedeemed
  ])

  const result:{[x:string]:Contact[]} = {};
  for (let safeAddress of keys) {
    const contacts = await contactsSource.getAggregate(safeAddress);
    result[safeAddress] = (<Contacts>contacts[0].payload).contacts;
  }

  return keys.map(o => result[o]);
});