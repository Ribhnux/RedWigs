import {
  resolvers as stringCommandResolvers,
  schema as stringSchema
} from "./strings";
import gql from "graphql-tag";
import { OKScalar, RespBulkScalar } from "./scalars";

const redisSchema = gql`
  scalar OK
  scalar Errors
  scalar RespBulk

  type KeyValue {
    key: String
    value: String
  }
`;

const customScalarResolver = {
  OK: OKScalar,
  RespBulk: RespBulkScalar
};

export const resolvers = {
  query: {
    ...stringCommandResolvers.query
  },
  mutation: {
    ...stringCommandResolvers.mutation
  },
  subscription: {},
  custom: { ...customScalarResolver }
};

export const schema = [redisSchema, ...stringSchema];
