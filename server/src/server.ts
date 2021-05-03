import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import './env';
import 'colors';
import cors, { CorsOptions } from 'cors';

import connectDB from './config/db';
import connectIO from './sockets';
import routes from './routes';
import { errorHandler } from './middleware/errorMiddleware';

connectDB();

const app = express();

const corsConfig: CorsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { pingTimeout: 60000, cors: corsConfig });

routes(app);

connectIO(io);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(5000, () =>
  console.log(`App Listening on Port ${PORT}`.yellow.bold)
);
