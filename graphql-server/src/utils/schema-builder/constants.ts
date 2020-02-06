export const BY_ID_AFFIX = '_by_id';
export const SCHEMA_DEFINITION = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export const SEPARATOR = ':';
export const ID_KEY = 'id';
export const ARRAY_RE = /[\[\]\!]/gi;
export enum OP_KEY {
  INSERT = 'insert',
  CREATE = 'create',
  UPDATE = 'update',
  REMOVE = 'remove'
}

export enum KEYNAME {
  DB = 'redwigs',
  COLLECTIONS = 'collections',
  DATA = 'data',
  DATAMAP = 'datamap',
  PLURAL_MAP = 'plural_map',
  TYPESET = 'typeset',
  TYPES = 'types'
}

export enum STATUS {
  FAILED = 'failed',
  SUCCESS = 'success'
}
