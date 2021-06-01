import {Pool, PoolClient} from "pg";
import {City} from "../types";

const pool = new Pool({
    connectionString: process.env.UTILITY_DB_CONNECTION_STRING
})

pool.on('error', (err:Error, client:PoolClient) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

export class Query {
    static async placesById(ids:number[]) : Promise<City[]> {
        if (ids.length > 50) {
            throw new Error(`You can query max. 50 cities at once.`)
        }

        const queryParams = ids.map((_, i) => "$" + (i + 1).toString()).join(", ");

        const query = `
        select p.geonameid
             , p.name
             , c.country_name country
             , p.population
             , p.latitude
             , p.longitude
             , p.feature_code
        from places p
        join countries c on c.iso = p.country_code
        where p.geonameid in (${queryParams})
        limit 50`;

        return new Promise((resolve, reject) => {
            pool.query(query, ids, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.rows);
            });
        });
    }

    static async placesByName(searchPattern:string, isoAlpha2Language:string = "en") : Promise<City[]> {

        const query = `
            -- Find places by international name (english)
            with common as (
                select p.geonameid
                     , p.name
                     , c.country_name
                     , p.population
                     , p.latitude
                     , p.longitude
                     , p.feature_code
                     , '' isolanguage
                     , -1 "isPreferredName"
                from places p
                         join countries c on p.country_code = c.iso
                where lower(name) like $1
                  and p.feature_code like 'PPL%'
                  and p.feature_code not in ('PPLX', 'PPLQ', 'PPLH', 'PPLCH')
                  and p.population > 0
            ),
            intl as (
            -- Find places by local name
                select p.geonameid
                     , pn.alternate_name
                     , c.country_name
                     , p.population
                     , p.latitude
                     , p.longitude
                     , p.feature_code
                     , pn.isolanguage
                     , coalesce(pn."isPreferredName", 0) "isPreferredName"
                from place_names pn
                         join places p on p.geonameid = pn.geonameid
                         join countries c on p.country_code = c.iso
                where lower(pn.alternate_name) like $1
                  and p.feature_code like 'PPL%'
                  and p.feature_code not in ('PPLX', 'PPLQ', 'PPLH', 'PPLCH')
                  and p.population > 0
                  and (pn.isolanguage = $2 or pn.isolanguage is null)
            ), "both" as (
                select *
                from common
                union all
                select *
                from intl
            )
            select distinct geonameid
                 , first_value(name) over (
                     partition by geonameid
                     order by "isPreferredName" desc
                  ) as name
                 , country_name country
                 , population
                 , latitude
                 , longitude
                 , feature_code
            from "both"
            group by geonameid
                   , name
                   , country_name
                   , population
                   , latitude
                   , longitude
                   , feature_code
                   , "isPreferredName"
            order by population desc
            limit 50`;

        const searchPattern_ = searchPattern.toLowerCase();

        if (searchPattern_.length < 3) {
            return [];
        }

        const firstThree = searchPattern_.substr(0, 3);
        for (let i = 0; i < firstThree.length; i++) {
            if (firstThree[i] == "%" || firstThree[i] == "_") {
                return [];
            }
        }

        if (isoAlpha2Language && isoAlpha2Language.length != 2)
        {
            return [];
        }

        const isoAlpha2Language_ = isoAlpha2Language.toLowerCase();

        return new Promise((resolve, reject) => {
            pool.query(query, [searchPattern_, isoAlpha2Language_], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.rows);
            });
        });
    }
}