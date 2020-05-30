import gql from "graphql-tag";
import { makeExecutableSchema } from "apollo-server";
import { OKScalar, RespBulkScalar, IntStringScalarType } from "./scalars";
import {
  resolvers as customScalarResolvers,
  typeDefs as customScalarTypeDefs,
} from "@scopes/scalars";
import {
  resolvers as stringCommandResolvers,
  typeDefs as stringTypeDefs,
} from "./strings";
import {
  resolvers as keysCommandResolver,
  typeDefs as keysTypeDefs,
} from "./keys";
import {
  resolvers as connectionsCommandResolver,
  typeDefs as connectionsTypeDefs,
} from "./connections";
import {
  resolvers as setsCommandResolver,
  typeDefs as setsTypeDefs,
} from "./sets";
import {
  resolvers as hashCommandResolver,
  typeDefs as hashTypeDefs,
} from "./hashes";
import {
  resolvers as geoCommandResolver,
  typeDefs as geoTypeDefs,
} from "./geo";
import {
  resolvers as hyperLogLogCommandResolver,
  typeDefs as hyperLogLogTypeDefs,
} from "./hyperloglog";
import {
  resolvers as listCommandResolver,
  typeDefs as listTypeDefs,
} from "./lists";
import {
  resolvers as sortedSetsCommandResolver,
  typeDefs as sortedSetsTypeDefs,
} from "./sortedsets";

import {
  resolvers as pubsubCommandResolver,
  typeDefs as pubsubsTypeDefs,
} from "./pubsub";

import {
  resolvers as scriptingCommandResolvers,
  typeDefs as scriptingTypeDefs,
} from "./scripting";

import {
  resolvers as serverCommandResolvers,
  typeDefs as serverCommandTypeDefs,
} from "./server";

const redisRootTypeDefs = gql`
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
  ...customScalarResolvers,
};

export const typeDefs = [
  customScalarTypeDefs,
  redisRootTypeDefs,
  ...stringTypeDefs,
  ...keysTypeDefs,
  ...connectionsTypeDefs,
  ...setsTypeDefs,
  ...hashTypeDefs,
  ...geoTypeDefs,
  ...hyperLogLogTypeDefs,
  ...listTypeDefs,
  ...sortedSetsTypeDefs,
  ...pubsubsTypeDefs,
  ...scriptingTypeDefs,
  ...serverCommandTypeDefs,
];

export const resolvers = {
  Query: {
    ...stringCommandResolvers.query,
    ...keysCommandResolver.query,
    ...connectionsCommandResolver.query,
    ...setsCommandResolver.query,
    ...hashCommandResolver.Query,
    ...geoCommandResolver.Query,
    ...hyperLogLogCommandResolver.Query,
    ...listCommandResolver.Query,
    ...sortedSetsCommandResolver.Query,
    ...pubsubCommandResolver.Query,
    ...scriptingCommandResolvers.Query,
    ...serverCommandResolvers.Query,
  },
  Mutation: {
    ...stringCommandResolvers.mutation,
    ...keysCommandResolver.mutation,
    ...connectionsCommandResolver.mutation,
    ...setsCommandResolver.mutation,
    ...hashCommandResolver.Mutation,
    ...geoCommandResolver.Mutation,
    ...hyperLogLogCommandResolver.Mutation,
    ...listCommandResolver.Mutation,
    ...sortedSetsCommandResolver.Mutation,
    ...pubsubCommandResolver.Mutation,
    ...scriptingCommandResolvers.Mutation,
  },
  Subscription: {
    ...pubsubCommandResolver.Subscription,
  },
  ...serverCommandResolvers.NestedResolvers,
  ...keysCommandResolver.types,
  ...customScalarResolver,
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
