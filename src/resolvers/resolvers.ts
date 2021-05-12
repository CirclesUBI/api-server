import {profilesResolver} from "./queries/profiles";
import {upsertProfileResolver} from "./mutations/upsertProfile";
import {prisma_ro, prisma_rw} from "../prismaClient";
import {Resolvers, Version} from "../types";
import {exchangeTokenResolver} from "./mutations/exchangeToken";
import {logout} from "./mutations/logout";
import {sessionInfo} from "./queries/sessionInfo";
import {depositChallengeResolver} from "./mutations/depositChallenge";
import {authenticateAtResolver} from "./mutations/authenticateAt";
import {consumeDepositedChallengeResolver} from "./mutations/consumeDepositedChallenge";
import {searchResolver} from "./queries/search";
import {Context} from "../context";
import {Session} from "../session";
import Web3 from "web3";
import {RpcGateway} from "../rpcGateway";
import {GnosisSafeProxy} from "../web3Contract";
const packageJson = require("../../package.json");

export const resolvers: Resolvers = {
    Query: {
        whoami: async (parent:any, args:any, context:Context) => {
            const i = await context.verifySession();
            return i?.emailAddress;
        },
        profiles: profilesResolver(prisma_ro),
        search: searchResolver(prisma_ro),
        sessionInfo: sessionInfo,
        version: () => {
            const version = packageJson.version.split(".");
            return <Version>{
                major: version[0],
                minor: version[1],
                revision: version[2]
            }
        }
    },
    Mutation: {
        exchangeToken: exchangeTokenResolver(prisma_rw),
        logout: logout(prisma_rw),
        upsertProfile: upsertProfileResolver(prisma_rw),
        authenticateAt: authenticateAtResolver(prisma_rw),
        depositChallenge: depositChallengeResolver(prisma_rw),
        consumeDepositedChallenge: consumeDepositedChallengeResolver(prisma_rw),
        requestUpdateSafe: async (parent: any, {data}, context: Context) => {
             const session = await context.verifySession();
             if (!session.profileId) {
                 return {
                     success: false,
                     errorMessage: "Create a profile first."
                 }
             }

             const verifySafeChallenge = Session.generateRandomBase64String(32);
             prisma_rw.profile.update({
                 where: {
                     id: session.profileId
                 },
                 data: {
                     verifySafeChallenge: verifySafeChallenge,
                     newSafeAddress: data.newSafeAddress
                 }
             });

             return {
                 success: true,
                 challenge: verifySafeChallenge
             };
        },
        updateSafe: async (parent: any, {data}, context: Context) => {
            const session = await context.verifySession();
            if (!session.profileId) {
                return {
                    success: false,
                    errorMessage: "Create a profile first."
                };
            }
            const currentProfile = await prisma_ro.profile.findUnique({where:{id: session.profileId}});
            if (!currentProfile) {
                throw new Error(`Couldn't find the profile (${session.profileId}) that was associated with session '${session.sessionId}'.`);
            }
            if (!currentProfile.verifySafeChallenge || !currentProfile.newSafeAddress) {
                return {
                    success: false,
                    errorMessage: "You must call 'requestUpdateSafe' first."
                };
            }

            const signingAddress = new Web3().eth.accounts.recover(currentProfile.verifySafeChallenge, data.signature);
            const safe = new GnosisSafeProxy(RpcGateway.get(), signingAddress, currentProfile.newSafeAddress);
            const owners = await safe.getOwners();
            if (owners.map(o => o.toLowerCase()).indexOf(signingAddress.toLowerCase()) < 0) {
                return {
                    success: false,
                    errorMessage: "You are not the owner of the specified safe."
                };
            }

            await prisma_rw.profile.update({
                where: {
                    id: session.profileId
                },
                data: {
                    circlesAddress: currentProfile.newSafeAddress,
                    newSafeAddress: null
                }
            });

            return {
                success: true,
                newSafeAddress: currentProfile.newSafeAddress
            };
        }
    }
};
