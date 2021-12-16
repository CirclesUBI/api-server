import { PrismaClient } from "../../api-db/client";

export function profilesCount(prisma: PrismaClient) {
  return async () => {
    return await prisma.profile.count();
  };
}
