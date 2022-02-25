export type IndexerEvent = {
    type: string,
    hash: string,
    address1: string,
    address2: string,
    address3: string
}

export interface IndexerEventProcessor {
    onMessage(
        messageNo:number,
        sourceUrl:string,
        affectedAddresses:string[],
        events:IndexerEvent[]
    ) : Promise<void>;
}