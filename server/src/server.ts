import './env';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import 'colors';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';

import connectDB from './config/db';
import connectIO from './sockets';
import routes from './routes';
import { errorHandler } from './middleware/errorMiddleware';

// MONGODB CONNECTION
connectDB();

const app = express();

const corsConfig: CorsOptions = {
  origin: ['http://localhost:3000', 'https://tweethouse.online'],
  credentials: true,
};

app.use(cors(corsConfig));

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const server = http.createServer(app);
const io = new Server(server, { pingTimeout: 60000, cors: corsConfig });

// ROUTES
routes(app);

// SOCKET IO
connectIO(io);

// ERROR Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT_TWEETHOUSE || 8000;

server.listen(PORT, () =>
  console.log(`App Listening on Port ${PORT}`.yellow.bold)
);
