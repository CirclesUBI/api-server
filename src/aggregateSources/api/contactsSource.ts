import {AggregateSource} from "../aggregateSource";
import {ContactDirection, Contact2, ContactPoint, Contacts, CrcTrust, ProfileAggregate} from "../../types";
import {getPool} from "../../resolvers/resolvers";
import {prisma_api_ro} from "../../apiDbClient";

async function trustContacts(forSafeAddress: string) : Promise<Contact2[]> {
  const pool = getPool();
  try {
    const trustContactsResult = await pool.query(`
                with "out" as (
                    select max(timestamp) last_contact_at, array_agg("limit") as limits, address
                    from crc_trust_2
                    where can_send_to = $1
                    group by address
                ), "in" as (
                    select max(timestamp) last_contact_at, array_agg("limit") as limits, can_send_to
                    from crc_trust_2
                    where address = $1
                    group by can_send_to
                ), "all" as (
                    select 'out' direction, * from "out"
                    union all
                    select 'in' direction, * from "in"
                )
                select array_agg(direction) as directions,
                       array_agg(limits[array_upper(limits, 1)]) as limits,
                       max(last_contact_at) last_contact_at,
                       address as contact_address
                from "all"
                group by address;`,
      [forSafeAddress.toLowerCase()]);

    return trustContactsResult.rows.map(o => {
      return <Contact2> {
        metadata: [<ContactPoint>{
            name: "CrcTrust",
            directions: o.directions.map((p:string) => p == "in" ? ContactDirection.In : ContactDirection.Out),
            values: o.limits.map((p:any) => p.toString())
        }],
        contactAddress: o.contact_address,
        lastContactAt: new Date(o.last_contact_at).getTime().toString()
      };
    })
  } finally {
    await pool.end();
  }
}

async function hubTransferContacts(forSafeAddress: string) : Promise<Contact2[]> {
  const pool = getPool();
  try {
    const hubTransferContactsResult = await pool.query(`
                with "out" as (
                    select max(timestamp) last_contact_at, "to" as contact_address
                    from crc_hub_transfer_2
                    where "from" = $1
                    group by "to"
                ), "in" as (
                    select max(timestamp) last_contact_at, "from" as contact_address
                    from crc_hub_transfer_2
                    where "to" = $1
                    group by "from"
                ), "all" as (
                     select 'out' direction, *
                     from "out"
                     union all
                     select 'in' direction, *
                     from "in"
                 )
                select array_agg(direction) as directions,
                       max(last_contact_at) as last_contact_at,
                       contact_address
                from "all"
                group by contact_address;`,
      [forSafeAddress.toLowerCase()]);

    return hubTransferContactsResult.rows.map(o => {
      const time = new Date(o.last_contact_at).getTime().toString();
      return <Contact2> {
        metadata: [<ContactPoint>{
          name: "CrcHubTransfer",
          directions: o.directions.map((p:string) => p == "in" ? ContactDirection.In : ContactDirection.Out),
          values: [],
          lastContactAt: time
        }],
        contactAddress: o.contact_address,
        lastContactAt: time
      };
    })
  } finally {
    await pool.end();
  }
}

async function chatMessageContacts(forSafeAddress: string) : Promise<Contact2[]> {
  const chatContactsResult = await prisma_api_ro.$queryRaw`
              with "in" as (
                  select max("createdAt") last_contact_at, "from" as contact_address
                  from "ChatMessage"
                  where "to" = ${forSafeAddress.toLowerCase()}
                  group by "from"
              ), "out" as (
                  select max("createdAt") last_contact_at, "to" as contact_address
                  from "ChatMessage"
                  where "from" = ${forSafeAddress.toLowerCase()}
                  group by "to"
              ), "all" as (
                  select 'out' direction, *
                  from "out"
                  union all
                  select 'in' direction, *
                  from "in"
              ), "all_directions" as (
                  select array_agg(direction) as directions,
                         max(last_contact_at) as last_contact_at,
                         contact_address
                  from "all"
                  group by contact_address
              ), "all_directions_with_latest_text" as (
                  select "all_directions".*, cm.text
                  from "all_directions"
                 join "ChatMessage" cm on cm."createdAt" = "all_directions".last_contact_at
              )
              select *
              from "all_directions_with_latest_text";`;

  return chatContactsResult.map((o:any) => {
    return <Contact2> {
      metadata: [<ContactPoint>{
        name: "ChatMessage",
        directions: o.directions.map((p:string) => p == "in" ? ContactDirection.In : ContactDirection.Out),
        values: [o.text]
      }],
      contactAddress: o.contact_address,
      lastContactAt: new Date(o.last_contact_at).getTime().toString()
    };
  })
}

// People who claimed my invitations
// The person from which I claimed my invitation
async function invitationContacts(forSafeAddress: string) : Promise<Contact2[]> {
  const invitationContactsResult = await prisma_api_ro.$queryRaw`
              with "in" as (
                  select max(i."createdAt") last_contact_at, "creatorProfile"."circlesAddress" as contact_address
                  from "Invitation" i
                           join "Profile" "claimedByProfile" on "claimedByProfile".id = i."claimedByProfileId"
                           join "Profile" "creatorProfile" on "creatorProfile".id = i."createdByProfileId"
                  where "claimedByProfile"."circlesAddress" = ${forSafeAddress.toLowerCase()}
                  group by "creatorProfile"."circlesAddress"
              ), "out" as (
                  select max(i."claimedAt") last_contact_at, "claimedByProfile"."circlesAddress" as contact_address
                  from "Invitation" i
                           join "Profile" "creatorProfile" on "creatorProfile".id = i."createdByProfileId"
                           join "Profile" "claimedByProfile" on "claimedByProfile".id = i."claimedByProfileId"
                  where "creatorProfile"."circlesAddress" = ${forSafeAddress.toLowerCase()}
                    and "claimedByProfile"."circlesAddress" is not null
                  group by "claimedByProfile"."circlesAddress"
              ), "all" as (
                  select 'out' direction, *
                  from "out"
                  union all
                  select 'in' direction, *
                  from "in"
              )
              select array_agg(direction) as directions,
                     max(last_contact_at) as last_contact_at,
                     contact_address
              from "all"
              group by contact_address;`;

  return invitationContactsResult.map((o:any) => {
    const time = new Date(o.last_contact_at).getTime().toString();
    return <Contact2> {
      metadata: [<ContactPoint>{
        name: "Invitation",
        directions: o.directions.map((p:string) => p == "in" ? ContactDirection.In : ContactDirection.Out),
        values: [],
        lastContactAt: time
      }],
      contactAddress: o.contact_address,
      lastContactAt: time
    };
  })
}

// People who offered me (non-rejected) orga-invitations
// People I offered orga invitations to
async function membershipOfferContacts(forSafeAddress: string) : Promise<Contact2[]> {
  const membershipOfferContactsResult = await prisma_api_ro.$queryRaw`
              with  "in" as (
                  select max(m."createdAt") as last_contact_at, "createdByProfile"."circlesAddress" as contact_address
                  from "Membership" m
                           join "Profile" "memberProfile" on "memberProfile".id = m."memberId"
                           join "Profile" "createdByProfile" on "createdByProfile".id = m."createdByProfileId"
                  where "rejectedAt" is null
                    and "memberProfile"."circlesAddress" = ${forSafeAddress.toLowerCase()}
                  group by "createdByProfile"."circlesAddress"
              ), "out" as (
                  select max(m."createdAt") as last_contact_at, "memberProfile"."circlesAddress" as contact_address
                  from "Membership" m
                           join "Profile" "memberProfile" on "memberProfile".id = m."memberId"
                           join "Profile" "createdByProfile" on "createdByProfile".id = m."createdByProfileId"
                  where "createdByProfile"."circlesAddress" = ${forSafeAddress.toLowerCase()}
                  group by "memberProfile"."circlesAddress"
              ), "all" as (
                  select 'out' direction, *
                  from "out"
                  union all
                  select 'in' direction, *
                  from "in"
              )
              select array_agg(direction) as directions,
                     max(last_contact_at) as last_contact_at,
                     contact_address
              from "all"
              group by contact_address;`;

  return membershipOfferContactsResult.map((o:any) => {
    const time = new Date(o.last_contact_at).getTime().toString();
    return <Contact2> {
      metadata: [<ContactPoint>{
        name: "MembershipOffer",
        directions: o.directions.map((p:string) => p == "in" ? ContactDirection.In : ContactDirection.Out),
        values: [],
        lastContactAt: time
      }],
      contactAddress: o.contact_address,
      lastContactAt: time
    };
  })
}

export enum ContactPoints {
  CrcTrust = "CrcTrust",
  CrcHubTransfer = "CrcHubTransfer",
  ChatMessage = "ChatMessage",
  Invitation = "Invitation",
  MembershipOffer = "MembershipOffer",
}

export class ContactsSource implements AggregateSource {
  private readonly _contactPoints:ContactPoints[];
  constructor(contactPoints:ContactPoints[]) {
    this._contactPoints = contactPoints;
  }
  async getAggregate(forSafeAddress: string): Promise<ProfileAggregate[]> {
    const types = this._contactPoints?.reduce((p, c) => {
      if (!c) return p;
      p[c] = true;
      return p;
    }, <{ [x: string]: any }>{}) ?? {};

    const contactSources: Promise<Contact2[]>[] = [];
    if (types["CrcTrust"]) {
      contactSources.push(trustContacts(forSafeAddress));
    }
    if (types["CrcHubTransfer"]) {
      contactSources.push(hubTransferContacts(forSafeAddress));
    }
    if (types["ChatMessage"]) {
      contactSources.push(chatMessageContacts(forSafeAddress));
    }
    if (types["Invitation"]) {
      contactSources.push(invitationContacts(forSafeAddress));
    }
    if (types["MembershipOffer"]) {
      contactSources.push(membershipOfferContacts(forSafeAddress));
    }

    const results = await Promise.all(contactSources);
    let latestEventAt:number = -1;

    const contactPoints = results.flatMap(o => o);
    const distinctAddresses = contactPoints.reduce((p,c) => {
      if (!p[c.contactAddress]) {
        p[c.contactAddress] = c;
      } else {
        const cTime = !isNaN(parseInt(c.lastContactAt)) ? parseInt(c.lastContactAt) : new Date(c.lastContactAt).getTime();
        latestEventAt = cTime > latestEventAt ? cTime : latestEventAt;

        const stored = p[c.contactAddress];
        const sTime = !isNaN(parseInt(stored.lastContactAt)) ? parseInt(stored.lastContactAt) : new Date(stored.lastContactAt).getTime();

        p[c.contactAddress] = {
          ...c,
          metadata: [...stored.metadata, ...c.metadata],
          lastContactAt: (cTime > sTime ? cTime : sTime).toString()
        };
      }
      return p;
    }, <{ [x: string]:Contact2 }>{});

    return [{
      safe_address: forSafeAddress,
      type: "Contacts",
      payload: <Contacts> {
        __typename: "Contacts",
        lastUpdatedAt: latestEventAt.toString(),
        contacts: Object.values(distinctAddresses)
      }
    }]
  }
}