import {PrismaClient} from "../../api-db/client";
import {Context} from "../../context";
import {Session} from "../../session";
import {prisma_api_rw} from "../../apiDbClient";

export function verifySessionChallengeResolver(prisma:PrismaClient) {
  return async (parent: any, args: any, context: Context) => {
    context.logger?.info([{
      key: `call`,
      value: `/resolvers/mutation/verifySessionChallengeResolver.ts/verifySessionChallengeResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
    }]);

    try {
      const session = await Session.createSessionFromSignature(prisma, args.challenge, args.signature);
      // const session = await Session.createSessionFromJWT(prisma, context);
      const expires = new Date(Date.now() + session.maxLifetime * 1000);
      /// See https://www.npmjs.com/package/apollo-server-plugin-http-headers for the magic that happens below ;)
      context.res?.cookie('session', session.sessionId, <any>{
        domain: process.env.EXTERNAL_DOMAIN,
        httpOnly: true,
        path: "/",
        sameSite: process.env.DEBUG ? "Strict" : "None",
        secure: !process.env.DEBUG,
        expires: expires
      });

      context.logger?.debug([{
        key: `call`,
        value: `/resolvers/mutation/verifySessionChallengeResolver.ts/verifySessionChallengeResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
      }], `Successfully exchanged a signed challenge for a session. The session is valid until ${expires.toJSON()}`, {
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
        value: `/resolvers/mutation/verifySessionChallengeResolver.ts/verifySessionChallengeResolver(prisma:PrismaClient)/async (parent: any, args: any, context: Context)`
      }], "Couldn't create the session cookie from the supplied signature.", e);

      return {
        success: false,
        errorMessage: "Couldn't create the session cookie from the supplied signature."
      }
    }
  }
}