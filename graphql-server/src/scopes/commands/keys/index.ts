import { typeDefs as delTypeDefs, _del } from "./del";
import { typeDefs as dumpTypeDefs, _dump } from "./dump";
import { typeDefs as existsTypeDefs, _exists } from "./exists";
import { typeDefs as expireTypeDefs, _expire } from "./expire";
import { typeDefs as expireAtTypeDefs, _expireat } from "./expireat";
import { typeDefs as ttlTypeDefs, _ttl } from "./ttl";
import { typeDefs as keysTypeDefs, _keys } from "./keys";
import { typeDefs as moveTypeDefs, _move } from "./move";
import { typeDefs as objectTypeDefs, _object } from "./object";
import { typeDefs as persistTypeDefs, _persist } from "./persist";
import { typeDefs as pexpireTypeDefs, _pexpire } from "./pexpire";
import { typeDefs as pexpireAtTypeDefs, _pexpireat } from "./pexpireat";
import { typeDefs as pttlTypeDefs, _pttl } from "./pttl";
import { typeDefs as randomKeyTypeDefs, _randomkey } from "./randomkey";
import { typeDefs as renameTypeDefs, _rename } from "./rename";
import { typeDefs as renameNxTypeDefs, _renamenx } from "./renamenx";
import { typeDefs as typeTypeDefs, _type } from "./type";
import { typeDefs as touchTypeDefs, _touch } from "./touch";
import { typeDefs as restoreTypeDefs, _restore } from "./restore";
import { typeDefs as unlinkTypeDefs, _unlink } from "./unlink";
import { typeDefs as waitTypeDefs, _wait } from "./wait";
import { typeDefs as scanTypeDefs, typeResolvers as scanTypeResolvers, _scan } from "./scan";

export const typeDefs = [
  existsTypeDefs,
  delTypeDefs,
  dumpTypeDefs,
  expireTypeDefs,
  ttlTypeDefs,
  expireAtTypeDefs,
  keysTypeDefs,
  moveTypeDefs,
  objectTypeDefs,
  persistTypeDefs,
  pexpireTypeDefs,
  pexpireAtTypeDefs,
  pttlTypeDefs,
  randomKeyTypeDefs,
  renameTypeDefs,
  renameNxTypeDefs,
  typeTypeDefs,
  touchTypeDefs,
  restoreTypeDefs,
  unlinkTypeDefs,
  waitTypeDefs,
  scanTypeDefs
];

export const resolvers = {
  query: {
    _exists,
    _dump,
    _ttl,
    _keys,
    _object,
    _pttl,
    _randomkey,
    _type,
    _scan
  },
  mutation: {
    _del,
    _expire,
    _expireat,
    _move,
    _persist,
    _pexpire,
    _pexpireat,
    _rename,
    _renamenx,
    _touch,
    _restore,
    _unlink,
    _wait
  },
  subscription: {},
  types: {
    ...scanTypeResolvers
  }
};
