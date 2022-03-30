import { PrismaClient } from "../../api-db/client";
import {Stats} from "../../types";
import {Environment} from "../../environment";

async function verificationsCount(prisma: PrismaClient) {
  return prisma.verifiedSafe.count({
    where: {
      revokedAt: null,
    },
  });
}

async function profilesCount(prisma: PrismaClient) {
  return prisma.profile.count({
    where: {
      firstName: { not: "" },
      circlesAddress: { not: null },
      type: "PERSON",
    },
  });
}

async function invitationLeaderboard() : Promise<{
  createdByCirclesAddress: string
  inviteCount: number
}[]> {
  const leaderboard = await Environment.readonlyApiDb.$queryRaw`
    with invitiation_creators as (
      select cp."circlesAddress" created_by_safe
            ,rp."circlesAddress" redeemed_by_safe
      from "Invitation" i
           join "Profile" cp on cp.id = i."createdByProfileId"
           join "Profile" rp on rp.id = i."redeemedByProfileId"
      where cp."circlesAddress" is not null
        and rp."circlesAddress" is not null
      group by cp."circlesAddress"
             , rp."circlesAddress"
    ), profiles as (
        select *
             , row_number() over (
            partition by p."circlesAddress"
            order by p."createdAt" desc
            ) as row_no
        from "Profile" p
    ), stats as (
        select created_by_safe, count(*) as redeedmed_invitation_count
        from invitiation_creators
        group by created_by_safe
    ), stats_with_profiles as (
        select *
        from stats s
        join profiles p on s.created_by_safe = p."circlesAddress" and p.row_no = 1
    )
    select created_by_safe, redeedmed_invitation_count
    from stats_with_profiles
    order by redeedmed_invitation_count desc
    limit 99;`;

  return (<any[]>leaderboard).map(o => {
    return {
      createdByCirclesAddress: o.created_by_safe,
      inviteCount: o.redeedmed_invitation_count
    };
  });
}

export async function stats() {
  const results = await Promise.all([
    verificationsCount(Environment.readonlyApiDb),
    profilesCount(Environment.readonlyApiDb),
    invitationLeaderboard()
  ]);
  return <Stats> {
    verificationsCount: results[0],
    profilesCount: results[1],
    leaderboard: results[2]
  };
}
