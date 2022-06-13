import {MutationProofUniquenessArgs, ProofUniquenessResult} from "../../types";
import {Context} from "../../context";
import {importJWK, jwtVerify} from "jose";
import {Environment} from "../../environment";
import fetch from "cross-fetch";
import {JobQueue} from "../../jobs/jobQueue";
import {AutoTrust} from "../../jobs/descriptions/maintenance/autoTrust";

export const proofUniqueness = async (parent:any, args: MutationProofUniquenessArgs, context:Context) => {
  const caller = await context.callerInfo;
  if (!caller?.profile?.circlesAddress) {
    throw new Error("You must have a complete profile to use this function.");
  }

  const tokenData = args.humanodeToken;
  const tokenDataObj = JSON.parse(tokenData);

  const request = await fetch(Environment.humanodeJwksUrl);
  const jwks:{keys:any[]} = <{keys:any[]}>await request.json();

  let sub:string|undefined = undefined;

  for (let i = 0; i < jwks.keys.length; i++) {
    const keyObj = jwks.keys[i];
    const key = await importJWK(keyObj);
    try {
      const verifyResult = await jwtVerify(tokenDataObj.access_token, key);
      if (verifyResult.payload.iss != Environment.humanodeIss || !verifyResult.payload.sub) {
        throw new Error(`Unknown issuer: ${verifyResult.payload.iss}`);
      }
      sub = verifyResult.payload.sub;
    } catch (e) {
      console.log(e);
    }
  }

  if (!sub){
    throw new Error(`Invalid token.`);
  }

  const exitingVerification = await Environment.readWriteApiDb.humanodeVerifications.findUnique({
    where: {
      sub: sub
    }
  });

  if (exitingVerification) {
    return <ProofUniquenessResult>{
      existingSafe: exitingVerification.circlesAddress
    }
  }

  await Environment.readWriteApiDb.humanodeVerifications.create({
    data: {
      circlesAddress: caller.profile.circlesAddress,
      token: tokenData,
      sub: sub,
      createdAt: new Date()
    }
  });

  // context.log(`Created a new verification: ${JSON.stringify({sub: sub, circlesAddress: caller.profile.circlesAddress})}`)
  console.log(`Creating an 'autoTrust' job for new humanode-verified safe ${caller.profile.circlesAddress}.`);
  await JobQueue.produce([new AutoTrust(Environment.humanodeOrgaSafeAddress, caller.profile.circlesAddress)]);

  return <ProofUniquenessResult>{
  };
}
