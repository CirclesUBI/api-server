import {ApolloServer} from "apollo-server";
const { print } = require('graphql');

// TODO: Migrate to GraphQL-tools: https://www.graphql-tools.com/docs/migration-from-import/
import {importSchema} from "graphql-import";
import {Context} from "./context";
import {resolvers} from "./resolvers/resolvers";
import {Resolvers} from "./types";
import {Session} from "./session";
const httpHeadersPlugin = require("apollo-server-plugin-http-headers");

if (!process.env.CORS_ORIGNS) {
    throw new Error("No CORS_ORIGNS env variable");
}

const corsOrigins = process.env.CORS_ORIGNS.split(";").map(o => o.trim());

export class Main
{
    private readonly _server: ApolloServer;
    private readonly _resolvers: Resolvers;

    constructor()
    {
        const apiSchemaTypeDefs = importSchema("../src/server-schema.graphql");
        this._resolvers = resolvers;

        console.log("cors origins: ", corsOrigins);

        this._server = new ApolloServer({
            // extensions: [() => new BasicLogging()],
            plugins: [httpHeadersPlugin],
            context: Context.create,
            typeDefs: apiSchemaTypeDefs,
            resolvers: this._resolvers,
            cors: {
                origin: corsOrigins,
                credentials: true
            },
            formatError: (err) => {
                const errorId = Session.generateRandomBase64String(8);
                console.error({
                    timestamp: new Date().toJSON(),
                    errorId: errorId,
                    error: JSON.stringify(err)
                });
                return {
                    path: err.path,
                    message: `An error occurred while processing your request. `
                        + `If the error persists contact the admins at '${process.env.ADMIN_EMAIL}' `
                        + `and include the following error id in your request: `
                        + `'${errorId}'`
                }
            }
        });
    }

    async run()
    {
        await this._server.listen({
            port: parseInt("8989")
        }).then(o => {
            console.log("listening at port 8989")
        });
    }
}

new Main()
    .run()
    .then(() => "Running");
