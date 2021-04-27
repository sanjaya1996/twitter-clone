import express from 'express';
import './env';
import 'colors';
import cors, { CorsOptions } from 'cors';
import path from 'path';

import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import chatRoutes from './routes/chatRoutes';
import uploadRoutes from './routes/uploadRoutes';
import messageRoutes from './routes/messageRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';

connectDB();

const app = express();

const corsConfig: CorsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Twitter-Clone API is up and running!');
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/uploads', uploadRoutes);

const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, './uploads')));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, () =>
  console.log(`App Listening on Port ${PORT}`.yellow.bold)
);
