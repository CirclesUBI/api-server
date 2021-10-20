import {Context} from "../../context";
import {getPool} from "../resolvers";
import {AssetBalance} from "../../types";
import {profilesBySafeAddress, ProfilesBySafeAddressLookup} from "./profiles";
import {PrismaClient} from "../../api-db/client";

export function balancesByAsset(prisma:PrismaClient) {
    return async (parent:any, args:any, context:Context) => {
        const safeAddress = args.safeAddress.toLowerCase();

        const pool = getPool();
        try {
            const balanceQuery = `
                select *
                from crc_balances_by_safe_and_token_2 bst
                where bst.safe_address = $1;`;

            const balanceQueryParameters = [safeAddress];
            const balanceResult = await pool.query(balanceQuery, balanceQueryParameters);
            if (balanceResult.rows.length == 0) {
                return [];
            }

            const profileResolver = profilesBySafeAddress(prisma);
            const allSafeAddresses = balanceResult.rows.reduce((p,c) => {
                p[c.token_owner] = true;
                return p;
            },{});

            const profiles = await profileResolver(null, {safeAddresses:Object.keys(allSafeAddresses)}, context);
            const _profilesBySafeAddress = profiles.reduce((p,c) => {
                if (!c.circlesAddress)
                    return p;
                p[c.circlesAddress] = c;
                return p;
            }, <ProfilesBySafeAddressLookup>{});

            return balanceResult.rows.map(o => {
                return <AssetBalance>{
                    token_address: o.token,
                    token_owner_address: o.token_owner,
                    token_owner_profile: _profilesBySafeAddress[o.token_owner],
                    token_balance: o.balance
                };
            });
        } finally {
            await pool.end();
        }
    }
}