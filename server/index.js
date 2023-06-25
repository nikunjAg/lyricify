import http from 'http';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import * as db from './db.js';
import './models/index.js';
import { typeDefs, resolvers } from './schema/index.js';

const PORT = process.env.PORT || 4000;
const app = express();

const httpServer = http.createServer(app);

await db.connect();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await apolloServer.start();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/graphql', expressMiddleware(apolloServer));

httpServer.listen(PORT, () => {
  console.log(`Server start on PORT: ${PORT}`);
});
