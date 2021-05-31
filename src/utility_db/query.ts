import {Pool, PoolClient} from "pg";

const pool = new Pool({
    connectionString: process.env.UTILITY_DB_CONNECTION_STRING
})

pool.on('error', (err:Error, client:PoolClient) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

export class Query {
    static async placesByName(searchPattern:string, isoAlpha2Language:string = "en") : Promise<{
        geonameid: number,
        name: string,
        country: string,
        population: number,
        latitude: number,
        longitude: number,
        feature_code: string,
        source: string
    }[]> {

        const query = `
            with result as (
                select 'A'                  source
                     , p.geonameid
                     , pn.alternate_name as name
                     , pn.isolanguage       name_language
                     , p.country_code       country
                     , p.population
                     , p.latitude
                     , p.longitude
                     , p.feature_code
                     , p.elevation
                from place_names pn
                    join places p on pn.geonameid = p.geonameid
                                  and feature_code like 'PPL%'
                                  and feature_code != 'PPLX'
                                  and population > 0
                where lower(alternate_name) like $1
                    and isolanguage = $2
            union all
                select 'B'            source
                     , p.geonameid
                     , p.name
                     , null           name_language
                     , p.country_code country
                     , p.population
                     , p.latitude
                     , p.longitude
                     , p.feature_code
                     , p.elevation
                from places p
                where lower(name) like $1
                  and feature_code like 'PPL%'
                  and feature_code != 'PPLX'
                      and population > 0
                order by population desc
            )
            select geonameid
                 , name
                 , country
                 , population
                 , latitude
                 , longitude
                 , feature_code
                 , min(source) as source
            from result
            group by geonameid
                   , name
                   , country
                   , population
                   , latitude
                   , longitude
                   , feature_code
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