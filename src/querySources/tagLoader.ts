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

    const txHashTagMap = tags.reduce((p,c)=> {
      if (!c.transactionHash) {
        return p;
      }

      if (!p[c.transactionHash]) {
        p[c.transactionHash] = [];
      }

      // @ts-ignore
      p[c.transactionHash].push(c);

      return p;
    }, <TagsByTxHashLookup>{});

    return txHashTagMap;
  }

  async tagsByTransactionHash(prisma:PrismaClient, hashes:string[]) : Promise<TagsByTxHashLookup> {
    const lowercaseHashes = hashes.map(o => o.toLowerCase());
    return await this.queryCirclesLand(prisma, lowercaseHashes);
  }
}