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
    if (cookies["session"]) {
      sessionToken = decodeURIComponent(cookies["session"]);
    }
  }
  return sessionToken;
}