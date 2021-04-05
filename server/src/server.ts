import express from 'express';

import { requireLogin } from './middleware/authMiddleware';

const app = express();

app.get('/', requireLogin, (req, res) => {
  res.send('Twitter-Clone API is up and running!');
});

app.get('/login', (req, res, next) => {
  res.send('This is login page!');
});

const port = process.env.PORT || 5000;

app.listen(5000, () => console.log(`App Listening on Port ${port}`));
