import gql from "graphql-tag";
import { makeExecutableSchema } from "apollo-server";
import {
  resolvers as customScalarResolvers,
  typeDefs as customScalarTypeDefs
} from "@scopes/scalars";
import _version from "./version";
import { default as _test, typeDefs as testTypeDefs } from "./test";

const rootTypeDefs = gql`
  "All query for Redwigs"
  type Query {
    """
    Get Redwigs Version
    """
    _version: String
  }

  "All mutations for RedWigs"
  type Mutation {
    """
    Test post some data to server.
    """
    _test(data: String!): ReplyTest
  }
`;

export const typeDefs = [rootTypeDefs, customScalarTypeDefs, testTypeDefs];
export const resolvers = {
  Query: {
    _version
  },
  Mutation: {
    _test
  },
  ...customScalarResolvers
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
