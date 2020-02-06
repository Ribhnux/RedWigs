import { ApolloServer, IResolvers } from "apollo-server";
import listenHandler from "./handlers/listen";
import {
  typeDefs as rootTypeDefs,
  resolver as rootResolver
} from "./scopes/server";

import {
  resolvers as redisCommandResolvers,
  typeDefs as redisCommandTypeDefs
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
  typeDefs: [...rootTypeDefs, ...redisCommandTypeDefs],
  resolvers
};

const server = new ApolloServer(serverOptions);
server.listen().then(listenHandler);
