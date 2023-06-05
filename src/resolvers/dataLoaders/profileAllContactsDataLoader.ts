import DataLoader from "dataloader";
import {Contact, ContactFilter, Contacts} from "../../types";
import {ContactPoints, ContactsSource} from "../../querySources/aggregateSources/api/contactsSource";
import {CombinedAggregateSource} from "../../querySources/aggregateSources/combinedAggregateSource";

export const profileAllContactsDataLoader = (filter?:ContactFilter|null) => new DataLoader<string, Contact[]>(async (keys) => {
  const types:ContactPoints[] = [];
  if ((<any>filter?.contactSource.indexOf("CrcTrust")) > -1)  types.push(ContactPoints.CrcTrust);
  if ((<any>filter?.contactSource.indexOf("CrcHubTransfer")) > -1)  types.push(ContactPoints.CrcHubTransfer);
  if ((<any>filter?.contactSource.indexOf("Invitation")) > -1)        types.push(ContactPoints.Invitation);
  if ((<any>filter?.contactSource.indexOf("Erc20Transfers")) > -1)  types.push(ContactPoints.Erc20Transfers);
  if ((<any>filter?.contactSource.indexOf("MembershipOffer")) > -1)  types.push(ContactPoints.MembershipOffer);
  if ((<any>filter?.contactSource.indexOf("InvitationRedeemed")) > -1)  types.push(ContactPoints.InvitationRedeemed);
  if (types.length == 0) {
    types.push(ContactPoints.CrcTrust);
    types.push(ContactPoints.CrcHubTransfer);
    types.push(ContactPoints.Invitation);
    types.push(ContactPoints.Erc20Transfers);
    types.push(ContactPoints.MembershipOffer);
    types.push(ContactPoints.InvitationRedeemed);
  }
  const contactsSource = new ContactsSource(types);

  const src = new CombinedAggregateSource([contactsSource]);

  const result:{[x:string]:Contact[]} = {};
  for (let safeAddress of keys) {
    const contacts = await src.getAggregate(safeAddress);
    result[safeAddress] = (<Contacts>contacts[0].payload).contacts;
  }

  return keys.map(o => result[o]);
}, {
  cache: false
});