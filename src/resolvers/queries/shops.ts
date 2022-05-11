import {Context} from "../../context";
import {DeliveryMethod, Organisation, QueryShopsArgs, QueryShopsByIdArgs, Shop} from "../../types";
import {Environment} from "../../environment";
import {canAccessShop} from "../../utils/ensureCanAccessShop";

export const shops = async (parent: any, args: QueryShopsArgs, context: Context) => {
    const shops = await Environment.readWriteApiDb.shop.findMany({
        where: {
            owner: {
                type: "ORGANISATION"
            },
            ...(args.ownerId ? {ownerId: args.ownerId} : {})
        },
        include: {
            owner: true,
            deliveryMethods: {
                include: {
                    deliveryMethod: true
                }
            }
        },
        orderBy: {
            sortOrder: "asc"
        }
    });

    const enabledShops = shops.filter(o => o.enabled);
    let disabledShops = shops.filter(o => !o.enabled && args.ownerId);

    // Check accessibility for each disabled shop (only owners and collaborators should see it).
    disabledShops = (await Promise.all(disabledShops.map(async o => {
          return {
              canAccess: await canAccessShop(o.id, <number>args.ownerId, context),
              shop: o
          }
      })))
      .filter(o => o.canAccess)
      .map(o => o.shop);

    return [...enabledShops, ...disabledShops].map(o => {
        return <Shop>{
            ...o,
            owner: <Organisation>{
                ...o.owner,
                createdAt: o.createdAt.toJSON(),
                name: o.owner.firstName
            },
            deliveryMethods: o.deliveryMethods.map(p => {
                return <DeliveryMethod>{
                    id: p.deliveryMethod.id,
                    name: p.deliveryMethod.name
                };
            })
        }
    });
}



export const shopsById = async (parent: any, args: QueryShopsByIdArgs, context: Context) => {
    const shops = await Environment.readWriteApiDb.shop.findMany({
        where: {
            owner: {
                type: "ORGANISATION"
            },
            id: {
                in: args.ids
            },
            enabled: true
        },
        include: {
            owner: true,
            deliveryMethods: {
                include: {
                    deliveryMethod: true
                }
            }
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
            },
            deliveryMethods: o.deliveryMethods.map(p => {
                return <DeliveryMethod>{
                    id: p.deliveryMethod.id,
                    name: p.deliveryMethod.name
                };
            })
        }
    });
}
