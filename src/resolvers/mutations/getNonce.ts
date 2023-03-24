import {Context} from "../../context";
import {MutationGetNonceArgs} from "../../types";
import {NonceManager} from "../../nonceManager/nonceManager";

export function getNonce(nonceManager: NonceManager) {
  return async (parent: any, args: MutationGetNonceArgs, context: Context) => {
    const nextNonce = await nonceManager.getNonce(context, args.data.signature, 30, args.data.address ?? undefined);
    return {
        nonce: nextNonce
    };
  }
}
