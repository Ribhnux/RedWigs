import { schema as getSchema, _get } from "./get";
import { schema as setSchema, _set } from "./set";
import { schema as msetSchema, _mset } from "./mset";
import { schema as mgetSchema, _mget } from "./mget";
import { schema as incrSchema, _incr } from "./incr";
import { schema as decrSchema, _decr } from "./decr";
import { schema as decrbySchema, _decrby } from "./decrby";
import { schema as getsetSchema, _getset } from "./getset";
import { schema as strlenSchema, _strlen } from "./strlen";
import { schema as incrBySchema, _incrby } from "./incrby";
import { schema as incrByFloatSchema, _incrbyfloat } from "./incrbyfloat";

export const schema = [
  getSchema,
  setSchema,
  msetSchema,
  mgetSchema,
  incrSchema,
  decrSchema,
  decrbySchema,
  getsetSchema,
  strlenSchema,
  incrBySchema,
  incrByFloatSchema
];
export const resolvers = {
  query: { _get, _mget, _strlen },
  mutation: {
    _set,
    _mset,
    _incr,
    _decr,
    _decrby,
    _getset,
    _incrby,
    _incrbyfloat
  },
  subscription: {}
};
