import {profiles} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_ro, prisma_rw} from "../prismaClient";
import {City, CityStats, CountryStats, Resolvers, Stats} from "../types";
import {exchangeTokenResolver} from "./mutations/exchangeToken";
import {logout} from "./mutations/logout";
import {sessionInfo} from "./queries/sessionInfo";
import {depositChallengeResolver} from "./mutations/depositChallenge";
import {authenticateAtResolver} from "./mutations/authenticateAt";
import {consumeDepositedChallengeResolver} from "./mutations/consumeDepositedChallenge";
import {search} from "./queries/search";
import {upsertOfferResolver} from "./mutations/upsertOffer";
import {requestUpdateSafe} from "./mutations/requestUpdateSafe";
import {updateSafe} from "./mutations/updateSafe";
import {profileOffers} from "./profile/offers";
import {profileCity} from "./profile/city";
import {offerCreatedBy} from "./offer/createdBy";
import {offerCity} from "./offer/city";
import {whoami} from "./queries/whoami";
import {cities} from "./queries/citites";
import {version} from "./queries/version";
import {offers} from "./queries/offers";
import {offerCategoryTag} from "./offer/offerCategoryTag";
import {offerDeliveryTermsTag} from "./offer/offerDeliveryTermsTag";
import {offerUnitTag} from "./offer/offerUnitTag";
import {tags} from "./queries/tags";
import {Query} from "../utility_db/query";

const packageJson = require("../../package.json");

export const resolvers: Resolvers = {
    Profile: {
        offers: profileOffers(prisma_ro),
        city: profileCity
    },
    Offer: {
        createdBy: offerCreatedBy(prisma_ro),
        categoryTag: offerCategoryTag(prisma_ro),
        deliveryTermsTag: offerDeliveryTermsTag(prisma_ro),
        unitTag: offerUnitTag(prisma_ro),
        city: offerCity
    },
    Query: {
        sessionInfo: sessionInfo,
        whoami: whoami,
        cities: cities,
        profiles: profiles(prisma_ro),
        search: search(prisma_ro),
        version: version(packageJson),
        offers: offers(prisma_ro),
        tags: tags(prisma_ro),
        tagById: async (parent, args, context) => {
            const tag = await prisma_ro.tag.findUnique({
                where: {
                    id: args.id
                }
            });
            return tag;
        },
        stats: async (parent, args, context) => {

            const fibonacci = (iterations:number) => {
                let fib = [0, 1];
                for (let i = 2; i <= iterations; i++) {
                    fib[i] = fib[i - 2] + fib[i - 1];
                }
                return fib;
            };

            const fib = fibonacci(50);
            const totalCitizens = await prisma_ro.profile.count({
                where: {
                    circlesAddress: {
                        not: null
                    }
                }
            });


            const cityRanks = (await prisma_ro.profile.groupBy({
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
            const cititesById = citites.reduce((p,c) => {
                p[c.geonameid] = c;
                return p;
            }, <{[x:number]:City}>{});

            const countryRanks:{[countryName:string]: number} = {};
            cityRanks.forEach(o => {
                const city = cititesById[o.cityGeonameid ?? 0];
                if (!countryRanks[city.country]) {
                    countryRanks[city.country] = 0;
                }
                countryRanks[city.country] += o._count.circlesAddress;
            });

            const cityRanks_:CityStats[] = cityRanks.map(o => {
                const city = cititesById[o.cityGeonameid ?? 0]
                return <CityStats>{
                    citizenCount: o._count.circlesAddress,
                    ...city
                }
            })
            .sort((a,b) => a.citizenCount > b.citizenCount ? -1: a.citizenCount < b.citizenCount ? 1 : 0);


            /*
            select "cityGeonameid", count("circlesAddress")
            from "Profile"
            where "circlesAddress" is not null
            group by "cityGeonameid"
             */

            const currentIteration = fib.find(o => o >= totalCitizens);
            const idx = fib.indexOf(currentIteration ?? 0);

            return <Stats>{
                totalCitizens: totalCitizens,
                cityRank: 0,
                inviteRank: 0,
                currentGoal: idx -1,
                currentGoalFrom: fib[idx - 1],
                nextGoalAt: fib[idx],
                cities: cityRanks_,
                countries: Object.keys(countryRanks).map(key => {
                    const val = countryRanks[key];
                    return <CountryStats> {
                        name: key,
                        citizenCount: val
                    }
                })
            };
        }
    },
    Mutation: {
        upsertOffer: upsertOfferResolver(prisma_rw),
        exchangeToken: exchangeTokenResolver(prisma_rw),
        logout: logout(prisma_rw),
        upsertProfile: upsertProfileResolver(prisma_rw),
        authenticateAt: authenticateAtResolver(prisma_rw),
        depositChallenge: depositChallengeResolver(prisma_rw),
        consumeDepositedChallenge: consumeDepositedChallengeResolver(prisma_rw),
        requestUpdateSafe: requestUpdateSafe(prisma_rw),
        updateSafe: updateSafe(prisma_rw)
    }
};
