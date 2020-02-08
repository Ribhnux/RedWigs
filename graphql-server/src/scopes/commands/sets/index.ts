import { typeDefs as saddTypeDefs, _sadd } from "./sadd";
import { typeDefs as scardTypeDefs, _scard } from "./scard";
import { typeDefs as sdiffTypeDefs, _sdiff } from "./sdiff";
import { typeDefs as sdiffStoreTypeDefs, _sdiffstore } from "./sdiffstore";
import { typeDefs as sinterTypeDefs, _sinter } from "./sinter";
import { typeDefs as sinterStoreTypeDefs, _sinterstore } from "./sinterstore";
import { typeDefs as sisMemberTypeDefs, _sismember } from "./sismember";
import { typeDefs as sMembersTypeDefs, _smembers } from "./smembers";
import { typeDefs as sMoveTypeDefs, _smove } from "./smove";
import { typeDefs as spopTypeDefs, _spop } from "./spop";
import { typeDefs as srandMemberTypeDefs, _srandmember } from "./srandmember";
import { typeDefs as sremTypeDefs, _srem } from "./srem";
import { typeDefs as sunionTypeDefs, _sunion } from "./sunion";
import { typeDefs as sunionStoreTypeDefs, _sunionstore } from "./sunionstore";
import { typeDefs as sscanTypeDefs, _sscan } from "./sscan";

export const typeDefs = [
  saddTypeDefs,
  scardTypeDefs,
  sdiffTypeDefs,
  sdiffStoreTypeDefs,
  sinterTypeDefs,
  sinterStoreTypeDefs,
  sisMemberTypeDefs,
  sMembersTypeDefs,
  sMoveTypeDefs,
  spopTypeDefs,
  srandMemberTypeDefs,
  sremTypeDefs,
  sunionTypeDefs,
  sunionStoreTypeDefs,
  sscanTypeDefs
];

export const resolvers = {
  query: {
    _scard,
    _sdiff,
    _sinter,
    _sismember,
    _smembers,
    _srandmember,
    _sunion,
    _sscan
  },
  mutation: {
    _sadd,
    _sdiffstore,
    _sinterstore,
    _sunionstore,
    _smove,
    _spop,
    _srem
  },
  subscription: {},
  types: {}
};
