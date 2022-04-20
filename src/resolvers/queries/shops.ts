import {Context} from "../../context";
import {Organisation, Shop} from "../../types";
import {Environment} from "../../environment";

export const shops = async (parent: any, args: any, context: Context) => {
    const shops = await Environment.readWriteApiDb.shop.findMany({
        where: {
            enabled: true,
            owner: {
                type: "ORGANISATION"
            }
        },
        include: {
            owner: true
        },
        orderBy: {
            sortOrder: "asc"
        }
    });
    return shops.map(o => {
        return <Shop>{
            ...o,
            owner: <Organisation>{
                ...o.owner,
                createdAt: o.createdAt.toJSON(),
                name: o.owner.firstName
            }
        }
    });
}