import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { context } from './context';
import TaskResolver from './resolvers/TaskResolver';
import UserResolver from './resolvers/UserResolver';

const main = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver, TaskResolver],
    validate: false,
  });

  const apolloServer = new ApolloServer({ schema, context });
  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log('server running on http://localhost:5000/graphql');
  });
};

main();
