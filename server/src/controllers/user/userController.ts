import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import User from '../../models/schemas/UserSchema';
import generateToken from '../../utils/generateToken';
import { UserRegisterData, UserLoginData } from '../../models/interfaces/User';

import { LoggedInUserType } from '../../models/interfaces/User';
import { throwErrResponse } from '../../utils/throwErrResponse';

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
      return throwErrResponse(res, 404, 'Username or email already taken');
    } else {
      const createdUser = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password,
      });

      req.user = createdUser as LoggedInUserType;

      const userInfo = {
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        userName: createdUser.userName,
        profilePic: createdUser.profilePic,
        token: generateToken(createdUser._id),
      };

      res.status(201).json(userInfo);
    }
  } else {
    return throwErrResponse(
      res,
      400,
      'Make sure each field has a valid value.'
    );
  }
});

export const loginUser: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const requestBody = req.body as UserLoginData;
    const { email, password } = requestBody;

    if (!email || !password) {
      return throwErrResponse(res, 422, 'Please provide an email and password');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return throwErrResponse(res, 401, 'Invalid email or password');
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return throwErrResponse(res, 401, 'Invalid email or password');
    }

    req.user = user as LoggedInUserType;

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  }
);

export const getMyProfile: RequestHandler = asyncHandler(async (req, res) => {
  const userProfile = req.user;
  res.json(userProfile);
});
