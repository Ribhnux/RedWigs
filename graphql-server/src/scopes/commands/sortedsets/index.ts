import { typeDefs as bzpopmaxTypeDefs, _bzpopmax } from "./bzpopmax";
import { typeDefs as bzpopminTypeDefs, _bzpopmin } from "./bzpopmin";
import { typeDefs as zaddTypeDefs, _zadd } from "./zadd";
import { typeDefs as zcardTypeDefs, _zcard } from "./zcard";
import { typeDefs as zcountTypeDefs, _zcount } from "./zcount";
import { typeDefs as zincrbyTypeDefs, _zincrby } from "./zincrby";
import { typeDefs as zinterstoreTypeDefs, _zinterstore } from "./zinterstore";
import { typeDefs as zlexcountTypeDefs, _zlexcount } from "./zlexcount";
import { typeDefs as zpopmaxTypeDefs, _zpopmax } from "./zpopmax";
import { typeDefs as zpopminTypeDefs, _zpopmin } from "./zpopmin";
import { typeDefs as zrangebylexTypeDefs, _zrangebylex } from "./zrangebylex";
import {
  typeDefs as zrangebyscoreTypeDefs,
  _zrangebyscore
} from "./zrangebyscore";
import { typeDefs as zrangeTypeDefs, _zrange } from "./zrange";
import { typeDefs as zrankbylexTypeDefs, _zrank } from "./zrank";
import {
  typeDefs as zremrangebylexTypeDefs,
  _zremrangebylex
} from "./zremrangebylex";
import {
  typeDefs as zremrangebyrankTypeDefs,
  _zremrangebyrank
} from "./zremrangebyrank";
import {
  typeDefs as zremrangebyscoreTypeDefs,
  _zremrangebyscore
} from "./zremrangebyscore";
import { typeDefs as zremTypeDefs, _zrem } from "./zrem";
import {
  typeDefs as zrevrangebylexTypeDefs,
  _zrevrangebylex
} from "./zrevrangebylex";
import {
  typeDefs as zrevrangebyscoreTypeDefs,
  _zrevrangebyscore
} from "./zrevrangebyscore";
import { typeDefs as zrevrangeTypeDefs, _zrevrange } from "./zrevrange";
import { typeDefs as zrevrankTypeDefs, _zrevrank } from "./zrevrank";
import { typeDefs as zscanTypeDefs, _zscan } from "./zscan";
import { typeDefs as zscoreTypeDefs, _zscore } from "./zscore";
import { typeDefs as zunionstoreTypeDefs, _zunionstore } from "./zunionstore";

export const typeDefs = [
  bzpopmaxTypeDefs,
  bzpopminTypeDefs,
  zaddTypeDefs,
  zcardTypeDefs,
  zcountTypeDefs,
  zincrbyTypeDefs,
  zinterstoreTypeDefs,
  zlexcountTypeDefs,
  zpopmaxTypeDefs,
  zpopminTypeDefs,
  zrangebylexTypeDefs,
  zrangebyscoreTypeDefs,
  zrangeTypeDefs,
  zrankbylexTypeDefs,
  zremrangebylexTypeDefs,
  zremrangebyrankTypeDefs,
  zremrangebyscoreTypeDefs,
  zremTypeDefs,
  zrevrangebylexTypeDefs,
  zrevrangebyscoreTypeDefs,
  zrevrangeTypeDefs,
  zrevrankTypeDefs,
  zscanTypeDefs,
  zscoreTypeDefs,
  zunionstoreTypeDefs
];

export const resolvers = {
  Query: {
    _zcard,
    _zcount,
    _zlexcount,
    _zrange,
    _zrangebylex,
    _zrangebyscore,
    _zrank,
    _zrevrange,
    _zrevrangebylex,
    _zrevrangebyscore,
    _zrevrank,
    _zscan,
    _zscore
  },
  Mutation: {
    _bzpopmax,
    _bzpopmin,
    _zadd,
    _zincrby,
    _zinterstore,
    _zpopmax,
    _zpopmin,
    _zrem,
    _zremrangebylex,
    _zremrangebyrank,
    _zremrangebyscore,
    _zunionstore
  },
  Subscription: {}
};
