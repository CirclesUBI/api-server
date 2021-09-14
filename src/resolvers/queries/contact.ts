import {Context} from "../../context";
import {profilesBySafeAddress, ProfilesBySafeAddressLookup} from "./profiles";
import {PrismaClient} from "../../api-db/client";
import {getPool} from "../resolvers";
import {Contact} from "../../types";

export function contact(prisma:PrismaClient) {
  return async (parent:any, args:{safeAddress:string, contactAddress:string}, context:Context) => {
    const pool = getPool();
    try {
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
            and st.contact = $2;`;

      const contactsQueryParameters = [args.safeAddress, args.contactAddress];
      const contactsQueryResult = await pool.query(contactsQuery, contactsQueryParameters);

      const allSafeAddresses: { [safeAddress: string]: boolean } = {};
      contactsQueryResult.rows.forEach((o: any) => {
        allSafeAddresses[o.safe_address] = true;
        allSafeAddresses[o.contact] = true;
      });

      const allSafeAddressesArr = Object.keys(allSafeAddresses);
      const profilesBySafeAddressResolver = profilesBySafeAddress(prisma);
      const profiles = await profilesBySafeAddressResolver(null, {safeAddresses: allSafeAddressesArr}, context);

      const _profilesBySafeAddress: ProfilesBySafeAddressLookup = {};
      profiles.filter(o => o.circlesAddress)
        .forEach(o => _profilesBySafeAddress[<string>o.circlesAddress] = o);

      const contacts = contactsQueryResult.rows.map((o: any) => {
        return <Contact>{
          safeAddress: args.safeAddress,
          lastContactAt: o.last_contact_timestamp,
          safeAddressProfile: _profilesBySafeAddress[o.safe_address],
          contactAddress: o.contact,
          contactAddressProfile: _profilesBySafeAddress[o.contact],
          trustsYou: o.trusts_you,
          youTrust: o.you_trust
        };
      });
      if (contacts.length ==  1) {
        return contacts[0];
      }
      return null;
    } finally {
      await pool.end();
    }
  }
}