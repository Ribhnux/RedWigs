import { KEYNAME, SEPARATOR } from './constants';

export const makeKey = (...keys: string[]): string =>
  [KEYNAME.DB, ...keys].join(SEPARATOR);

export const TYPESET_KEYPATH: string = makeKey(KEYNAME.TYPESET);
export const PLURALMAP_KEYPATH = makeKey(KEYNAME.PLURAL_MAP);
export const makeTypesKeyPath = (v: string): string =>
  makeKey(KEYNAME.TYPES, v);
