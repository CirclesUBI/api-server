import DataLoader from "dataloader";
import {Contact, ContactFilter, Contacts} from "../../types";
import {ContactPoints, ContactsSource} from "../../querySources/aggregateSources/api/contactsSource";
import {CombinedAggregateSource} from "../../querySources/aggregateSources/combinedAggregateSource";

export const profilePublicContactsDataLoader = (filter?:ContactFilter|null) => new DataLoader<string, Contact[]>(async (keys) => {
  const types:ContactPoints[] = [];
  if ((<any>filter?.contactSource.indexOf("CrcTrust")) > -1) types.push(ContactPoints.CrcTrust);
  if ((<any>filter?.contactSource.indexOf("CrcHubTransfer")) > -1) types.push(ContactPoints.CrcHubTransfer);
  if ((<any>filter?.contactSource.indexOf("Erc20Transfers")) > -1) types.push(ContactPoints.Erc20Transfers);
  if (types.length == 0) {
    types.push(ContactPoints.CrcTrust);
    types.push(ContactPoints.CrcHubTransfer)
    types.push(ContactPoints.Erc20Transfers)
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