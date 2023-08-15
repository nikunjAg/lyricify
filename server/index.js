import http from 'http';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import * as db from './db.js';
import './models/index.js';
import { ApolloServerService } from './services/index.js';

const PORT = process.env.PORT || 4000;
const app = express();

const httpServer = http.createServer(app);

await db.connect();

await ApolloServerService.start(httpServer);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/graphql', ApolloServerService.getExpressMiddleware());

httpServer.listen(PORT, () => {
  console.log(`Server start on PORT: ${PORT}`);
});
