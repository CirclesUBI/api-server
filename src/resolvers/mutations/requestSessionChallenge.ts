import {Context} from "../../context";
import {Session} from "../../session";
import {prisma_api_rw} from "../../apiDbClient";
import {MutationRequestSessionChallengeArgs} from "../../types";

export const requestSessionChallenge = async (parent:any, args: MutationRequestSessionChallengeArgs, context: Context) => {
  return await Session.requestSessionFromSignature(prisma_api_rw, args.address);
}