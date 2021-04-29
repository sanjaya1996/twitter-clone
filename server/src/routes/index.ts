import express from 'express';
import { Express } from 'express';
import path from 'path';

import userRoutes from './userRoutes';
import postRoutes from './postRoutes';
import chatRoutes from './chatRoutes';
import uploadRoutes from './uploadRoutes';
import messageRoutes from './messageRoutes';
import { notFound } from '../middleware/errorMiddleware';

export default (app: Express) => {
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
};
