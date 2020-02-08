import { typeDefs as hsetTypeDefs, _hset } from "./hset";
import { typeDefs as hmsetTypeDefs, _hmset } from "./hmset";
import { typeDefs as hsetnxTypeDefs, _hsetnx } from "./hsetnx";
import { typeDefs as hgetTypeDefs, _hget } from "./hget";
import { typeDefs as hmgetTypeDefs, _hmget } from "./hmget";
import { typeDefs as hgetAllTypeDefs, _hgetall } from "./hgetall";
import { typeDefs as hlenTypeDefs, _hlen } from "./hlen";
import { typeDefs as hkeysTypeDefs, _hkeys } from "./hkeys";
import { typeDefs as hexistsTypeDefs, _hexists } from "./hexists";
import { typeDefs as hstrlenTypeDefs, _hstrlen } from "./hstrlen";
import { typeDefs as hvalsTypeDefs, _hvals } from "./hvals";
import { typeDefs as hincrbyTypeDefs, _hincrby } from "./hincrby";
import {
  typeDefs as hincrbyfloatTypeDefs,
  _hincrbyfloat
} from "./hincrbyfloat";
import { typeDefs as hdelTypeDefs, _hdel } from "./hdel";
import { typeDefs as hscanTypeDefs, _hscan } from "./hscan";

export const typeDefs = [
  hsetTypeDefs,
  hmsetTypeDefs,
  hsetnxTypeDefs,
  hgetTypeDefs,
  hmgetTypeDefs,
  hgetAllTypeDefs,
  hlenTypeDefs,
  hkeysTypeDefs,
  hexistsTypeDefs,
  hstrlenTypeDefs,
  hvalsTypeDefs,
  hincrbyTypeDefs,
  hincrbyfloatTypeDefs,
  hdelTypeDefs,
  hscanTypeDefs
];

export const resolvers = {
  Query: {
    _hget,
    _hmget,
    _hgetall,
    _hlen,
    _hkeys,
    _hexists,
    _hstrlen,
    _hvals,
    _hscan
  },
  Mutation: {
    _hset,
    _hmset,
    _hsetnx,
    _hincrby,
    _hincrbyfloat,
    _hdel
  }
};
