export type LoggerTag = {
  key:string;
  value:string;
};
export type Logger = {
    parent?: Logger;
    defaultTags: LoggerTag[],
    debug: (tags:LoggerTag[], ...args: unknown[]) => void,
    info: (tags:LoggerTag[], ...args: unknown[]) => void,
    trace: (tags:LoggerTag[], ...args: unknown[]) => void,
    warning: (tags:LoggerTag[], ...args: unknown[]) => void,
    error: (tags:LoggerTag[], ...args: unknown[]) => void,
    fatal: (tags:LoggerTag[], ...args: unknown[]) => void,
    log: (severity:string, tags:LoggerTag[], ...args: unknown[]) => void,
    newLogger: (name: string) => Logger
}

export function newLogger(defaultTags:LoggerTag[], parent?: Logger, send?: (message: {
    timestamp: number,
    message: string,
    args?: unknown[],
    tags?:LoggerTag[]
}) => void) {
    const l: Logger = {
        defaultTags: defaultTags.concat(parent?.defaultTags ?? []),
        parent,
        newLogger: (name: string) => newLogger(defaultTags, l, send),
        debug: (tags, ...args: unknown[]) => l.log("DEBUG", l.defaultTags.concat(tags), args),
        info: (tags, ...args: unknown[]) => l.log("INFO", l.defaultTags.concat(tags), args),
        trace: (tags, ...args: unknown[]) => l.log("TRACE", l.defaultTags.concat(tags), args),
        warning: (tags, ...args: unknown[]) => l.log("WARNING", l.defaultTags.concat(tags), args),
        error: (tags, ...args: unknown[]) => l.log("ERROR", l.defaultTags.concat(tags), args),
        fatal: (tags, ...args: unknown[]) => l.log("FATAL", l.defaultTags.concat(tags), args),
        log: (severity:string, tags:LoggerTag[], ...args: unknown[]) => {
            if (severity === "TRACE")
                return;
            if (args?.length) {
                let current: Logger | undefined = l;
                const remainingArgs = args.splice(1);
                const tagsString = `${tags.map(o => `${o.key}:${o.value}`).join(`;`)}`;
                if (remainingArgs.length) {
                    console.log(`${Date.now()} [${severity}] [${tagsString}]: ${args[0]}`, remainingArgs);
                    if (!send)
                        return;
                    send({
                        timestamp: Date.now(),
                        message: `${args[0]}`,
                        args: remainingArgs,
                        tags: tags
                    });
                } else {
                    console.log(`${Date.now()} [${severity}] [${tagsString}]: ${args[0]}`);
                    if (!send)
                        return;
                    send({
                        timestamp: Date.now(),
                        message: `${args[0]}`,
                        tags: tags
                    });
                }
            }
        }
    };

    return l;
}
