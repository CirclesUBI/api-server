import {PrismaClient} from "@prisma/client";

export class InitDb {

    public static readonly Tag_Marketplace_Offer_Category = "o-marketplace:offer:category:1";

    static readonly requiredTagTypes = {
        [InitDb.Tag_Marketplace_Offer_Category]: true
    };

    static async run(prisma:PrismaClient) {
        this.insertMissingTagTypes(prisma);
    }

    private static async insertMissingTagTypes(prisma:PrismaClient) {
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
                data: Object.keys(allMissingTagTypes).map(o => {
                    return {
                        id: o
                    }
                })
            });
            console.log(`InitDb inserted the missing tag types.`);
        }
    }
}