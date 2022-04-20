import {Context} from "../../context";
import {Environment} from "../../environment";
import {Generate} from "../../utils/generate";
const nodeJose = require('node-jose');

export const clientAssertionJwt = async (parent: any, args: any, context: Context) => {
    const callerInfo = await context.callerInfo;
    if (!callerInfo?.profile?.circlesAddress) {
        throw new Error(`You need a completed profile to use this feature.`);
    }

    const privateKeyObj = await Environment.readonlyApiDb.jwks.findFirst({
        where: {},
        orderBy: {createdAt: "desc"}
    });
    if (!privateKeyObj) {
        throw new Error(`No signing key available.`);
    }

    const clientId = "circles-ubi-jwks";
    const iat = Date.now();
    const exp = iat + 5 * 60 * 1000;

    const payload = JSON.stringify({
        jti: Generate.randomHexString(),
        iss: clientId,
        sub: clientId,
        aud: "https://auth.staging.oauth2.humanode.io/oauth2/auth",
        iat: iat,
        exp: exp
    });

    const opt = {
        compact: true,
        jwk: privateKeyObj
    }
    const token = await nodeJose.JWS
      .createSign(opt, privateKeyObj)
      .update(payload)
      .final();

    return token;
}