import {AggregateSource} from "../aggregateSource";
import {Maybe, Memberships, ProfileAggregate, ProfileAggregateFilter} from "../../types";
import {Environment} from "../../environment";

export class MembershipsSource implements AggregateSource {
  async getAggregate(forSafeAddress: string, filter?: Maybe<ProfileAggregateFilter>): Promise<ProfileAggregate[]> {
    const membershipsResult = await Environment.readonlyApiDb.$queryRaw`
        select m."acceptedAt", member_at_profile."circlesAddress" group_address
        from "Membership" m
                 join "Profile" member_profile on member_profile."circlesAddress" = m."memberAddress"
                 join "Profile" member_at_profile on member_at_profile.id = m."memberAtId"
        where member_profile."circlesAddress" = ${forSafeAddress.toLowerCase()}
          and m."acceptedAt" is not null
          and m."rejectedAt" is null;`;

    const lastUpdatedAt = membershipsResult.reduce((p: number, c: any) => Math.max(new Date(c.acceptedAt).getTime(), p), -1);
    return [<ProfileAggregate>{
      safe_address: forSafeAddress.toLowerCase(),
      type: "Memberships",
      payload: <Memberships>{
        __typename: "Memberships",
        lastUpdatedAt: lastUpdatedAt,
        organisations: membershipsResult.map((o: any) => {
          return {
            circlesAddress: o.group_address
          }
        })
      }
    }];
  }
}