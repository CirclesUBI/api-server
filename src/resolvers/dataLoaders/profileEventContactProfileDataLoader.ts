import DataLoader from "dataloader";
import {Profile} from "../../types";
import {Environment} from "../../environment";
import {ProfileLoader} from "../../querySources/profileLoader";

export const profileEventContactProfileDataLoader = new DataLoader<string, Profile>(async (keys) => {
  const profiles = await new ProfileLoader().profilesBySafeAddress(Environment.readonlyApiDb, keys.map(o => o));
  return <Profile[]>keys.filter(o => profiles[o]).map(o => profiles[o]);
}, {
  cache: false
});