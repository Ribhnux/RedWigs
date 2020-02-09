import { typeDefs as blpopTypeDefs, _blpop } from "./blpop";
import { typeDefs as brpoplpushTypeDefs, _brpoplpush } from "./brpoplpush";
import { typeDefs as brpopTypeDefs, _brpop } from "./brpop";
import { typeDefs as lindexTypeDefs, _lindex } from "./lindex";
import { typeDefs as linsertTypeDefs, _linsert } from "./linsert";
import { typeDefs as llenTypeDefs, _llen } from "./llen";
import { typeDefs as lpopTypeDefs, _lpop } from "./lpop";
import { typeDefs as lpushTypeDefs, _lpush } from "./lpush";
import { typeDefs as lpushxTypeDefs, _lpushx } from "./lpushx";
import { typeDefs as lrangeTypeDefs, _lrange } from "./lrange";
import { typeDefs as lremTypeDefs, _lrem } from "./lrem";
import { typeDefs as lsetTypeDefs, _lset } from "./lset";
import { typeDefs as ltrimTypeDefs, _ltrim } from "./ltrim";
import { typeDefs as rpoplpushTypeDefs, _rpoplpush } from "./rpoplpush";
import { typeDefs as rpopTypeDefs, _rpop } from "./rpop";
import { typeDefs as rpushTypeDefs, _rpush } from "./rpush";
import { typeDefs as rpushxTypeDefs, _rpushx } from "./rpushx";

export const typeDefs = [
  blpopTypeDefs,
  brpoplpushTypeDefs,
  brpopTypeDefs,
  lindexTypeDefs,
  linsertTypeDefs,
  llenTypeDefs,
  lpopTypeDefs,
  lpushTypeDefs,
  lpushxTypeDefs,
  lrangeTypeDefs,
  lremTypeDefs,
  lsetTypeDefs,
  ltrimTypeDefs,
  rpoplpushTypeDefs,
  rpopTypeDefs,
  rpushTypeDefs,
  rpushxTypeDefs
];

export const resolvers = {
  Query: {
    _lindex,
    _llen,
    _lrange
  },
  Mutation: {
    _blpop,
    _brpop,
    _brpoplpush,
    _linsert,
    _lpop,
    _lpush,
    _lpushx,
    _lrem,
    _lset,
    _ltrim,
    _rpop,
    _rpoplpush,
    _rpush,
    _rpushx
  },
  Subscription: {}
};
