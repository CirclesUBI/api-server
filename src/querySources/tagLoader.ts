import {PrismaClient} from "../api-db/client";
import {Tag} from "../types";

export type TagsByTxHashLookup = {
  [txHash: string]: Tag[] | null;
};

export class TagLoader {
  async queryCirclesLand(prisma: PrismaClient, transactionHashes:string[]) : Promise<TagsByTxHashLookup> {
    const tags = await prisma.tag.findMany({
      where: {
        transactionHash: {
          in: transactionHashes
        }
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    return tags.groupBy(c => c.transactionHash);
  }

  async tagsByTransactionHash(prisma:PrismaClient, hashes:string[]) : Promise<TagsByTxHashLookup> {
    const lowercaseHashes = hashes.map(o => o.toLowerCase());
    return await this.queryCirclesLand(prisma, lowercaseHashes);
  }
}