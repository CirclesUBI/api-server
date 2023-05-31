import {Environment} from "../environment";

export function tryGetSessionToken(cookieValue?: string) {
  let sessionToken: string | undefined = undefined;
  if (cookieValue) {
    const cookies = cookieValue
      .split(";")
      .map((o: string) => o.trim().split("="))
      .reduce((p: { [key: string]: any }, c: string[]) => {
        p[c[0]] = c[1];
        return p;
      }, {});

    Environment.externalDomains.forEach((externalDomain) => {
        if (cookies[`session_${externalDomain.replace(/\./g, "_")}`]) {
            sessionToken = decodeURIComponent(cookies[`session_${externalDomain.replace(/\./g, "_")}`]);
        }
    });
  }
  return sessionToken;
}
