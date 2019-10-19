import { GraphQLSchema } from 'graphql';
import _ from 'lodash';
import gql from 'graphql-tag';
import { makeExecutableSchema } from 'graphql-tools';
import GraphQLUUID from 'graphql-type-uuid';
import { SCHEMA_DEFINITION } from './constants';
import { getTypesAsJSON, getPluralMap } from './get-cache';
import {
  convertJSONToGraphQLType,
  createQueryFieldsAndResolverByKeyOfTypes,
  createMutationResolverByKeyOfTypes,
  createInputAndResultTypes,
  createTypesResolvers
} from './collections';

export const createTypeDefsFromDatabase = async (): Promise<GraphQLSchema> => {
  const typesJSON = await getTypesAsJSON();
  const pluralMap = await getPluralMap();
  const keyOfTypesJSON = Object.keys(typesJSON);

  const graphqlTypes = convertJSONToGraphQLType(typesJSON);
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
  const schema = makeExecutableSchema({
    typeDefs: [SCHEMA_DEFINITION, typeDefs],
    resolvers
  });

  return schema;
};
