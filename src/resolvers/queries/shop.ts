import {Context} from "../../context";
import {Organisation, QueryShopArgs, Shop} from "../../types";
import {Environment} from "../../environment";

export const shop = async (parent: any, args: QueryShopArgs, context: Context) => {
    const shops = await Environment.readWriteApiDb.shop.findMany({
        where: {
            id: args.id,
            enabled: true
        },
        include: {
            owner: true
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
    const shop = shops.map(o => {
        return <Shop>{
            ...o,
            owner: <Organisation>{
                ...o.owner,
                createdAt: o.createdAt.toJSON(),
                name: o.owner.firstName
            }
        }
    });
    return shop.length > 0 ? shop[0] : null;
}