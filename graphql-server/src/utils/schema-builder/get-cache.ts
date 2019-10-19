import _ from 'lodash';
import { redisClient } from '../../adapters/redis';
import {
  TYPESET_KEYPATH,
  makeTypesKeyPath,
  PLURALMAP_KEYPATH
} from './make-key';

export const getTypesAsJSON = async (): Promise<{ [key: string]: any }> => {
  const typeSet: string[] = await redisClient.smembers(TYPESET_KEYPATH);
  const keysForTypeStructure = _.map(typeSet, makeTypesKeyPath);

  const redisBulk = redisClient.multi();
  _.forEach(keysForTypeStructure, typesStructureKey =>
    redisBulk.hgetall(typesStructureKey)
  );

  const typeStructureResult = await redisBulk.exec();
  const typeStructureValues = _.map(
    typeStructureResult,
    ([, typeStructObject]) => typeStructObject
  );

  const typesCollection = typeSet.map((typeName, key) => ({
    [typeName]: typeStructureValues[key]
  }));

  const typesJSON = _.assign({}, ...typesCollection);

  return typesJSON;
};

export const getPluralMap = async (): Promise<any> => {
  const pluralsName: any = await redisClient.hgetall(PLURALMAP_KEYPATH);
  return pluralsName;
};
