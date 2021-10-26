import {Context} from "../../context";
import {prisma_api_ro} from "../../apiDbClient";
import {Organisation} from "../../types";

export const regionsResolver = async (parent:any, args:any, context:Context) => {
  const regions = await prisma_api_ro.profile.findMany({
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