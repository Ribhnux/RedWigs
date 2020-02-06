import { typeDefs as existsTypeDefs, _exists } from "./exists";

export const typeDefs = [existsTypeDefs];
export const resolvers = {
  query: { _exists },
  mutation: {},
  subscription: {}
};
