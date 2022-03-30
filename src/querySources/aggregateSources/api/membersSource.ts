import {AggregateSource} from "../aggregateSource";
import {Maybe, Members, ProfileAggregate, ProfileAggregateFilter} from "../../../types";
import {Environment} from "../../../environment";

export class MembersSource implements AggregateSource {
  async getAggregate(forSafeAddress: string, filter?: Maybe<ProfileAggregateFilter>): Promise<ProfileAggregate[]> {
    const membershipsResult:any[] = await Environment.readonlyApiDb.$queryRaw`
        select m."acceptedAt", member_profile."circlesAddress" group_address
        from "Membership" m
                 join "Profile" member_profile on member_profile."circlesAddress" = m."memberAddress"
                 join "Profile" member_at_profile on member_at_profile.id = m."memberAtId"
        where member_at_profile."circlesAddress" = ${forSafeAddress.toLowerCase()}
          and m."acceptedAt" is not null
          and m."rejectedAt" is null;`;

    const lastUpdatedAt = membershipsResult.reduce((p: number, c: any) => Math.max(new Date(c.acceptedAt).getTime(), p), -1);
    return [<ProfileAggregate> {
      safe_address: forSafeAddress.toLowerCase(),
      type: "Members",
      payload: <Members>{
        __typename: "Members",
        lastUpdatedAt: lastUpdatedAt.toString(),
        members: membershipsResult.map((o:any) => {
          return {
            __typename: "Profile",
            circlesAddress: o.group_address
          }
        })
      }
    }];
  }
}