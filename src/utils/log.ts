import {Environment} from "../environment";

export function log(prefix: string, identifiers:string, message: string, obj?:any) {
    const msg = `${prefix}[${new Date().toJSON()}] [${Environment.instanceId}] ${identifiers}: ${message}`;
    if (!obj)
        console.log(msg);
    else
        console.log(msg, obj)
}

export function logErr(prefix: string, identifiers:string, message: string) {
    console.error(
        `${prefix}[${new Date().toJSON()}] [${Environment.instanceId}] ${identifiers}: ${message}`
    );
}