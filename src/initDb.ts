import {PrismaClient} from "@prisma/client";
import {BN} from "ethereumjs-util";

export type TypeTagType = "o-marketplace:offer" | "o-banking:transfer" | "o-banking:trust";
export interface ITypeTag {
    type: TypeTagType;
}

export interface Type_Banking_Transfer_Data extends ITypeTag {
    type: "o-banking:transfer",
    from: string;
    to: string;
    value: BN;
    symbol: string;
}
export interface Type_Banking_Trust_Data extends ITypeTag {
    type: "o-banking:trust",
    canSendTo: string;
    user: string;
    limit: BN;
}

export class InitDb {

    public static readonly Type_Marketplace_Offer = "o-marketplace:offer";
    public static readonly Tag_Marketplace_Offer_Category = "o-marketplace:offer:category:1";
    public static readonly Tag_Marketplace_Offer_DeliveryTerms = "o-marketplace:offer:deliveryTerms:1";
    public static readonly Tag_Marketplace_Offer_Unit = "o-marketplace:offer:unit:1";

    public static readonly Type_Banking_Transfer = "o-banking:transfer";
    public static readonly Tag_Banking_Transfer_TransitivePath = `${InitDb.Type_Banking_Transfer}:transitivePath:1`;
    public static readonly Tag_Banking_Transfer_Message = `${InitDb.Type_Banking_Transfer}:message:1`;

    public static readonly Type_Banking_Trust = "o-banking:trust";
    public static readonly Tag_Banking_Trust_Message = `${InitDb.Type_Banking_Trust}:message:1`;

    static readonly requiredTagTypes = {
        [InitDb.Type_Marketplace_Offer]: true,
        [InitDb.Type_Banking_Transfer]: true,
        [InitDb.Type_Banking_Trust]: true,
        [InitDb.Tag_Marketplace_Offer_Category]: true,
        [InitDb.Tag_Marketplace_Offer_DeliveryTerms]: true,
        [InitDb.Tag_Marketplace_Offer_Unit]: true,
        [InitDb.Tag_Banking_Transfer_TransitivePath]: true,
        [InitDb.Tag_Banking_Transfer_Message]: true,
        [InitDb.Tag_Banking_Trust_Message]: true
    };

    static async run(prisma:PrismaClient) {
        await this.insertMissingTagTypes(prisma);
    }

    private static async insertMissingTagTypes(prisma:PrismaClient) {
        // TODO: If run in parallel only one will succeed
        const allTagTypes = await prisma.tagType.findMany();
        const allExistingTagTypes: {[type:string]:boolean} = allTagTypes.reduce((p,c) => {
            if (!p[c.id]) {
                p[c.id] = true;
            }
            return p;
        },<{[x:string]:boolean}>{});
        const allMissingTagTypes = Object.keys(this.requiredTagTypes).filter(o => !allExistingTagTypes[o]);

        console.log(`InitDb found ${allMissingTagTypes.length} missing tag types: `, allMissingTagTypes);

        if (allMissingTagTypes.length) {
            console.log(`InitDb inserting the missing tag types ..`);
            await prisma.tagType.createMany({
                data: allMissingTagTypes.map(o => {
                    return {
                        id: o
                    }
                })
            });
            console.log(`InitDb inserted the missing tag types.`);
        }
    }
}