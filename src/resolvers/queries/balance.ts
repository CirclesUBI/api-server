import {Context} from "../../context";
import {getPool} from "../resolvers";

export function balance() {
    return async (parent:any, args:any, context:Context) : Promise<string> => {
        const safeAddress = args.safeAddress.toLowerCase();

        const pool = getPool();
        try {
            const balanceQuery = `
                select *
                from crc_balances_by_safe
                where safe_address = $1;`;

            const balanceQueryParameters = [safeAddress];
            const balanceResult = await pool.query(balanceQuery, balanceQueryParameters);
            if (balanceResult.rows.length == 0) {
                return "0";
            }

            return balanceResult.rows[0].balance;
        } catch (e) {
            const e2 = new Error(e.message + e.stackTrace);
            console.log(e2);
            throw e2;
        } finally {
            await pool.end();
        }
    }
}