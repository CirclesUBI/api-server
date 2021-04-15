import {Maybe, Resolver, ResolversParentTypes, ResolversTypes} from "../../types";

export const serverResolver:Resolver<Maybe<ResolversTypes['Omo']>, ResolversParentTypes['Query'], any> = parent => {
    return {
        version: "0.0.4"
    }
}