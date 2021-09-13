import {Context} from "../../context";
import {Pool} from "pg";

export function balance(pool:Pool) {
    return async (parent:any, args:any, context:Context) : Promise<string> => {
        const safeAddress = args.safeAddress.toLowerCase();

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
    }
}