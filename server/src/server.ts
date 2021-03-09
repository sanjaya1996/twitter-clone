import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Twitter-Clone API is up and running!');
});

const port = process.env.PORT || 5000;

app.listen(5000, () => console.log(`App Listening on Port ${port}`));
