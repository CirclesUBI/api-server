import {Environment} from "./environment";

export function log(prefix: string, identifiers:string, message: string) {
    console.log(
        `${prefix}[${new Date().toJSON()}] [${Environment.instanceId}] ${identifiers}: ${message}`
    );
}

export function logErr(prefix: string, identifiers:string, message: string) {
    console.error(
        `${prefix}[${new Date().toJSON()}] [${Environment.instanceId}] ${identifiers}: ${message}`
    );
}