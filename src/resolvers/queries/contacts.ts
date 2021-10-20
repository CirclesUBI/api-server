import { Context } from "../../context";
import { profilesBySafeAddress, ProfilesBySafeAddressLookup } from "./profiles";
import { PrismaClient } from "../../api-db/client";
import { getPool } from "../resolvers";
import {Contact, Maybe, PaginationArgs, ProfileEvent, QueryContactsArgs} from "../../types";
import { Pool } from "pg";
import { events } from "./queryEvents";

export type LastEvent = {
  timestamp: string;
  address1: string;
  address2: string;
  block_number: number;
  transaction_index: number;
  transaction_hash: string;
  type: string;
  direction: string;
  value: string;
  obj: any;
};

export async function lastEvents(
  safeAddress: string,
  contactAddresses: string[],
  externalPool?: Pool
): Promise<LastEvent[]> {
  const sql = `
      with addresses as (
          select unnest($2::text[]) as address2
      ), a as (
          select $1::text as address1, a.address2, 'crc_trust' as type, t.block_number, t.index,  t.hash as transaction_hash
          from addresses a
                   join crc_trust_2 ct on ($1 = ct.address or $1 = ct.can_send_to)
              and (a.address2 = ct.address or a.address2 = ct.can_send_to)
                   join transaction_2 t on ct.hash = t.hash
      ), b as (
          select $1::text as address1, a.address2, 'crc_hub_transfer' as type, t.block_number, t.index, t.hash as transaction_hash
          from addresses a
                   join crc_hub_transfer_2 cht on ($1 = cht."from" or $1 = cht."to")
              and (a.address2 = cht."from" or a.address2 = cht."to")
                   join transaction_2 t on cht.hash = t.hash
      ), c as (
          select *
          from a
          union all
          select *
          from b
      ), d as (
          select address1, address2, max(block_number) max_block, max(index) max_index, max(c.transaction_hash) transaction_hash
          from c
          group by address1, address2
      ), safe_timeline as (
          select b.timestamp
               , d.address1
               , d.address2
               , b.number
               , t.index
               , t.hash
               , 'crc_hub_transfer' as type
               , crc_signup_2."user"
               , case
                     when cht."from" = crc_signup_2."user" and cht."to" = crc_signup_2."user" then 'self'
                     when cht."from" = crc_signup_2."user" then 'out'
                     else 'in' end  as direction
               , cht.value
               , (select row_to_json(_steps)
                  from (
                           select t."hash"         "transactionHash",
                                  ht."from"        "from",
                                  ht."to"          "to",
                                  ht."value"::text flow,
                                  (select json_agg(steps) transfers
                                   from (
                                            select E20T."from"           "from",
                                                   E20T."to"             "to",
                                                   E20T."token"          "token",
                                                   E20T."value"::text as "value"
                                            from crc_token_transfer_2 E20T
                                            where E20T.hash = t.hash
                                        ) steps)
                           from transaction_2 t
                                    join crc_hub_transfer_2 ht on t.hash = ht.hash
                           where t.hash = cht.hash
                       ) _steps)
                                    as obj
          from crc_hub_transfer_2 cht
                   join crc_signup_2 on crc_signup_2."user" = cht."from" or crc_signup_2."user" = cht."to"
                   join transaction_2 t on cht.hash = t.hash
                   join block b on t.block_number = b.number
                   join d on d.transaction_hash = t.hash and crc_signup_2."user" = d.address1
          union all
          select b.timestamp
               , d.address1
               , d.address2
               , b.number
               , t.index
               , t.hash
               , 'crc_trust'       as type
               , crc_signup_2."user"
               , case
                     when ct.can_send_to = crc_signup_2."user" and ct.address = crc_signup_2."user" then 'self'
                     when ct.can_send_to = crc_signup_2."user" then 'out'
                     else 'in' end as direction
               , ct."limit"
               , row_to_json(ct)      obj
          from crc_trust_2 ct
                   join crc_signup_2 on crc_signup_2."user" = ct.address or crc_signup_2."user" = ct.can_send_to
                   join transaction_2 t on ct.hash = t.hash
                   join block b on t.block_number = b.number
                   join d on d.transaction_hash = t.hash and crc_signup_2."user" = d.address1
      )
      select timestamp
           , address1
           , address2
           , number block_number
           , index transaction_index
           , hash transaction_hash
           , type
           , "user" safe_address
           , direction
           , value
           , st.obj as obj
      from safe_timeline st;`;

  let pool: Pool | null = null;
  try {
    pool = externalPool ?? getPool();
    const queryParameters = [safeAddress, contactAddresses];
    const queryResult = await pool.query(sql, queryParameters);
    return queryResult.rows.map((row) => {
      return {
        timestamp: (<Date>row.timestamp).toJSON(),
        address1: row.address1,
        address2: row.address2,
        block_number: row.block_number,
        transaction_index: row.transaction_index,
        transaction_hash: row.transaction_hash,
        type: row.type,
        direction: row.direction,
        value: row.value,
        obj: row.obj,
      };
    });
  } finally {
    if (!externalPool) {
      pool?.end();
    }
  }
}

export function contacts(
  prisma: PrismaClient,
  resolveProfiles: boolean = false
) {
  return async (
    parent: any,
    args: QueryContactsArgs,
    context: Context
  ) => {
    const pool = getPool();
    try {
      const safeAddress = args.safeAddress.toLowerCase();

      const contactsQuery = `
          WITH safe_contacts AS (
              SELECT distinct max(b.timestamp)                                                            ts,
                              crc_signup_2."user",
                              case when cht.from = crc_signup_2."user" then cht."to" else cht."from" end as contact
              FROM crc_hub_transfer_2 cht
                       JOIN crc_signup_2 ON crc_signup_2."user" = cht."from" OR crc_signup_2."user" = cht."to"
                       JOIN transaction_2 t ON cht.hash = t.hash
                       JOIN block b ON t.block_number = b.number
              group by cht."from", crc_signup_2."user", cht."to"
              UNION ALL
              SELECT distinct max(b.timestamp),
                              crc_signup_2."user",
                              case
                                  when ct.can_send_to = crc_signup_2."user" then ct."address"
                                  else ct."can_send_to" end as contact
              FROM crc_trust_2 ct
                       JOIN crc_signup_2 ON crc_signup_2."user" = ct.address OR crc_signup_2."user" = ct.can_send_to
                       JOIN transaction_2 t ON ct.hash = t.hash
                       JOIN block b ON t.block_number = b.number
              group by ct.can_send_to, ct."address", crc_signup_2."user"
          ), contacts as (
              SELECT max(st.ts) as last_contact_timestamp,
                     st."user"  AS safe_address,
                     contact
              FROM safe_contacts st
              WHERE st."user" != st.contact
              group by st."user", contact
              order by max(st.ts) desc
          )
          select st.*,
                 cr1."limit" trusts_you,
                 cr2."limit" you_trust
          from contacts st
                   left join crc_current_trust_2 cr1 on cr1."user" = st.safe_address and cr1.can_send_to = st.contact
                   left join crc_current_trust_2 cr2 on cr2.can_send_to = st.safe_address and cr2."user" = st.contact
          where st.safe_address = $1
          order by last_contact_timestamp desc;`;

      const contactsQueryParameters = [safeAddress];
      const contactsQueryResult = await pool.query(
        contactsQuery,
        contactsQueryParameters
      );

      const allSafeAddresses: { [safeAddress: string]: boolean } = {};
      contactsQueryResult.rows.forEach((o: any) => {
        allSafeAddresses[o.safe_address] = true;
        allSafeAddresses[o.contact] = true;
      });

      const lastChatContacts = await prisma.$queryRaw`
          select max("createdAt") last_message_at, "from", "to"
          from "ChatMessage"
          where "from" = ${safeAddress}
             or "to" = ${safeAddress}
          group by "from", "to"
          order by max("createdAt") desc;`;

      /*
            const arr = [
              {
                last_message_at: '2021-09-17T12:15:59.477+00:00',
                from: '0xde374ece6fa50e781e81aac78e811b33d16912c7',
                to: '0x1a3e7bee49c45897b8a501f43c21c2f17dc9354a'
              },
              {
                last_message_at: '2021-09-17T11:36:16.366+00:00',
                from: '0xde374ece6fa50e781e81aac78e811b33d16912c7',
                to: '0x009626daded5e90aecee30ad3ebf2b3e510fe256'
              },
            ];
            const lastChatContactsWithMessage = await prisma.$queryRaw(`
              select *
              from "ChatMessage"
            `);
            console.log(lastChatContacts);
       */

      const allSafeAddressesArr = Object.keys(allSafeAddresses);
      const profilesBySafeAddressResolver = profilesBySafeAddress(prisma);

      const profilesPromise = resolveProfiles
        ? profilesBySafeAddressResolver(
            null,
            { safeAddresses: allSafeAddressesArr },
            context
          )
        : Promise.resolve([]);

      const lastEventsPromise = lastEvents(
        safeAddress,
        allSafeAddressesArr.filter((o) => o != safeAddress)
      );

      const queryResults = await Promise.all([
        profilesPromise,
        lastEventsPromise,
      ]);
      const profiles = queryResults[0];
      const _lastEvents = queryResults[1];

      const _profilesBySafeAddress: ProfilesBySafeAddressLookup = {};
      profiles
        .filter((o) => o.circlesAddress)
        .forEach((o) => (_profilesBySafeAddress[<string>o.circlesAddress] = o));

      const lastEventsByContactAddress: {
        [contactAddress: string]: LastEvent;
      } = {};
      _lastEvents.forEach((o) => (lastEventsByContactAddress[o.address2] = o));

      return contactsQueryResult.rows.map((o: any) => {
        const lastEvent = lastEventsByContactAddress[o.contact];
        return <Contact>{
          safeAddress,
          lastContactAt: o.last_contact_timestamp.toJSON(),
          safeAddressProfile: _profilesBySafeAddress[o.safe_address],
          contactAddress: o.contact,
          contactAddressProfile: _profilesBySafeAddress[o.contact],
          lastEvent: !lastEvent
            ? undefined
            : {
                ...lastEvent,
                payload: {
                  ...lastEvent.obj,
                  __typename:
                    lastEvent.type == "crc_trust"
                      ? "CrcTrust"
                      : "CrcHubTransfer",
                },
                safe_address: lastEvent.address1,
                transaction_hash: lastEvent.transaction_hash,
              },
          trustsYou: o.trusts_you,
          youTrust: o.you_trust,
        };
      });
    } finally {
      await pool.end();
    }
  };
}
