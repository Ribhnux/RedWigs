import { typeDefs as pubsubTypeDefs, _pubsub } from "./pubsub";
import { typeDefs as publishTypeDefs, _publish } from "./publish";
import { typeDefs as subscribeTypeDefs, _subscribe } from "./subscribe";
import { typeDefs as psubscribeTypeDefs, _psubscribe } from "./psubscribe";
import { typeDefs as unsubscribeTypeDefs, _unsubscribe } from "./unsubscribe";
import {
  typeDefs as punsubscribeTypeDefs,
  _punsubscribe
} from "./punsubscribe";

export const typeDefs = [
  pubsubTypeDefs,
  publishTypeDefs,
  subscribeTypeDefs,
  unsubscribeTypeDefs,
  psubscribeTypeDefs,
  punsubscribeTypeDefs
];
export const resolvers = {
  Query: { _pubsub },
  Mutation: { _publish, _unsubscribe, _punsubscribe },
  Subscription: { _subscribe, _psubscribe }
};
