import {IndexerEventProcessor} from "./indexerEventProcessor";

export class EmailNotificationProcessor implements IndexerEventProcessor {
    constructor() {
    }

    async onMessage(messageNo:number, sourceUrl:string, messageHashes:string[]) : Promise<void> {

    }
}