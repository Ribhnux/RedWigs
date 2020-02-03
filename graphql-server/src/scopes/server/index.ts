import gql from "graphql-tag";
import _version from "./version";
import { default as _test, schema as testSchema } from "./test";
import GraphQLJSON from "graphql-type-json";

const JSONSchema = gql`
  scalar JSON
`;

const rootSchema = gql`
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

export const schema = [rootSchema, JSONSchema, testSchema];

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
