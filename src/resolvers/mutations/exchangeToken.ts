import {Session} from "../../session";
import { PrismaClient } from "@prisma/client";
import {Context} from "../../context";

export function exchangeTokenResolver(prisma:PrismaClient) {
    return async (parent: any, args: any, context: Context) => {
        context.logger?.info([{
            key: `call`,
            value: `/resolvers/mutation/exchangeToken.ts/exchangeTokenResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
        }]);

        if (!context.jwt) {
            context.logger?.error([{
                key: `call`,
                value: `/resolvers/mutation/exchangeToken.ts/exchangeTokenResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }], "Tried to exchange a token but didn't provide an authorization header.");
            throw new Error("No authorization header");
        }
        try {
            const session = await Session.createSessionFromJWT(prisma, context);
            const expires = new Date(Date.now() + session.maxLifetime * 1000);
            /// See https://www.npmjs.com/package/apollo-server-plugin-http-headers for the magic that happens below ;)
            context.setCookies.push({
                name: "session",
                value: session.sessionId,
                options: {
                    domain: process.env.EXTERNAL_DOMAIN,
                    httpOnly: true,
                    path: "/",
                    sameSite: process.env.DEBUG ? "Strict" : "None",
                    secure: !process.env.DEBUG,
                    expires: expires
                }
            });

            context.logger?.debug([{
                key: `call`,
                value: `/resolvers/mutation/exchangeToken.ts/exchangeTokenResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }], `Successfully exchanged a jwt for a session. The session is valid until ${expires.toJSON()}`, {
                cookie: {
                    name: "session",
                    options: {
                        domain: process.env.EXTERNAL_DOMAIN,
                        httpOnly: true,
                        path: "/",
                        sameSite: process.env.DEBUG ? "Strict" : "None",
                        secure: !process.env.DEBUG,
                        expires: expires
                    }
                }
            });

            return {
                success: true
            }
        } catch (e) {
            context.logger?.error([{
                key: `call`,
                value: `/resolvers/mutation/exchangeToken.ts/exchangeTokenResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
            }], "Couldn't create the session cookie from the supplied JWT. Please try again with a new JWT.", e);

            return {
                success: false,
                errorMessage: "Couldn't create the session cookie from the supplied JWT. Please try again with a new JWT."
            }
        }
    }
}