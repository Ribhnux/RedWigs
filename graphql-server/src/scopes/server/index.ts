import gql from "graphql-tag";
import _version from "./version";
import { default as _test, typeDefs as testTypeDefs } from "./test";
import GraphQLJSON from "graphql-type-json";

const JSONTypedef = gql`
  scalar JSON
`;

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

export const typeDefs = [rootTypeDefs, JSONTypedef, testTypeDefs];

export const resolver = {
  query: {
    _version
  },
  mutation: {
    _test
  },
  scalars: {
    JSON: GraphQLJSON
  }
};
