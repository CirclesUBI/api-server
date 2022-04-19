import {Request, Response} from "express";
import {log} from "../../utils/log";
import {Environment} from "../../environment";
const jose = require('node-jose');

export const jwksGetHandler = async (req: Request, res: Response) => {
  try {
    const oneWeekWorthOfKeys = await Environment.readonlyApiDb.jwks.findMany({
      where: {
        createdAt: {
          gt: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000))
        }
      },
      // Select only the public part of the key
      select: {
        kty: true,
        kid: true,
        use: true,
        alg: true,
        e: true,
        n: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const ks = jose.JWK.asKeyStore({
      keys: oneWeekWorthOfKeys
    });
    res.send(ks.toJSON());
  } catch (e) {
    log(`ERR  `,
      `[${req.ip}; ${req.headers["user-agent"]}] [hash: ${req.query.hash}] [jwksGetHandler]`,
      `The handler failed to execute:`, e);

    res.statusCode = 500;
    res.send("Internal server error");
  }
}