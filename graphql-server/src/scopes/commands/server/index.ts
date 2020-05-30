import { typeDefs as aclTypeDefs, _acl, aclCommands } from "./acl";

export const typeDefs = [aclTypeDefs];

const Query = {
  _acl,
};

const Mutation = {};

const NestedResolvers = {
  ACLCommands: aclCommands,
};

export const resolvers = {
  Query,
  Mutation,
  Subscription: {},
  NestedResolvers,
};
