import { RequestHandler, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import User from '../../schemas/UserSchema';
import { UserBody } from './userInterface';

export const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const requestBody = req.body as UserBody;
  const firstName = requestBody.firstName.trim();
  const lastName = requestBody.lastName.trim();
  const userName = requestBody.userName.trim();
  const email = requestBody.email.trim();
  const password = requestBody.password;

  const allFieldsAreValid =
    firstName && lastName && userName && email && password;

  if (allFieldsAreValid) {
    const userExists = await User.findOne({
      $or: [{ userName: userName }, { email: email }],
    });

    if (userExists) {
      res.status(409);
      throw new Error('Username or email already taken.');
    } else {
      const createdUser = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password,
      });
      res.status(201).json(createdUser);
    }
  } else {
    res.status(400);
    throw new Error('Make sure each field has a valid value.');
  }
});

export const loginUser: RequestHandler = (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
};
