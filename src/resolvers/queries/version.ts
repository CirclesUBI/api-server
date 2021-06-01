import {Version} from "../../types";

export function version(packageJson:any) {
    return async () => {
        const version = packageJson.version.split(".");
        return <Version>{
            major: version[0],
            minor: version[1],
            revision: version[2]
        }
    }
}