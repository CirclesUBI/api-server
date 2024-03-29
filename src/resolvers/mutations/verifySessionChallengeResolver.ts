import {PrismaClient} from "../../api-db/client";
import {Context} from "../../context";
import {Session} from "../../session";
import {Environment} from "../../environment";

export function verifySessionChallengeResolver(prisma:PrismaClient) {
  return async (parent: any, args: any, context: Context) => {
    try {
      const session = await Session.createSessionFromSignature(prisma, args.challenge, args.signature);
      // const session = await Session.createSessionFromJWT(prisma, context);
      // const expires = new Date(Date.now() + session.maxLifetime * 1000);
      /// See https://www.npmjs.com/package/apollo-server-plugin-http-headers for the magic that happens below ;)

      Environment.externalDomains.forEach((externalDomain) => {
        context.res?.cookie(`session_${externalDomain.replace(/\./g, "_")}`, session.sessionToken, <any>{
          domain: externalDomain,
          httpOnly: true,
          path: "/",
          sameSite: Environment.cookieSameSitePolicy,
          secure: !Environment.cookieSecurePolicy ? undefined : "Secure",
          //expires: expires
        });
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
