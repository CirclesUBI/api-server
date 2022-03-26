import DataLoader from "dataloader";
import {City} from "../../types";
import {UtilityDbQueries} from "../../querySources/utilityDbQueries";

export const organisationCityDataLoader = new DataLoader<number, City>(async keys => {
  const results = await UtilityDbQueries.placesById(keys.map(o => o), true);
  const resultsById = results.reduce((p,c) => {
    p[c.geonameid] = c;
    return p;
  }, <{[id:number]:City}>{});

  return keys.map(o => resultsById[o]);
}, {
  cache: false
});