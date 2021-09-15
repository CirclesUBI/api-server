import {Context} from "../../context";
import {profilesBySafeAddress, ProfilesBySafeAddressLookup} from "./profiles";
import {PrismaClient} from "../../api-db/client";
import {getPool} from "../resolvers";
import {Contact, ProfileEvent} from "../../types";
import {Pool} from "pg";
import {events} from "./queryEvents";

export type LastEvent = {
  transaction_id:number
  , timestamp:string
  , address1:string
  , address2:string
  , block_number:number
  , transaction_index:number
  , transaction_hash:string
  , type:string
  , direction:string
  , value:string
  , obj:any
};

export async function lastEvents(safeAddress:string, contactAddresses:string[], externalPool?:Pool) : Promise<LastEvent[]> {
  const sql = `
      with addresses as (
          select unnest($2::text[]) as address2
      ), a as (
          select $1::text as address1, a.address2, 'crc_trust' as type, t.block_number, t.index,  t.hash as transaction_hash
          from addresses a
                   join crc_trust ct on ($1 = ct.address or $1 = ct.can_send_to)
              and (a.address2 = ct.address or a.address2 = ct.can_send_to)
                   join transaction t on ct.transaction_id = t.id
      ), b as (
          select $1::text as address1, a.address2, 'crc_hub_transfer' as type, t.block_number, t.index, t.hash as transaction_hash
          from addresses a
                   join crc_hub_transfer cht on ($1 = cht."from" or $1 = cht."to")
              and (a.address2 = cht."from" or a.address2 = cht."to")
                   join transaction t on cht.transaction_id = t.id
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
          select t.id
               , b.timestamp
               , d.address1
               , d.address2
               , b.number
               , t.index
               , t.hash
               , 'crc_hub_transfer' as type
               , crc_signup."user"
               , case
                     when cht."from" = crc_signup."user" and cht."to" = crc_signup."user" then 'self'
                     when cht."from" = crc_signup."user" then 'out'
                     else 'in' end  as direction
               , cht.value
               , (select row_to_json(_steps)
                  from (
                           select cht.id,
                                  t.id as          transaction_id,
                                  t."hash"         "transactionHash",
                                  ht."from"        "from",
                                  ht."to"          "to",
                                  ht."value"::text flow,
                                  (select json_agg(steps) transfers
                                   from (
                                            select E20T."from"           "from",
                                                   E20T."to"             "to",
                                                   E20T."token"          "token",
                                                   E20T."value"::text as "value"
                                            from crc_token_transfer E20T
                                            where E20T.transaction_id = t.id
                                        ) steps)
                           from transaction t
                                    join crc_hub_transfer ht on t.id = ht.transaction_id
                           where t.id = cht.transaction_id
                       ) _steps)
                                    as obj
          from crc_hub_transfer cht
                   join crc_signup on crc_signup."user" = cht."from" or crc_signup."user" = cht."to"
                   join transaction t on cht.transaction_id = t.id
                   join block b on t.block_number = b.number
                   join d on d.transaction_hash = t.hash and crc_signup."user" = d.address1
          union all
          select t.id
               , b.timestamp
               , d.address1
               , d.address2
               , b.number
               , t.index
               , t.hash
               , 'crc_trust'       as type
               , crc_signup."user"
               , case
                     when ct.can_send_to = crc_signup."user" and ct.address = crc_signup."user" then 'self'
                     when ct.can_send_to = crc_signup."user" then 'out'
                     else 'in' end as direction
               , ct."limit"
               , row_to_json(ct)      obj
          from crc_trust ct
                   join crc_signup on crc_signup."user" = ct.address or crc_signup."user" = ct.can_send_to
                   join transaction t on ct.transaction_id = t.id
                   join block b on t.block_number = b.number
                   join d on d.transaction_hash = t.hash and crc_signup."user" = d.address1
      )
      select id transaction_id
           , timestamp
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

  let pool:Pool|null = null;
  try {
    pool = externalPool ?? getPool();
    const queryParameters = [safeAddress, contactAddresses];
    const queryResult = await pool.query(sql, queryParameters);
    return queryResult.rows.map(row => {
      return {
        transaction_id: row.transaction_id
        , timestamp: (<Date>row.timestamp).toJSON()
        , address1: row.address1
        , address2: row.address2
        , block_number: row.block_number
        , transaction_index: row.transaction_index
        , transaction_hash: row.transaction_hash
        , type: row.type
        , direction: row.direction
        , value: row.value
        , obj: row.obj
      };
    });
  } finally {
    if (!externalPool) {
      pool?.end();
    }
  }
}

export function contacts(prisma:PrismaClient, resolveProfiles:boolean = false) {
  return async (parent:any, args:{safeAddress:string}, context:Context) => {
    const pool = getPool();
    try {
      const safeAddress = args.safeAddress.toLowerCase();

      const contactsQuery = `
          WITH safe_contacts AS (
              SELECT distinct max(b.timestamp)                                                            ts,
                              crc_signup."user",
                              case when cht.from = crc_signup."user" then cht."to" else cht."from" end as contact
              FROM crc_hub_transfer cht
                       JOIN crc_signup ON crc_signup."user" = cht."from" OR crc_signup."user" = cht."to"
                       JOIN transaction t ON cht.transaction_id = t.id
                       JOIN block b ON t.block_number = b.number
              group by cht."from", crc_signup."user", cht."to"
              UNION ALL
              SELECT distinct max(b.timestamp),
                              crc_signup."user",
                              case
                                  when ct.can_send_to = crc_signup."user" then ct."address"
                                  else ct."can_send_to" end as contact
              FROM crc_trust ct
                       JOIN crc_signup ON crc_signup."user" = ct.address OR crc_signup."user" = ct.can_send_to
                       JOIN transaction t ON ct.transaction_id = t.id
                       JOIN block b ON t.block_number = b.number
              group by ct."can_send_to", ct."address", crc_signup."user"
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
                   left join crc_current_trust cr1 on cr1."user" = st.safe_address and cr1.can_send_to = st.contact
                   left join crc_current_trust cr2 on cr2.can_send_to = st.safe_address and cr2."user" = st.contact
          where st.safe_address = $1
          order by last_contact_timestamp desc;`;

      const contactsQueryParameters = [safeAddress];
      const contactsQueryResult = await pool.query(contactsQuery, contactsQueryParameters);

      const allSafeAddresses: { [safeAddress: string]: boolean } = {};
      contactsQueryResult.rows.forEach((o: any) => {
        allSafeAddresses[o.safe_address] = true;
        allSafeAddresses[o.contact] = true;
      });


      const allSafeAddressesArr = Object.keys(allSafeAddresses);
      const profilesBySafeAddressResolver = profilesBySafeAddress(prisma);

      const profilesPromise = resolveProfiles
        ? profilesBySafeAddressResolver(null, {safeAddresses: allSafeAddressesArr}, context)
        : Promise.resolve([]);

      const lastEventsPromise = lastEvents(safeAddress, allSafeAddressesArr.filter(o => o != safeAddress));

      const queryResults = await Promise.all([profilesPromise, lastEventsPromise]);
      const profiles = queryResults[0];
      const _lastEvents = queryResults[1];

      const _profilesBySafeAddress: ProfilesBySafeAddressLookup = {};
      profiles.filter(o => o.circlesAddress)
        .forEach(o => _profilesBySafeAddress[<string>o.circlesAddress] = o);

      const lastEventsByContactAddress: {[contactAddress:string]: LastEvent} = {};
      _lastEvents.forEach(o => lastEventsByContactAddress[o.address2] = o);

      return contactsQueryResult.rows.map((o: any) => {
        const lastEvent = lastEventsByContactAddress[o.contact];
        return <Contact>{
          safeAddress,
          lastContactAt: o.last_contact_timestamp,
          safeAddressProfile: _profilesBySafeAddress[o.safe_address],
          contactAddress: o.contact,
          contactAddressProfile: _profilesBySafeAddress[o.contact],
          lastEvent: !lastEvent ? undefined : {
            ...lastEvent,
            payload: {
              ...lastEvent.obj,
              __typename: lastEvent.type == "crc_trust" ? "CrcTrust" : "CrcHubTransfer"
            },
            safe_address: lastEvent.address1,
            id: lastEvent.transaction_id
          },
          trustsYou: o.trusts_you,
          youTrust: o.you_trust
        };
      });
    } finally {
      await pool.end();
    }
  }
}