import {PrismaClient, CirclesToken, CirclesWalletKnownTokens} from '@prisma/client'
import {CirclesWallet} from "../../../types";
import {Context} from "../../../context";

export function tokensResolver(prisma:PrismaClient) {
    return async (parent: CirclesWallet, args:any, context: Context) => {
        /*
        const subjectWallet = await prisma.circlesWallet.findUnique({
            where: {
                id: parent.id
            },
            include: {
                knownTokens: {
                    include: {
                        token: true
                    }
                }
            }
        });
        if (!subjectWallet) {
            throw new Error(`Couldn't find a wallet with address ${parent.address}`);
        }
        return subjectWallet.knownTokens.map((knownToken:(CirclesWalletKnownTokens & {token:CirclesToken})) => {
            return {
                ...knownToken.token,
                createdAt: knownToken.token.createdAt.toJSON()
            };
        });
         */
        return {
        }
    };
}