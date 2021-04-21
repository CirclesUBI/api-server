import {ExecutionParams} from "subscriptions-transport-ws";
import {Request} from "express";
import {Session as PrismaSession} from "@prisma/client";
import {Session} from "./session";
import {prisma_ro} from "./prismaClient";

export class Context {
    readonly isSubscription: boolean;

    readonly jwt?: string;
    readonly originHeaderValue?: string;
    readonly sessionId?: string;
    readonly ipAddress?:string;

    readonly setCookies:Array<any> = [];
    readonly setHeaders:Array<any> = [];

    private constructor(isSubscription: boolean, jwt?: string, originHeaderValue?: string, sessionId?: string, ipAddress?:string) {
        this.isSubscription = isSubscription;
        this.jwt = jwt;
        this.originHeaderValue = originHeaderValue;
        this.sessionId = sessionId;
        this.ipAddress = ipAddress;
    }

    public static create(arg: { req?: Request, connection?: ExecutionParams }): Context {
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

        let sessionId:string|undefined = undefined;
        if (cookieValue) {
            const cookies = cookieValue.split(";").map(o => o.trim().split("=")).reduce((p:{[key:string]:any},c) => { p[c[0]] = c[1]; return p}, {});
            if (cookies["session"]) {
                sessionId = decodeURIComponent(cookies["session"]);
            }
        }
        const remoteIp = (arg.req?.header('x-forwarded-for') || arg.req?.connection.remoteAddress) ?? "<unknown ip>";
        return new Context(isSubscription, authorizationHeaderValue, originHeaderValue, sessionId, remoteIp);
    }

    async verifySession() : Promise<PrismaSession> {
        if (!this.sessionId)
            throw new Error("No session id on context.");

        const validSession = await Session.findSessionBySessionId(prisma_ro, this.sessionId)
        if (!validSession)
            throw new Error(`No session could be found for the supplied sessionId ('${this.sessionId ?? "<undefined or null>"}')`);

        return validSession;
    }
}