import {ExecutionParams} from "subscriptions-transport-ws";
import {Request, Response} from "express";
import {Session as PrismaSession} from "./api-db/client";
import {Session} from "./session";
import {prisma_api_ro, prisma_api_rw} from "./apiDbClient";
import {Profile} from "./api-db/client";

export class Context {
    readonly id: string;
    readonly isSubscription: boolean;

    readonly jwt?: string;
    readonly originHeaderValue?: string;
    readonly sessionId?: string;
    readonly sessionToken?: string;
    readonly ipAddress?:string;

    readonly setCookies:Array<any> = [];
    readonly setHeaders:Array<any> = [];
    readonly req?: Request;
    readonly res?: Response;


    constructor(id: string, isSubscription: boolean, jwt?: string, originHeaderValue?: string, sessionToken?: string, ipAddress?:string, req?: Request, res?: Response, sessionId?:string) {
        this.isSubscription = isSubscription;
        this.jwt = jwt;
        this.originHeaderValue = originHeaderValue;
        this.sessionToken = sessionToken;
        this.ipAddress = ipAddress;
        this.id = id;
        this.req = req;
        this.res = res;
        this.sessionId = sessionId;
    }

    public static async create(arg: { req?: Request, connection?: ExecutionParams, res?: Response }): Promise<Context> {
        const contextId = Session.generateRandomBase64String(8);
        const remoteIp = (arg.req?.header('x-forwarded-for') || arg.req?.connection.remoteAddress) ?? "<unknown ip>";

        let isSubscription = false;
        let authorizationHeaderValue: string | undefined;
        let originHeaderValue: string | undefined;
        let cookieValue: string | undefined;

        if (arg.req && !arg.connection) {
            // HTTP
            originHeaderValue = arg.req.headers.origin;
            authorizationHeaderValue = arg.req.headers.authorization;
            cookieValue = arg.req.headers["cookie"];
        }

        if (!arg.req && arg.connection) {
            // WS
            isSubscription = true;
            originHeaderValue = arg.connection.context.origin;
            authorizationHeaderValue = arg.connection.context.authorization;
        }

        let sessionToken:string|undefined = undefined;
        let session:PrismaSession|null = null;

        if (cookieValue) {
            const cookies = cookieValue.split(";").map(o => o.trim().split("=")).reduce((p:{[key:string]:any},c) => { p[c[0]] = c[1]; return p}, {});
            if (cookies["session"]) {
                sessionToken = decodeURIComponent(cookies["session"]);
                session = await Context.findSession(sessionToken);
            }
        }

        return new Context(
            contextId,
            isSubscription,
            authorizationHeaderValue,
            originHeaderValue,
            sessionToken,
            remoteIp,
            arg.req,
            arg.res,
            session?.id);
    }

    async verifySession(extendIfValid?:boolean) : Promise<PrismaSession> {
        if (!this.sessionToken) {
            throw new Error("No session id on context.");
        }

        const validSession = await Session.findSessionBysessionToken(prisma_api_ro, this.sessionToken)
        if (!validSession) {
            const errorMsg = `No session could be found for the supplied sessionToken ('${this.sessionToken ?? "<undefined or null>"}')`;
            throw new Error(errorMsg);
        }

        if (extendIfValid) {
            await Session.extendSession(prisma_api_rw, validSession);
        }

        return validSession;
    }

    static async findSession(sessionToken?:string) : Promise<PrismaSession|null> {
        if (!sessionToken) return null;
        return await Session.findSessionBysessionToken(prisma_api_ro, sessionToken)
    }

    private _callerInfo:{ session: PrismaSession, profile: Profile|null }|null = null;
    get callerInfo() : Promise<{ session: PrismaSession, profile: Profile|null }|null> {
        if (this._callerInfo === null) {
            return this.verifySession().then(async session => {
                const p = await prisma_api_ro.profile.findUnique({
                    where: {
                        id: session.profileId ?? undefined
                    }
                });
                this._callerInfo = {
                    session: session,
                    profile: p
                };
                return this._callerInfo;
            });
        } else {
            return Promise.resolve(this._callerInfo);
        }
    }
}