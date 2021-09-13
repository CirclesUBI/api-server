import {Context} from "../../context";
import {Pool} from "pg";
import {loadAllProfilesBySafeAddress} from "./profiles";
import {prisma_api_ro} from "../../apiDbClient";

export function contacts(pool:Pool) {
  return async (parent:any, args:any, context:Context) => {
    const safeAddress = args.safeAddress.toLowerCase();

    const contactsQuery = `
        WITH safe_contacts AS (
          SELECT distinct max(b.timestamp) ts,
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
                          case when ct.can_send_to = crc_signup."user" then ct."address" else ct."can_send_to" end as contact
          FROM crc_trust ct
                   JOIN crc_signup ON crc_signup."user" = ct.address OR crc_signup."user" = ct.can_send_to
                   JOIN transaction t ON ct.transaction_id = t.id
                   JOIN block b ON t.block_number = b.number
          group by ct."can_send_to", ct."address", crc_signup."user"
      )
      SELECT max(st.ts) as last_contact_timestamp,
             st."user" AS safe_address,
             contact
      FROM safe_contacts st
      WHERE st."user" = $1
        and st."user" != st.contact
      group by st."user", contact
      order by max(st.ts) desc;`;

    const contactsQueryParameters = [safeAddress];
    const contactsQueryResult = await pool.query(contactsQuery, contactsQueryParameters);

    const allSafeAddresses:{[safeAddress:string]:boolean} = {};
    contactsQueryResult.rows.forEach((o:any) => {
      allSafeAddresses[o.safe_address] = true;
      allSafeAddresses[o.contact] = true;
    });

    const allSafeAddressesArr = Object.keys(allSafeAddresses);
    const profilesBySafeAddress = await loadAllProfilesBySafeAddress(context, prisma_api_ro, allSafeAddressesArr);

    return contactsQueryResult.rows.map((o:any) => {
      return {
        safeAddress,
        lastContactAt: o.last_contact_timestamp,
        safeAddressProfile: profilesBySafeAddress[o.safe_address],
        contactAddress: o.contact,
        contactAddressProfile: profilesBySafeAddress[o.contact]
      };
    });
  }
}