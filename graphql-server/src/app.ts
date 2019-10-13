import express from 'express';
import { ApolloServer, ServerRegistration } from 'apollo-server-express';
import { createTypeDefsFromDatabase } from './utils/typeDefs';
import { GraphQLService, GraphQLServiceConfig } from 'apollo-server-core';
import { execute, buildSchema } from 'graphql';
import { EventEmitter } from 'events';
import { makeExecutableSchema } from 'graphql-tools';
import graphqlHTTP from 'express-graphql';

const ev = new EventEmitter();
const SCHEMA_UPDATE_EVENT = 'schema_update';

(async () => {
  try {
    const app = express();
    // const { schema } = await createTypeDefsFromDatabase();

    app.get('/', async (req, res) => {
      res.send('ok');
    });

    app.use(
      '/graphql',
      graphqlHTTP(async (req, res, graphQLParams) => {
        const { schema } = await createTypeDefsFromDatabase();
        return {
          schema,
          graphiql: true
        };
      })
    );

    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000/graphql`)
    );
  } catch (err) {
    console.log(err);
  }
})();
