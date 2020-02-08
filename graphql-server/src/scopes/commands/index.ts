import gql from "graphql-tag";
import { makeExecutableSchema } from "apollo-server";
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
import {
  resolvers as hashCommandResolver,
  typeDefs as hashTypeDefs
} from "./hashes";
import {
  resolvers as geoCommandResolver,
  typeDefs as geoTypeDefs
} from "./geo";
import {
  resolvers as hyperLogLogCommandResolver,
  typeDefs as hyperLogLogTypeDefs
} from "./hyperloglog";

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
  ...setsTypeDefs,
  ...hashTypeDefs,
  ...geoTypeDefs,
  ...hyperLogLogTypeDefs
];

export const resolvers = {
  Query: {
    ...stringCommandResolvers.query,
    ...keysCommandResolver.query,
    ...connectionsCommandResolver.query,
    ...setsCommandResolver.query,
    ...hashCommandResolver.Query,
    ...geoCommandResolver.Query,
    ...hyperLogLogCommandResolver.Query
  },
  Mutation: {
    ...stringCommandResolvers.mutation,
    ...keysCommandResolver.mutation,
    ...connectionsCommandResolver.mutation,
    ...setsCommandResolver.mutation,
    ...hashCommandResolver.Mutation,
    ...geoCommandResolver.Mutation,
    ...hyperLogLogCommandResolver.Mutation
  },
  Subscription: {},
  ...keysCommandResolver.types,
  ...customScalarResolver
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
