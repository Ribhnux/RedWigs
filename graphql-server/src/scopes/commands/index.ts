import gql from "graphql-tag";
import { OKScalar, RespBulkScalar, IntStringScalarType } from "./scalars";
import {
  resolvers as customScalarResolvers,
  typeDefs as customScalarTypeDefs
} from "@scopes/scalars";
import {
  resolvers as stringCommandResolvers,
  typeDefs as stringTypeDefs
} from "./strings";
import {
  resolvers as keysCommandResolver,
  typeDefs as keysTypeDefs
} from "./keys";
import {
  resolvers as connectionsCommandResolver,
  typeDefs as connectionsTypeDefs
} from "./connections";
import {
  resolvers as setsCommandResolver,
  typeDefs as setsTypeDefs
} from "./sets";
import { makeExecutableSchema } from "apollo-server";

const redisTypeDefs = gql`
  scalar OK
  scalar Errors
  scalar RespBulk
  scalar IntString

  type KeyValue {
    key: String
    value: String
  }

  type Query {
    _version: String
  }

  type Mutation {
    _echo: String
  }

  type Subscription {
    _test: String
  }
`;

const customScalarResolver = {
  OK: OKScalar,
  RespBulk: RespBulkScalar,
  IntString: IntStringScalarType,
  ...customScalarResolvers
};

export const typeDefs = [
  customScalarTypeDefs,
  redisTypeDefs,
  ...stringTypeDefs,
  ...keysTypeDefs,
  ...connectionsTypeDefs,
  ...setsTypeDefs
];

export const resolvers = {
  Query: {
    ...stringCommandResolvers.query,
    ...keysCommandResolver.query,
    ...connectionsCommandResolver.query,
    ...setsCommandResolver.query
  },
  Mutation: {
    ...stringCommandResolvers.mutation,
    ...keysCommandResolver.mutation,
    ...connectionsCommandResolver.mutation,
    ...setsCommandResolver.mutation
  },
  Subscription: {},
  ...keysCommandResolver.types,
  ...customScalarResolver
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
