import express from 'express';
import { Express } from 'express';
import asyncHandler from 'express-async-handler';
import path from 'path';

import userRoutes from './userRoutes';
import postRoutes from './postRoutes';
import chatRoutes from './chatRoutes';
import messageRoutes from './messageRoutes';
import notificationRoutes from './notificationRoutes';
import uploadRoutes from './uploadRoutes';
import { notFound } from '../middleware/errorMiddleware';
import { getFileStream } from '../utils/s3';

export default (app: Express) => {
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/chats', chatRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/uploads', uploadRoutes);

  app.use('/uploads/:key', (req, res, next) => {
    const key = req.params.key;
    const readStream = getFileStream(key, next);

    if (readStream) {
      readStream.pipe(res);
    } else {
      const error = new Error('Something went wrong');
      next(error);
    }
  });

  // const dirname = path.resolve();
  // app.use('/uploads', express.static(path.join(dirname, './uploads')));

  app.get('/', (req, res) => {
    res.send('Twitter-Clone API is up and running!');
  });

  app.use(notFound);
};
