import { redisClient } from '../../adapters/redis';
import _ from 'lodash';
import uuid from 'uuid';
import { makeKey } from './make-key';
import {
  BY_ID_AFFIX,
  KEYNAME,
  STATUS,
  ID_KEY,
  OP_KEY,
  ARRAY_RE
} from './constants';
import { upperFirstCamelCase } from './string-helper';

export const createQueryFieldsAndResolverByKeyOfTypes = async (
  pluralMap: string[],
  keyOfTypesJSON: string[]
) => {
  const queryResolvers = keyOfTypesJSON.map(typeName => {
    const byIdResolverName = _.snakeCase(`${typeName}${BY_ID_AFFIX}`);
    const resolver = {};
    resolver[pluralMap[typeName]] = async (root: any) => {
      const datamapKey: string = makeKey(KEYNAME.DATAMAP, typeName);
      const dataMap: string[] = await redisClient.zrange(datamapKey, 0, -1);

      return dataMap;
    };

    resolver[byIdResolverName] = async (root: any, { id }) => id;

    return resolver;
  });

  const fields = keyOfTypesJSON
    .map(
      typeName => `
      ${_.lowerCase(pluralMap[typeName])}: [${upperFirstCamelCase(typeName)}!]!
      ${_.snakeCase(typeName + BY_ID_AFFIX)}(id: uuid!): ${upperFirstCamelCase(
        typeName
      )}
    `
    )
    .join('\n');

  const resolvers = _.assign({}, ...queryResolvers);

  return { fields, resolvers };
};

export const createTokenStartCaseName = (...key: string[]): string =>
  upperFirstCamelCase(key.join(' '));

export const createInputName = (type: string, key: string): string =>
  createTokenStartCaseName('input', type, key);

export const createInputResultNames = (type: string, key: string): string[] => {
  const inputName: string = createInputName(type, key);
  const resultTypeName = createTokenStartCaseName('result', type, key);

  return [inputName, resultTypeName];
};

export const createInputAndResultTypes = async (typesJSON: any) => {
  const keyOfTypesJSON = Object.keys(typesJSON);
  const allInputAndResultTypes = keyOfTypesJSON.map((typeName: string) => {
    const [inputInsertName, resultInsertTypeName] = createInputResultNames(
      OP_KEY.INSERT,
      typeName
    );

    const [inputUpdateName, resultUpdateTypeName] = createInputResultNames(
      OP_KEY.UPDATE,
      typeName
    );

    const [, resultRemoveTypeName] = createInputResultNames(
      OP_KEY.REMOVE,
      typeName
    );

    const fieldJSON = typesJSON[typeName];
    const keysOfField = Object.keys(fieldJSON);

    const graphqlTypeFields = (op: OP_KEY) =>
      keysOfField
        .filter(field => field !== ID_KEY)
        .map(keyOfTypeStruct => {
          const fieldValueString = fieldJSON[keyOfTypeStruct].replace(
            ARRAY_RE,
            ''
          );

          const isUseNonPrimitiveType = keyOfTypesJSON.includes(
            _.toLower(fieldValueString)
          );

          const isNonPrimitiveTypeArray = ARRAY_RE.test(
            fieldJSON[keyOfTypeStruct]
          );

          const fieldValue = isUseNonPrimitiveType
            ? isNonPrimitiveTypeArray
              ? '[uuid!]'
              : 'uuid!'
            : fieldJSON[keyOfTypeStruct];

          const fieldKV = `${keyOfTypeStruct}: ${fieldValue}`;
          return fieldKV;
        })
        .join('\n');

    const inputTypes = [
      { op: OP_KEY.INSERT, inputName: inputInsertName },
      { op: OP_KEY.UPDATE, inputName: inputUpdateName }
    ]
      .map(
        ({ op, inputName }) => `
        input ${inputName} {
          ${graphqlTypeFields(op)}
        }
      `
      )
      .join('\n');

    const resultInsertType = `
      type ${resultInsertTypeName} {
        status: String!
        new_data: [${upperFirstCamelCase(typeName)}!]!
      }
    `;

    const resultUpdateType = `
      type ${resultUpdateTypeName} {
        status: String!
        new_data: ${upperFirstCamelCase(typeName)}!
      }
    `;

    const resultRemoveType = `
      type ${resultRemoveTypeName} {
        status: String!
        id: uuid
      }
    `;

    const resultTypes = [
      resultInsertType,
      resultUpdateType,
      resultRemoveType
    ].join('\n');

    return [inputTypes, resultTypes].join('\n');
  });

  return allInputAndResultTypes.join('\n');
};

export const createMutationResolverByKeyOfTypes = async (
  pluralMap: string[],
  keyOfTypesJSON: string[]
) => {
  const mutationFieldAndResolvers = keyOfTypesJSON.map(typeName => {
    const resolvers = {};
    const pluralKeyName = pluralMap[typeName];
    const snakeTypeName = _.snakeCase(typeName);
    const [inputInsertName, resultInsertTypeName] = createInputResultNames(
      OP_KEY.INSERT,
      typeName
    );

    const [inputUpdateName, resultUpdateTypeName] = createInputResultNames(
      OP_KEY.UPDATE,
      typeName
    );

    const [, resultRemoveTypeName] = createInputResultNames(
      OP_KEY.REMOVE,
      typeName
    );

    const createFieldName = `${OP_KEY.CREATE}_${pluralKeyName}`;
    const updateFieldName = `${OP_KEY.UPDATE}_${snakeTypeName}`;
    const removeFieldName = `${OP_KEY.REMOVE}_${snakeTypeName}`;

    const createFieldKey = `${createFieldName}(data: [${inputInsertName}!]!): ${resultInsertTypeName}`;
    const updateFieldKey = `${updateFieldName}(id: uuid!, data: ${inputUpdateName}!): ${resultUpdateTypeName}!`;
    const removeFieldKey = `${removeFieldName}(id: uuid!): ${resultRemoveTypeName}!`;
    const datamapKey = makeKey(KEYNAME.DATAMAP, typeName);

    resolvers[createFieldName] = async ($: any, { data: newData }) => {
      try {
        const redisMulti = redisClient.multi();
        const ids: string[] = [];
        _.forEach(newData as any[], data => {
          const newUUID = uuid.v4();
          const dataKey = makeKey(KEYNAME.DATA, pluralMap[typeName], newUUID);
          redisMulti.zadd(datamapKey, Date.now().toString(), newUUID);
          redisMulti.hmset(dataKey, data);
          ids.push(newUUID);
        });

        await redisMulti.exec();
        return {
          status: STATUS.SUCCESS,
          new_data: ids
        };
      } catch (err) {
        return {
          status: STATUS.FAILED
        };
      }
    };

    resolvers[updateFieldName] = async (root: any, { id, data }) => {
      try {
        const redisMulti = redisClient.multi();
        const dataKey = makeKey(KEYNAME.DATA, pluralMap[typeName], id);
        _.forEach(Object.keys(data), key => {
          redisMulti.hset(dataKey, key, data[key]);
        });
        await redisMulti.exec();
        return {
          status: STATUS.SUCCESS,
          new_data: id
        };
      } catch (err) {
        return {
          status: STATUS.FAILED
        };
      }
    };

    resolvers[removeFieldName] = async ($: any, { id }) => {
      try {
        const redisMulti = redisClient.multi();
        const dataKey = makeKey(KEYNAME.DATAMAP, pluralMap[typeName], id);
        redisMulti.zrem(datamapKey, id);
        redisMulti.del(dataKey);
        await redisMulti.exec();

        return {
          status: STATUS.SUCCESS,
          id
        };
      } catch (err) {
        return {
          status: STATUS.FAILED
        };
      }
    };

    const fields = [createFieldKey, updateFieldKey, removeFieldKey].join('\n');

    return { fields, resolvers };
  });

  const fields = _.chain(mutationFieldAndResolvers)
    .map(m => m.fields)
    .flatten()
    .value();

  const resolvers = _.assign(
    {},
    ..._.map(mutationFieldAndResolvers, m => m.resolvers)
  );

  return { fields, resolvers };
};

export const createTypesResolvers = async (
  pluralMap: string[],
  typesJSON: any
) => {
  const keyOfTypesJSON = Object.keys(typesJSON);
  const resolvers = keyOfTypesJSON.map(typeName => {
    const typesResolver = {};
    const typeName$ = upperFirstCamelCase(typeName);
    typesResolver[typeName$] = {};
    typesResolver[typeName$][ID_KEY] = (id: string) => id;

    const fieldJSON = typesJSON[typeName];
    const keysOfField = Object.keys(fieldJSON);
    keysOfField.forEach(field => {
      if (field === ID_KEY) return;
      typesResolver[typeName$][field] = async (id: string) => {
        const dataFieldKey = makeKey(KEYNAME.DATA, pluralMap[typeName], id);
        const fieldData = await redisClient.hget(dataFieldKey, field);

        if (
          keyOfTypesJSON.includes(
            _.toLower(fieldJSON[field].replace(ARRAY_RE, ''))
          ) &&
          fieldJSON[field].match(ARRAY_RE)
        ) {
          return fieldData.split(',');
        }

        return fieldData;
      };
    });

    return { ...typesResolver };
  });

  return _.assign({}, ...resolvers);
};

export const convertJSONToGraphQLType = (typesJSON: { [key: string]: any }) => {
  const keyOfTypesJSON = Object.keys(typesJSON);
  const typeNameToTypeDefs = (typeName: string) => {
    const type = typesJSON[typeName];
    const fieldNames = Object.keys(type);
    const makeGraphQLField = (fieldKey: string) =>
      `${fieldKey}: ${type[fieldKey]}`;

    const graphqlTypeFields = fieldNames.map(makeGraphQLField);
    const joinedGraphQLFields = graphqlTypeFields.join('\n');
    const refinedTypeName = upperFirstCamelCase(typeName);

    return `
      type ${refinedTypeName} {
        ${joinedGraphQLFields}
      }
    `;
  };

  return keyOfTypesJSON.map(typeNameToTypeDefs);
};
