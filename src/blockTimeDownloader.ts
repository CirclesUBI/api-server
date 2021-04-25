import {prisma_rw} from "./prismaClient";
import {BlockTimeDownloaderState, BlockTimeDownloader as DBBlockTimeDownloader} from "@prisma/client";
import {DelayedTrigger} from "./delayedTrigger";
import {RpcGateway} from "./rpcGateway";

export class BlockTimeDownloader {
    readonly _instanceId:string;
    static readonly triggerInterval:number = 1000;
    pause:number = 0;

    /**
     * If this is currently active keyRotator.
     */
    get isActive() {
        return this._isActive;
    }
    private _isActive:boolean = false;

    _blockTimeDownloader:DBBlockTimeDownloader|null = null;

    constructor(instanceId:string) {
        this._instanceId = instanceId;

        setInterval(async () =>
        {
            // Check if there is already a valid KeyRotator (requested or active) in the system
            const now = new Date();
            this._blockTimeDownloader = await prisma_rw.blockTimeDownloader.findFirst({
                where: {
                    validTo: {
                        gt: now
                    }
                }
            });

            if (this._blockTimeDownloader
                && this._blockTimeDownloader.instanceId != this._instanceId) {
                // There is already a keyRotator and its not me :(
                return;
            }

            if (this._blockTimeDownloader
                && this._blockTimeDownloader.instanceId == this._instanceId
                && this._blockTimeDownloader.state == BlockTimeDownloaderState.Active) {
                // I'm the key-rotator, keep it this way
                await prisma_rw.blockTimeDownloader.update({
                    where: {
                        id: this._blockTimeDownloader.id
                    },
                    data: {
                        validTo: new Date(now.getTime() + BlockTimeDownloader.triggerInterval * 2)
                    }
                });

                // Fulfil the keyRotator's duty ..
                await this._triggerWork();
                return;
            }

            if (this._blockTimeDownloader
                && this._blockTimeDownloader.instanceId == this._instanceId
                && this._blockTimeDownloader.state == BlockTimeDownloaderState.Requested
                && !this.pause) {
                // I'm becoming the key-rotator
                console.log("This instance was elected as blockTimeDownloader")
                await prisma_rw.blockTimeDownloader.update({
                    where: {
                        id: this._blockTimeDownloader.id
                    },
                    data: {
                        state: BlockTimeDownloaderState.Active,
                        validTo: new Date(now.getTime() + BlockTimeDownloader.triggerInterval * 2)
                    }
                });
                return;
            }

            // None of the previous conditions matched,
            // request to become the key-rotator.
            console.log("Applying as blockTimeDownloader")
            if (!this.pause) {
                await prisma_rw.blockTimeDownloader.create({
                    data: {
                        instanceId: this._instanceId,
                        state: BlockTimeDownloaderState.Requested,
                        validTo: new Date(now.getTime() + BlockTimeDownloader.triggerInterval * 2)
                    }
                });
            }
        }, BlockTimeDownloader.triggerInterval);
    }

    /**
     * Checks if a valid key pair exists. If not, a new one is created.
     * @private
     */
    delayedTrigger = new DelayedTrigger<void>(10, async () => {
        // RpcGateway.get().eth.getBlockNumber()
        try {
        } catch (e) {
            this.pause = 10; // Don't trigger for 10 rounds and also don't apply as downloader
        }
    });

    private async _triggerWork()
    {
        this.delayedTrigger.trigger();
    }
}