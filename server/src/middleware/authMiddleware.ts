import { RequestHandler } from 'express';

export const requireLogin: RequestHandler = (req, res, next) => {
  if (true && false) {
    return next();
  } else {
    return res.redirect('/login');
  }
};
