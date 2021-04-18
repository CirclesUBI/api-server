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

    readonly setCookies:Array<any> = [];
    readonly setHeaders:Array<any> = [];

    private constructor(isSubscription: boolean, jwt?: string, originHeaderValue?: string, sessionId?: string) {
        this.isSubscription = isSubscription;
        this.jwt = jwt;
        this.originHeaderValue = originHeaderValue;
        this.sessionId = sessionId;
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
        const cookieValueStartIndex = cookieValue?.indexOf("=");
        if(cookieValueStartIndex && cookieValue && cookieValue.substr(0, cookieValueStartIndex) == "session") {
            sessionId = decodeURIComponent(cookieValue.substring(cookieValueStartIndex + 1));
            console.log("sessionId: " + sessionId);
        }

        return new Context(isSubscription, authorizationHeaderValue, originHeaderValue, sessionId);
    }

    async verifySession() : Promise<PrismaSession> {
        if (!this.sessionId)
            throw new Error("No session id on context.");

        const validSession = await Session.findSessionBySessionId(prisma_ro, this.sessionId)
        if (!validSession)
            throw new Error("No session could be found for the supplied sessionId");

        return validSession;
    }
}