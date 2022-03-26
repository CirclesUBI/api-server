import DataLoader from "dataloader";
import {ProfileLoader} from "../../querySources/profileLoader";
import {Environment} from "../../environment";
import {Profile} from "../../types";

export const verificationProfileDataLoader = new DataLoader(async (keys: readonly string[]) => {
  const result = await new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, keys.map(o => o));
  const r:any[] = keys.map(safeAddress => {
    return result[safeAddress] ? {
      ...result[safeAddress],
        displayName: safeAddress,
        name: safeAddress,
      } : {
        id: -1,
        askedForEmailAddress: false,
        firstName: safeAddress,
        displayName: safeAddress,
        name: safeAddress,
        circlesAddress: safeAddress
      }
  });

  return r;
}, {
  cache: false
});