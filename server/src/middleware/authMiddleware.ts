import { RequestHandler, ErrorRequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { Error } from 'mongoose';

import User, { IUser } from '../models/schemas/UserSchema';
import { LoggedInUserType } from '../models/interfaces/User';

export interface DecodeResult {
  id: string;
  iat: number;
}

export const requireLogin: RequestHandler = asyncHandler(
  async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401);
      throw new Error('Authentication Failed');
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodeResult;

      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(404);
        throw new Error('No user found with this id');
      }

      req.user = user as LoggedInUserType;

      next();
    } catch (err) {
      let errMessage = 'Not Authorized, Token failed';
      if (res.statusCode === 404) {
        errMessage = err.message;
      }

      throw new Error(errMessage);
    }
  }
);
