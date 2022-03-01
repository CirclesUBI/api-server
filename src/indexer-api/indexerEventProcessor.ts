export type IndexerEvent = {
    type: "CrcSignup"
        | "CrcTrust"
        | "CrcOrganisationSignup"
        | "CrcHubTransfer"
        | "Erc20Transfer"
        | "EthTransfer"
        | "GnosisSafeEthTransfer",
    hash: string,
    address1: string,
    address2: string,
    address3: string,
    value: string
}

export interface IndexerEventProcessor {
    onMessage(
        messageNo:number,
        sourceUrl:string,
        affectedAddresses:string[],
        events:IndexerEvent[]
    ) : Promise<void>;
}