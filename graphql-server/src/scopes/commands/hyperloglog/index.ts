import { typeDefs as pfaddTypeDefs, _pfadd } from "./pfadd";
import { typeDefs as pfcountTypeDefs, _pfcount } from "./pfcount";
import { typeDefs as pfmergeTypeDefs, _pfmerge } from "./pfmerge";

export const typeDefs = [pfaddTypeDefs, pfcountTypeDefs, pfmergeTypeDefs];
export const resolvers = {
  Query: { _pfcount },
  Mutation: { _pfadd, _pfmerge },
  Subscription: {}
};
