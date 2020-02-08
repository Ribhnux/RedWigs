import { ApolloServer, IResolvers, mergeSchemas } from "apollo-server";
import listenHandler from "./handlers/listen";
import { schema as serverSchema } from "./scopes/server";
import { schema as redisCommandSchema } from "./scopes/commands";

const mergedSchema = mergeSchemas({
  schemas: [redisCommandSchema, serverSchema]
});

const serverOptions = {
  schema: mergedSchema
};

const server = new ApolloServer(serverOptions);
server.listen().then(listenHandler);
