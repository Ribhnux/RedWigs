import { ApolloServer, mergeSchemas } from "apollo-server-express";
import { schema as serverSchema } from "./scopes/server";
import { schema as redisCommandSchema } from "./scopes/commands";
import express, { Request, Response } from "express";
import http from "http";
import listenHandler from "@handlers/listen";
import {
  onSubscriptionConnect,
  onSubscriptionDisconnect,
} from "@handlers/subscriber";

// import { getChannelNamesFromQuery } from "@utils/subscribe";

const mergedSchema = mergeSchemas({
  schemas: [redisCommandSchema, serverSchema],
});

const PORT = 4000;
const app = express();
const httpServer = http.createServer(app);

app.get("/", (req: Request, res: Response) =>
  res
    .status(404)
    .send({ message: "Resource Not Found", endpoints: { graphql: "/graphql" } })
);

const server = new ApolloServer({
  schema: mergedSchema,
  subscriptions: {
    onConnect: onSubscriptionConnect,
    onDisconnect: onSubscriptionDisconnect,
  },
});
server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, listenHandler(server, PORT));
