import { DeliveryMethod } from "../../types";
import { Context } from "../../context";
import { Environment } from "../../environment";

export function deliveryMethods() {
  return async (parent: any, args: any, context: Context) => {
    const deliveryMethods = await Environment.readonlyApiDb.deliveryMethod.findMany();

    return deliveryMethods.map(
      (o) =>
        <DeliveryMethod>{
          name: o.name,
          id: o.id,
        }
    );
  };
}
