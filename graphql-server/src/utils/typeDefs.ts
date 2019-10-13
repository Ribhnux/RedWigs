import { gql } from 'apollo-server-core';
import { DocumentNode, GraphQLSchema } from 'graphql';
import { redisClient } from '../adapters/redis';
import _ from 'lodash';
import { IResolvers, makeExecutableSchema } from 'graphql-tools';

import GraphQLUUID from 'graphql-type-uuid';

const dbKey = 'redwigs';
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

export const createQueryResolverByKeyOfTypes = async (
  pluralMap: string[],
  keyOfTypesJSON: string[]
) => {
  const queryResolvers = keyOfTypesJSON.map(typeName => {
    const resolver = {};
    resolver[pluralMap[typeName]] = async (root: any) => {
      const datamapKey: string = makeKey('datamap', typeName);
      const dataMap: string[] = await redisClient.zrange(datamapKey, 0, -1);

      return dataMap;
    };

    const byIdResolverName = _.snakeCase(`${typeName}_by_id`);
    resolver[byIdResolverName] = async (root: any, { id }) => id;

    return resolver;
  });

  return _.assign({}, ...queryResolvers);
};

export const createMutationResolverByKeyOfTypes = async (
  pluralMap: string[],
  keyOfTypesJSON: string[]
) => {
  const mutationResolvers = keyOfTypesJSON.map(typeName => {
    const resolver = {};
    const pluralKeyName = pluralMap[typeName];
    const typeNameStartCase = _.startCase(typeName);
    const insertResolverKey = _.snakeCase(
      `create_${pluralKeyName}(data: [InputCreate${typeNameStartCase}!]!): ResultInsert${typeNameStartCase}`
    );

    const updateResolverKey = _.snakeCase(
      `update_${typeName}(id: uuid!, data: InputUpdate${typeNameStartCase}): ResultUpdate${typeNameStartCase}!`
    );

    const removeResolverKey = _.snakeCase(
      `remove_${typeName}(id: uuid!): ResultRemoves${typeNameStartCase}!`
    );

    resolver[insertResolverKey] = async (root: any) => {};
    resolver[updateResolverKey] = async (root: any) => {};
    resolver[removeResolverKey] = async (root: any) => {};

    return resolver;
  });

  return _.assign({}, ...mutationResolvers);
};

export const createTypesResolvers = async (
  pluralMap: string[],
  typesJSON: any
) => {
  const keyOfTypesJSON = Object.keys(typesJSON);
  const resolvers = keyOfTypesJSON.map(typeName => {
    const typesResolver = {};
    const typeName$ = _.startCase(typeName);
    typesResolver[typeName$] = {};
    typesResolver[typeName$]['id'] = (id: string) => id;

    const fieldJSON = typesJSON[typeName];
    const keysOfField = Object.keys(fieldJSON);
    keysOfField.forEach(field => {
      if (field === 'id') return;
      typesResolver[typeName$][field] = async (id: string) => {
        const fieldData = await redisClient.hget(
          makeKey('data', pluralMap[typeName], id),
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
      type ${_.startCase(typeName)} {
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

  const mutation = /* GraphQL */ `
    type Mutation {
      update_hello(a: Int): String
    }
  `;

  const queryFields = keyOfTypesJSON
    .map(
      typeName => `
      ${_.lowerCase(pluralMap[typeName])}: [${_.startCase(typeName)}!]!
      ${_.snakeCase(typeName + '_by_id')}(id: uuid!): ${_.startCase(typeName)}
    `
    )
    .join('\n');

  const query = /* GraphQL */ `
    type Query {
      hello: String
      ${queryFields}
    }
  `;

  const typeDefsString = `
    scalar uuid
    ${query}
    ${types}
    ${mutation}
  `;

  const typeDefs = gql(typeDefsString);

  const queryResolvers = await createQueryResolverByKeyOfTypes(
    pluralMap,
    keyOfTypesJSON
  );

  const mutationResolver = {};

  keyOfTypesJSON.forEach(typeName => {});

  const typesResolvers = await createTypesResolvers(pluralMap, typesJSON);
  const resolvers = {
    uuid: GraphQLUUID,
    Query: queryResolvers,
    Mutation: mutationResolver,
    ...typesResolvers
  };

  console.log(resolvers);

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
