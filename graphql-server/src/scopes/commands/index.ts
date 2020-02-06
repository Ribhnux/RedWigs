import {
  resolvers as stringCommandResolvers,
  typeDefs as stringTypeDefs
} from "./strings";
import {
  resolvers as keysCommandResolver,
  typeDefs as keysTypeDefs
} from "./keys";

const redisTypeDefs = gql`
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

export const typeDefs = [redisTypeDefs, ...stringTypeDefs, ...keysTypeDefs];
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
