import express from "express";
import graphqlHTTP from "express-graphql";
import { schemaInitialization } from "./init";
import { subscribeOnSchemaChange } from "./pubsub";
import { IndexHandler } from "../handlers/index";
import { graphQLHTTPHandler } from "../handlers/graphql";
import { startServerHandler } from "../handlers/server";
import { notFoundHandler } from "../handlers/error";

export const bootstrap = async () => {
  await schemaInitialization();
  subscribeOnSchemaChange();

  const app = express();
  app.get("/", IndexHandler);
  app.use("/graphql", graphqlHTTP(graphQLHTTPHandler));
  app.use(notFoundHandler);
  app.listen({ port: 4000 }, startServerHandler);
};
