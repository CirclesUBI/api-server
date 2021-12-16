import { PrismaClient } from "../../api-db/client";

export function profilesCount(prisma: PrismaClient) {
  return async () => {
    return await prisma.profile.count({
      where: {
        firstName: { not: "" },
        circlesAddress: { not: null },
        type: "PERSON",
      },
    });
  };
}
