import {PrismaClient} from "../../api-db/client";
import {Context} from "../../context";
import {Session} from "../../session";
import {prisma_api_rw} from "../../apiDbClient";

export function verifySessionChallengeResolver(prisma:PrismaClient) {
  return async (parent: any, args: any, context: Context) => {
    try {
      const session = await Session.createSessionFromSignature(prisma, args.challenge, args.signature);
      // const session = await Session.createSessionFromJWT(prisma, context);
      const expires = new Date(Date.now() + session.maxLifetime * 1000);
      /// See https://www.npmjs.com/package/apollo-server-plugin-http-headers for the magic that happens below ;)
      context.res?.cookie('session', session.sessionToken, <any>{
        domain: process.env.EXTERNAL_DOMAIN,
        httpOnly: true,
        path: "/",
        sameSite: process.env.DEBUG ? "Strict" : "None",
        secure: !process.env.DEBUG,
        expires: expires
      });

      return {
        success: true
      }
    } catch (e) {
      return {
        success: false,
        errorMessage: "Couldn't create the session cookie from the supplied signature."
      }
    }
  }
}