import {Context} from "../../context";
import {City, CityStats, CountryStats, Goal, Stats} from "../../types";
import {Query} from "../../utility_db/query";
import {PrismaClient} from "@prisma/client";

export function stats(prisma:PrismaClient) {
    return async (parent:any, args:any, context:Context) : Promise<Stats> => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/queries/stats.ts/stats(prisma:PrismaClient)/async (parent:any, args:any, context:Context)`
        }]);

        const fibonacci = (iterations: number) => {
            let fib = [0, 1];
            for (let i = 2; i <= iterations; i++) {
                fib[i] = fib[i - 2] + fib[i - 1];
            }
            return fib;
        };

        const fib = fibonacci(50);
        const totalCitizens = await prisma.profile.count({
            where: {
                circlesAddress: {
                    not: null
                }
            }
        });

        const cityRanks = (await prisma.profile.groupBy({
            by: ["cityGeonameid"],
            where: {
                circlesAddress: {
                    not: null
                }
            },
            _count: {
                circlesAddress: true
            }
        }))
            .filter(o => o.cityGeonameid !== null);

        const citites = await Query.placesById(cityRanks.map(o => o.cityGeonameid ?? 0));
        const cititesById = citites.reduce((p, c) => {
            p[c.geonameid] = c;
            return p;
        }, <{ [x: number]: City }>{});

        const countryRanks: { [countryName: string]: number } = {};
        cityRanks.forEach(o => {
            const city = cititesById[o.cityGeonameid ?? 0];
            if (!countryRanks[city.country]) {
                countryRanks[city.country] = 0;
            }
            countryRanks[city.country] += o._count.circlesAddress;
        });

        const cityRanks_: CityStats[] = cityRanks.map(o => {
            const city = cititesById[o.cityGeonameid ?? 0]
            return <CityStats>{
                citizenCount: o._count.circlesAddress,
                ...city
            }
        })
            .sort((a, b) => a.citizenCount > b.citizenCount ? -1 : a.citizenCount < b.citizenCount ? 1 : 0);

        const currentIteration = fib.find(o => o >= totalCitizens);
        const idx = fib.indexOf(currentIteration ?? 0);

        return <Stats>{
            totalCitizens: totalCitizens,
            cityRank: 0,
            inviteRank: 0,
            currentGoal: idx - 1,
            currentGoalFrom: fib[idx - 1],
            nextGoalAt: fib[idx],
            goals: fib.map(o => <Goal>{
                totalCitizens: o
            }),
            cities: cityRanks_,
            countries: Object.keys(countryRanks).map(key => {
                const val = countryRanks[key];
                return <CountryStats>{
                    name: key,
                    citizenCount: val
                }
            })
        };
    }
}