import { ApolloServer } from "apollo-server-express";

const listenHandler = (server: ApolloServer, port: number) => () => {
  console.log(`RedWigs ready at http://localhost:${port}${server.graphqlPath}`);
  console.log(
    `Redwigs Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  );
};

export default listenHandler;
