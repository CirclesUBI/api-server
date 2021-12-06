import DataLoader from "dataloader";
import {ProfileLoader} from "../../profileLoader";
import {Environment} from "../../environment";

export const offerCreatedByLoader = new DataLoader(async (keys: readonly any[]) => {
  const result = await new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, keys.map(o => o));
  const r = keys.map(safeAddress => {
    return result[safeAddress]
      ?? {
        id: -1,
        firstName: safeAddress,
        circlesAddress: safeAddress
      }
  });

  return r;
}, {
  cache: false
});