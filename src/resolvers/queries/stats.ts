import { PrismaClient } from "../../api-db/client";
import {Profile, Stats} from "../../types";
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

async function goals() : Promise<{
  lastGoal: number,
  currentValue: number,
  nextGoal: number
}> {
  const goalsResult = await Environment.readonlyApiDb.$queryRaw<any[]>`
      with recursive seed (n, fib_n, fib_n_minus_1) as (
          values (1::numeric, 1::numeric, 0::numeric)
      ),
      fib (n, fib_n, fib_n_minus_1) as (
         select n, fib_n, fib_n_minus_1
         from seed
         union all
         select n + 1, fib_n + fib_n_minus_1, fib_n
         from fib f
         where n < 50
      ), profile_count as (
         select count(*) as profile_count
         from "Profile"
         where "circlesAddress" is not null
           and "firstName" is not null
           and "firstName" != ''
           and "type" = 'PERSON'
      )
      select fib.fib_n_minus_1 as last_goal
           , (select profile_count from profile_count) as current_count
           , fib.fib_n as next_goal
      from fib
      where fib_n_minus_1 < (select profile_count from profile_count)
      order by fib_n desc
      limit 1;`;

  if (goalsResult && goalsResult.length > 0) {
    return {
      currentValue: goalsResult[0].current_count,
      lastGoal: goalsResult[0].last_goal,
      nextGoal: goalsResult[0].next_goal,
    };
  }

  throw new Error(`Couldn't query the fibonacci goals.`);
}

async function getMyRank(safeAddress:string) : Promise<{redeemedInvitationsCount: number, rank: number}> {
  const rankResult = await Environment.readonlyApiDb.$queryRaw<any[]>`
    with ranked as (
        select cp."circlesAddress"        inviter
             , count(rp."circlesAddress") redeemed_invitation_count
             , RANK() OVER (
                ORDER BY count(rp."circlesAddress") desc
               )                           rank
        from "Invitation" i
                 join "Profile" cp on cp.id = i."createdByProfileId"
                 join "Profile" rp on rp.id = i."redeemedByProfileId"
        where cp."circlesAddress" is not null
          and cp.type = 'PERSON'
          and rp."circlesAddress" is not null
          and rp.type = 'PERSON'
        group by cp."circlesAddress"
        order by count(rp."circlesAddress") desc
    )
    select *
    from ranked
    where inviter = ${safeAddress};
  `;

  if (rankResult && rankResult.length > 0) {
    return {
      rank: rankResult[0].rank,
      redeemedInvitationsCount: rankResult[0].redeemed_invitation_count
    };
  } else {
    return {
      rank: 0,
      redeemedInvitationsCount: 0
    };
  }
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
        and cp.type = 'PERSON'
        and rp."circlesAddress" is not null
        and rp.type = 'PERSON'
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

export async function stats(forSafeAddress:string) {
  const results = await Promise.all([
    verificationsCount(Environment.readonlyApiDb),
    profilesCount(Environment.readonlyApiDb),
    invitationLeaderboard(),
    goals(),
    getMyRank(forSafeAddress)
  ]);
  return <Stats> {
    verificationsCount: results[0],
    profilesCount: results[1],
    leaderboard: results[2],
    goals: results[3],
    myRank: results[4]
  };
}
