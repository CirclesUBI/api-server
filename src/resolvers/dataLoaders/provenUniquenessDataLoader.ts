import DataLoader from "dataloader";
import {Environment} from "../../environment";

export const provenUniquenessDataLoader = new DataLoader<string, boolean>(async (keys: readonly string[]) => {
  const verificationResult = await Environment.readWriteApiDb.humanodeVerifications.findMany({
    where: {
      circlesAddress: {
        in: keys.map(o => o)
      }
    }
  });

  const resultLookup = verificationResult.toLookup(o => o.circlesAddress);
  return keys.map(o => !!resultLookup[o]);
}, {
  cache: false
});
