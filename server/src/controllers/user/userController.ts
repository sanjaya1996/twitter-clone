import { RequestHandler, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { create } from 'node:domain';

import User, { IUser } from '../../schemas/UserSchema';
import { UserRegisterData, UserLoginData } from './userInterface';

export const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const requestBody = req.body as UserRegisterData;
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

      const userInfo = {
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        userName: createdUser.userName,
        profilePic: createdUser.profilePic,
      };

      req.session.user = userInfo;

      res.status(201).json(userInfo);
    }
  } else {
    res.status(400);
    throw new Error('Make sure each field has a valid value.');
  }
});

export const loginUser: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const requestBody = req.body as UserLoginData;
    const { email, password } = requestBody;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      req.session.user = user;
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        profilePic: user.profilePic,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }
);
