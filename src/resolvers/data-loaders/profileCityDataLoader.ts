import DataLoader from "dataloader";
import {City} from "../../types";
import {Query} from "../../utility_db/query";

export const profileCityDataLoader = new DataLoader<number, City>(async keys => {
  const results = await Query.placesById(keys.map(o => o));
  const resultsById = results.reduce((p,c) => {
    p[c.geonameid] = c;
    return p;
  }, <{[id:number]:City}>{});

  return keys.map(o => resultsById[o]);
});