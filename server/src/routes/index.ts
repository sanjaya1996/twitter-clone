import express from 'express';
import { Express } from 'express';
import path from 'path';

import userRoutes from './userRoutes';
import postRoutes from './postRoutes';
import chatRoutes from './chatRoutes';
import messageRoutes from './messageRoutes';
import notificationRoutes from './notificationRoutes';
import uploadRoutes from './uploadRoutes';
import { notFound } from '../middleware/errorMiddleware';

export default (app: Express) => {
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/chats', chatRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/uploads', uploadRoutes);

  const dirname = path.resolve();
  app.use('/uploads', express.static(path.join(dirname, './uploads')));

  app.get('/', (req, res) => {
    res.send('Twitter-Clone API is up and running!');
  });

  app.use(notFound);
};
