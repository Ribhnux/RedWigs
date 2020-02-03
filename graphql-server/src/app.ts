// import { bootstrap } from './utils/bootstrap';
// import { bootstrapErrorHandler } from './handlers/error';

// // clean is sweet
// bootstrap().catch(bootstrapErrorHandler);

import { ApolloServer, IResolvers } from "apollo-server";
import listenHandler from "./handlers/listen";
import {
  schema as rootSchema,
  resolver as rootResolver
} from "./scopes/server";

import {
  resolvers as redisCommandResolvers,
  schema as redisCommandSchemas
} from "./scopes/commands";

const resolvers: IResolvers = {
  Query: {
    ...rootResolver.query,
    ...redisCommandResolvers.query
  },

  Mutation: {
    ...rootResolver.mutation,
    ...redisCommandResolvers.mutation
  },

  ...rootResolver.scalars,
  ...redisCommandResolvers.custom
};

const serverOptions = {
  typeDefs: [...rootSchema, ...redisCommandSchemas],
  resolvers
};

const server = new ApolloServer(serverOptions);
server.listen().then(listenHandler);
