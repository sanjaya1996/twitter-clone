import express from 'express';
import './env';
import 'colors';
import session, { SessionData } from 'express-session';

import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import { IUser } from './schemas/UserSchema';

connectDB();

const app = express();

app.use(express.json());

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/', (req, res) => {
  res.send('Twitter-Clone API is up and running!');
});

app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, () =>
  console.log(`App Listening on Port ${PORT}`.yellow.bold)
);
