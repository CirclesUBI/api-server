import {ExecutionParams} from "subscriptions-transport-ws";
import {Request} from "express";
import {Session as PrismaSession} from "./api-db/client";
import {Session} from "./session";
import {prisma_api_ro, prisma_api_rw} from "./apiDbClient";
import {Logger, newLogger} from "./logger";


export class Context {
    readonly id: string;
    readonly isSubscription: boolean;

    readonly jwt?: string;
    readonly originHeaderValue?: string;
    readonly sessionId?: string;
    readonly ipAddress?:string;

    readonly setCookies:Array<any> = [];
    readonly setHeaders:Array<any> = [];

    private _logger:Logger|undefined;

    get logger() {
        return this._logger;
    }

    constructor(id: string, isSubscription: boolean, logger:Logger, jwt?: string, originHeaderValue?: string, sessionId?: string, ipAddress?:string) {
        this.isSubscription = isSubscription;
        this._logger = logger;
        this.jwt = jwt;
        this.originHeaderValue = originHeaderValue;
        this.sessionId = sessionId;
        this.ipAddress = ipAddress;
        this.id = id;
    }

    public static create(arg: { req?: Request, connection?: ExecutionParams }): Context {
        const contextId = Session.generateRandomBase64String(8);
        const remoteIp = (arg.req?.header('x-forwarded-for') || arg.req?.connection.remoteAddress) ?? "<unknown ip>";
        const defaultTags = [{
            key: `contextId`,
            value: contextId
        }, {
            key: `clientIp`,
            value: remoteIp
        }];
        const logger = newLogger(defaultTags);

        let isSubscription = false;
        let authorizationHeaderValue: string | undefined;
        let originHeaderValue: string | undefined;
        let cookieValue: string | undefined;

        if (arg.req && !arg.connection) {
            // HTTP
            originHeaderValue = arg.req.headers.origin;
            authorizationHeaderValue = arg.req.headers.authorization;
            cookieValue = arg.req.headers["cookie"];
            defaultTags.push({
                key: `protocol`,
                value: `http`
            });
            logger.info([], `Connected via HTTP.`)
        }

        if (!arg.req && arg.connection) {
            // WS
            isSubscription = true;
            originHeaderValue = arg.connection.context.origin;
            authorizationHeaderValue = arg.connection.context.authorization;
            defaultTags.push({
                key: `protocol`,
                value: `ws`
            });
            logger.info([], `Connected via WS.`)
        }

        let sessionId:string|undefined = undefined;
        if (cookieValue) {
            const cookies = cookieValue.split(";").map(o => o.trim().split("=")).reduce((p:{[key:string]:any},c) => { p[c[0]] = c[1]; return p}, {});
            if (cookies["session"]) {
                sessionId = decodeURIComponent(cookies["session"]);
            }
        }

        return new Context(
            contextId,
            isSubscription,
            logger,
            authorizationHeaderValue,
            originHeaderValue,
            sessionId,
            remoteIp);
    }

    async verifySession(extendIfValid?:boolean) : Promise<PrismaSession> {
        this._logger?.debug([{
            key: `call`,
            value: `/context.ts/verifySession()`
        }]);

        if (!this.sessionId) {
            this._logger?.error([{
                key: `call`,
                value: `/context.ts/verifySession()`
            }], `No session id on context.`);
            throw new Error("No session id on context.");
        }

        const validSession = await Session.findSessionBySessionId(prisma_api_ro, this.sessionId)
        if (!validSession) {
            const errorMsg = `No session could be found for the supplied sessionId ('${this.sessionId ?? "<undefined or null>"}')`;
            this._logger?.error([{
                key: `call`,
                value: `/context.ts/verifySession()`
            }], errorMsg);
            throw new Error(errorMsg);
        }

        if (extendIfValid) {
            await Session.extendSession(prisma_api_rw, validSession);
        }

        this._logger?.debug([{
            key: `call`,
            value: `/context.ts/verifySession()`
        }], `Session valid until ${new Date(new Date(validSession.createdAt).getTime() + validSession.maxLifetime).toJSON()}`);

        return validSession;
    }
}