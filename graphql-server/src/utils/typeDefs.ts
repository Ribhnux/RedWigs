import { gql } from 'apollo-server-core';
import { DocumentNode, GraphQLSchema } from 'graphql';
import { redisClient } from '../adapters/redis';
import _ from 'lodash';
import { IResolvers, makeExecutableSchema } from 'graphql-tools';
import uuid from 'uuid';
import GraphQLUUID from 'graphql-type-uuid';

const dbKey = 'redwigs';
const DATA_KEY = 'data';
const makeKey = (...keys: string[]): string => [dbKey, ...keys].join(':');

export const getTypesAsJSON = async (): Promise<{ [key: string]: any }> => {
  const typeSet: string[] = await redisClient.smembers(makeKey('typeset'));
  const keysForTypeStructure = _.map(typeSet, v => makeKey('types', v));

  const redisBulk = redisClient.multi();
  _.forEach(keysForTypeStructure, typesStructureKey =>
    redisBulk.hgetall(typesStructureKey)
  );

  const typeStructureResult = await redisBulk.exec();
  const typeStructureValues = _.map(
    typeStructureResult,
    ([, typeStructObject]) => typeStructObject
  );

  const typesJSON = _.assign(
    {},
    ...typeSet.map((typeName, key) => ({
      [typeName]: typeStructureValues[key]
    }))
  );

  return typesJSON;
};

export const getPluralMap = async (): Promise<any> => {
  const pluralsName: any = await redisClient.hgetall(makeKey('plural_map'));
  return pluralsName;
};

export const createQueryFieldsAndResolverByKeyOfTypes = async (
  pluralMap: string[],
  keyOfTypesJSON: string[]
) => {
  const queryResolvers = keyOfTypesJSON.map(typeName => {
    const byIdResolverName = _.snakeCase(`${typeName}_by_id`);
    const resolver = {};
    resolver[pluralMap[typeName]] = async (root: any) => {
      const datamapKey: string = makeKey('datamap', typeName);
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
      ${_.snakeCase(typeName + '_by_id')}(id: uuid!): ${upperFirstCamelCase(
        typeName
      )}
    `
    )
    .join('\n');

  const resolvers = _.assign({}, ...queryResolvers);

  return { fields, resolvers };
};

export const upperFirstCamelCase = (s: string) =>
  _.chain(s)
    .camelCase()
    .upperFirst()
    .value();

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
      'insert',
      typeName
    );

    const [inputUpdateName, resultUpdateTypeName] = createInputResultNames(
      'update',
      typeName
    );

    const [, resultRemoveTypeName] = createInputResultNames('remove', typeName);

    const fieldJSON = typesJSON[typeName];
    const keysOfField = Object.keys(fieldJSON);
    const graphqlTypeFields = keysOfField
      .filter(field => field !== 'id')
      .map(
        keyOfTypeStruct => `${keyOfTypeStruct}: ${fieldJSON[keyOfTypeStruct]}`
      )
      .join('\n');

    const inputTypes = [inputInsertName, inputUpdateName]
      .map(
        inputName => `
        input ${inputName} {
          ${graphqlTypeFields}
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
      'insert',
      typeName
    );

    const [inputUpdateName, resultUpdateTypeName] = createInputResultNames(
      'update',
      typeName
    );

    const [, resultRemoveTypeName] = createInputResultNames('remove', typeName);

    const createFieldName = `create_${pluralKeyName}`;
    const updateFieldName = `update_${snakeTypeName}`;
    const removeFieldName = `remove_${snakeTypeName}`;

    const createFieldKey = `${createFieldName}(data: [${inputInsertName}!]!): ${resultInsertTypeName}`;
    const updateFieldKey = `${updateFieldName}(id: uuid!, data: ${inputUpdateName}!): ${resultUpdateTypeName}!`;
    const removeFieldKey = `${removeFieldName}(id: uuid!): ${resultRemoveTypeName}!`;
    const datamapKey = makeKey('datamap', typeName);

    resolvers[createFieldName] = async ($: any, { data: newData }) => {
      try {
        const redisMulti = redisClient.multi();
        const ids: string[] = [];
        _.forEach(newData as any[], data => {
          const newUUID = uuid.v4();
          const dataKey = makeKey(DATA_KEY, pluralMap[typeName], newUUID);
          redisMulti.zadd(datamapKey, Date.now().toString(), newUUID);
          redisMulti.hmset(dataKey, data);
          ids.push(newUUID);
        });

        await redisMulti.exec();
        return {
          status: 'success',
          new_data: ids
        };
      } catch (err) {
        return {
          status: 'failed'
        };
      }
    };

    resolvers[updateFieldName] = async (root: any, { id, data }) => {
      try {
        const redisMulti = redisClient.multi();
        const dataKey = makeKey(DATA_KEY, pluralMap[typeName], id);
        _.forEach(Object.keys(data), key => {
          redisMulti.hset(dataKey, key, data[key]);
        });
        await redisMulti.exec();
        return {
          status: 'success',
          new_data: id
        };
      } catch (err) {
        return {
          status: 'failed'
        };
      }
    };

    resolvers[removeFieldName] = async ($: any, { id }) => {
      try {
        const redisMulti = redisClient.multi();
        const dataKey = makeKey(DATA_KEY, pluralMap[typeName], id);
        redisMulti.zrem(datamapKey, id);
        redisMulti.del(dataKey);
        await redisMulti.exec();

        return {
          status: 'success',
          id
        };
      } catch (err) {
        return {
          status: 'failed'
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
    typesResolver[typeName$]['id'] = (id: string) => id;

    const fieldJSON = typesJSON[typeName];
    const keysOfField = Object.keys(fieldJSON);
    keysOfField.forEach(field => {
      if (field === 'id') return;
      typesResolver[typeName$][field] = async (id: string) => {
        const fieldData = await redisClient.hget(
          makeKey(DATA_KEY, pluralMap[typeName], id),
          field
        );
        return fieldData;
      };
    });

    return { ...typesResolver };
  });

  return _.assign({}, ...resolvers);
};

export const extractGraphQLTypesFromDB = (typesJSON: {
  [key: string]: any;
}) => {
  const keyOfTypesJSON = Object.keys(typesJSON);
  const typeNameToTypeDefs = (typeName: string) => {
    const fieldJSON = typesJSON[typeName];
    const keysOfField = Object.keys(fieldJSON);
    const graphqlTypeFields = keysOfField.map(
      keyOfTypeStruct => `${keyOfTypeStruct}: ${fieldJSON[keyOfTypeStruct]}`
    );

    return `
      type ${upperFirstCamelCase(typeName)} {
        ${graphqlTypeFields.join('\n')}
      }
    `;
  };

  return keyOfTypesJSON.map(typeNameToTypeDefs);
};

export const createTypeDefsFromDatabase = async (): Promise<{
  schema: GraphQLSchema;
  typeDefs: DocumentNode;
  resolvers: unknown;
}> => {
  const typesJSON = await getTypesAsJSON();
  const pluralMap = await getPluralMap();
  const keyOfTypesJSON = Object.keys(typesJSON);

  const graphqlTypes = extractGraphQLTypesFromDB(typesJSON);
  const types = graphqlTypes.join('\n');

  const {
    fields: queryFields,
    resolvers: queryResolvers
  } = await createQueryFieldsAndResolverByKeyOfTypes(pluralMap, keyOfTypesJSON);

  const {
    fields: mutationFields,
    resolvers: mutationResolvers
  } = await createMutationResolverByKeyOfTypes(pluralMap, keyOfTypesJSON);

  const inputAndResultTypes = await createInputAndResultTypes(typesJSON);

  const typesResolvers = await createTypesResolvers(pluralMap, typesJSON);
  const resolvers = {
    uuid: GraphQLUUID,
    Query: queryResolvers,
    Mutation: mutationResolvers,
    ...typesResolvers
  };

  const query = /* GraphQL */ `
    type Query {
      ${queryFields}
    }
  `;

  const mutation = /* GraphQL */ `
    type Mutation {
      ${mutationFields}
    }
  `;

  const typeDefsString = `
    scalar uuid
    ${query}
    ${types}
    ${inputAndResultTypes}
    ${mutation}
  `;

  const typeDefs = gql(typeDefsString);
  const schemaDefinition = `
    schema {
      query: Query
      mutation: Mutation
    }
  `;

  const schema = makeExecutableSchema({
    typeDefs: [schemaDefinition, typeDefs],
    resolvers
  });

  return { schema, typeDefs, resolvers };
};
