import { typeDefs as evalTypeDefs, _eval } from "./eval";
import { typeDefs as evalSHATypeDefs, _evalsha } from "./evalsha";
import {
  typeDefs as scriptTypeDefs,
  _script_debug,
  _script_exists,
  _script_flush,
  _script_kill,
  _script_load
} from "./script";

export const typeDefs = [evalTypeDefs, scriptTypeDefs, evalSHATypeDefs];

export const resolvers = {
  Query: {
    _script_exists,
    _evalsha
  },
  Mutation: {
    _eval,
    _script_debug,
    _script_flush,
    _script_kill,
    _script_load
  },
  Subscription: {}
};
