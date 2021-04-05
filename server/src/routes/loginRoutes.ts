import express from 'express';
const app = express();
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).render('login');
});
