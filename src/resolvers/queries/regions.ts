import {Context} from "../../context";
import {Organisation} from "../../types";
import {Environment} from "../../environment";

export const regionsResolver = async (parent:any, args:any, context:Context) => {
  const regions = await Environment.readonlyApiDb.profile.findMany({
    where: {
      type: "REGION"
    }
  });
  return regions.map(o => {
    return <Organisation>{
      id: o.id,
      createdAt: o.lastUpdateAt.toJSON(),
      name: o.firstName,
      cityGeonameid: o.cityGeonameid,
      circlesAddress: o.circlesAddress,
      avatarUrl: o.avatarUrl,
      description: o.dream,
      avatarMimeType: o.avatarMimeType
    }
  });
}