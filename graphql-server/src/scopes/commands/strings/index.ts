import { typeDefs as appendTypeDefs, _append } from "./append";
import { typeDefs as decrbyTypeDefs, _decrby } from "./decrby";
import { typeDefs as decrTypeDefs, _decr } from "./decr";
import { typeDefs as getbitTypeDefs, _getbit } from "./getbit";
import { typeDefs as getrangeTypeDefs, _getrange } from "./getrange";
import { typeDefs as getsetTypeDefs, _getset } from "./getset";
import { typeDefs as getTypeDefs, _get } from "./get";
import { typeDefs as incrByFloatTypeDefs, _incrbyfloat } from "./incrbyfloat";
import { typeDefs as incrByTypeDefs, _incrby } from "./incrby";
import { typeDefs as incrTypeDefs, _incr } from "./incr";
import { typeDefs as mgetTypeDefs, _mget } from "./mget";
import { typeDefs as msetnxTypeDefs, _msetnx } from "./msetnx";
import { typeDefs as msetTypeDefs, _mset } from "./mset";
import { typeDefs as setbitTypeDefs, _setbit } from "./setbit";
import { typeDefs as setexTypeDefs, _setex } from "./setex";
import { typeDefs as setnxTypeDefs, _setnx } from "./setnx";
import { typeDefs as setrangeTypeDefs, _setrange } from "./setrange";
import { typeDefs as setTypeDefs, _set } from "./set";
import { typeDefs as strlenTypeDefs, _strlen } from "./strlen";
import { typeDefs as psetexTypeDefs, _psetex } from "./psetex";
import { typeDefs as bitposTypeDefs, _bitpos } from "./bitpos";
import { typeDefs as bitcountTypeDefs, _bitcount } from "./bitcount";
import { typeDefs as bitfieldTypeDefs, _bitfield } from "./bitfield";
import { typeDefs as bitopTypeDefs, _bitop } from "./bitop";

export const typeDefs = [
  appendTypeDefs,
  decrbyTypeDefs,
  decrTypeDefs,
  getbitTypeDefs,
  getrangeTypeDefs,
  getsetTypeDefs,
  getTypeDefs,
  incrByFloatTypeDefs,
  incrByTypeDefs,
  incrTypeDefs,
  mgetTypeDefs,
  msetnxTypeDefs,
  msetTypeDefs,
  setbitTypeDefs,
  setexTypeDefs,
  setnxTypeDefs,
  setrangeTypeDefs,
  setTypeDefs,
  strlenTypeDefs,
  psetexTypeDefs,
  bitposTypeDefs,
  bitcountTypeDefs,
  bitfieldTypeDefs,
  bitopTypeDefs
];

const query = {
  _get,
  _mget,
  _strlen,
  _getrange,
  _getbit,
  _bitpos,
  _bitcount
};

const mutation = {
  _append,
  _decr,
  _decrby,
  _getset,
  _incr,
  _incrby,
  _incrbyfloat,
  _mset,
  _msetnx,
  _set,
  _setbit,
  _setex,
  _setnx,
  _setrange,
  _psetex,
  _bitop,
  _bitfield
};

export const resolvers = {
  query,
  mutation,
  subscription: {}
};
