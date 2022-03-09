import DataLoader from "dataloader";
import {Invoice, InvoiceLine, Offer, ProfileEvent} from "../../types";
import {Environment} from "../../environment";
import {getDateWithOffset} from "../../utils/getDateWithOffset";

export type InvoicePaymentTransactionDataLoaderKey = {buyerAddress: string, transactionHash: string};

export const invoicePaymentTransactionDataLoader = new DataLoader<InvoicePaymentTransactionDataLoaderKey, ProfileEvent>(async (keys) => {
  const sql = `
      select *
      from crc_safe_timeline_2
      where transaction_hash = ANY ($1)
        and safe_address = ANY ($2)
        and direction = 'out';`;

  const safe_addresses = Object.keys(keys.reduce((p,c) => {
    p[c.buyerAddress] = true;
    return p;
  }, <{[x:string]:boolean}>{}));

  const transaction_hashes = Object.keys(keys.reduce((p,c) => {
    p[c.transactionHash] = true;
    return p;
  }, <{[x:string]:boolean}>{}));

  const eventRows = await Environment.indexDb.query(sql, [transaction_hashes, safe_addresses]);

  const eventsByTxHash:{[key:string]:ProfileEvent} = eventRows.rows.reduce((p,c) => {
    const ts = getDateWithOffset(c.timestamp);
    p[c.transaction_hash] = <ProfileEvent>{
      __typename: "ProfileEvent",
      safe_address: c.safe_address,
      contact_address: c.contact_address,
      type: c.type,
      block_number: c.block_number,
      direction: c.direction,
      timestamp: ts.toJSON(),
      value: c.value,
      transaction_hash: c.transaction_hash,
      transaction_index: c.transaction_index,
      payload: {
        __typename: c.type,
        transaction_hash: c.transaction_hash,
        ...(Array.isArray(c.payload) ? c.payload[0] : c.payload),
      },
    };
    return p;
  }, <{[key:string]:ProfileEvent}>{})

  return keys.map(o => eventsByTxHash[o.transactionHash]);
}, {
  cache: false
});