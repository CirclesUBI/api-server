import {Session} from "../../session";
import { PrismaClient } from "@prisma/client";
import {Context} from "../../context";
import {newLogger} from "../../logger";

const logger = newLogger("/resolvers/mutations/exchangeToken.ts");

export function exchangeTokenResolver(prisma:PrismaClient) {
    return async (parent: any, args: any, context: Context) => {
        if (!context.jwt) {
            logger.log(`'${context.ipAddress}' tried to exchange a token but didn't provide an authorization header.`);
            throw new Error("No authorization header");
        }
        try {
            const session = await Session.createSessionFromJWT(prisma, context.jwt);
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

            logger.log(`'${context.ipAddress}' successfully exchanged a jwt for a session. The session is valid until ${expires.toJSON()}.`);
            return {
                success: true
            }
        } catch (e) {
            logger.log(`'${context.ipAddress}' tried to exchange a token but ran into an error:`, e);
            return {
                success: false,
                errorMessage: "Couldn't create the session cookie from the supplied JWT. Please try again with a new JWT."
            }
        }
    }
}