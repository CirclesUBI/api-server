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

export async function stats() {
  const results = await Promise.all([
    verificationsCount(Environment.readonlyApiDb),
    profilesCount(Environment.readonlyApiDb)
  ]);
  return <Stats> {
    verificationsCount: results[0],
    profilesCount: results[1]
  };
}
