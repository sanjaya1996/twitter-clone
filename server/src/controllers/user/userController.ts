import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import User from '../../models/schemas/UserSchema';
import generateToken from '../../utils/generateToken';
import {
  UserRegisterData,
  UserLoginData,
  IUserSchema,
} from '../../models/interfaces/User';

import { LoggedInUserType } from '../../models/interfaces/User';
import { throwErrResponse } from '../../utils/throwErrResponse';
import { FilterQuery } from 'mongoose';
import Notification from '../../models/schemas/NotificationSchema';

export const getUsers = asyncHandler(async (req, res) => {
  const queryParams = req.query as { search: string };

  let searchObj = {} as FilterQuery<IUserSchema>;

  if (queryParams.search) {
    searchObj = {
      $or: [
        { firstName: { $regex: queryParams.search, $options: 'i' } },
        { lastName: { $regex: queryParams.search, $options: 'i' } },
        { userName: { $regex: queryParams.search, $options: 'i' } },
      ],
    };
  }

  const users = await User.find(searchObj);
  res.json(users);
});

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
      following: user.following,
      followers: user.followers,
      token: generateToken(user._id),
    });
  }
);

export const getMyProfile: RequestHandler = asyncHandler(async (req, res) => {
  const userProfile = req.user;
  res.json(userProfile);
});

export const getProfileByIdOrUserName: RequestHandler = asyncHandler(
  async (req, res) => {
    const idOrUserName = req.params.id;

    let user = await User.findOne({ userName: idOrUserName });

    if (!user) {
      user = await User.findById(idOrUserName);
      if (!user) {
        return throwErrResponse(res, 404, 'Profile Not Found');
      }
    }

    res.json(user);
  }
);

export const followUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    const isFollowing = user.followers && user.followers.includes(req.user._id);
    const option = isFollowing ? '$pull' : '$addToSet';
    // Update following array of Current User
    req.user = (await User.findByIdAndUpdate(
      req.user._id,
      { [option]: { following: userId } },
      { new: true }
    )) as LoggedInUserType;

    // Update the followers array of the user that is being followed by Current User
    await User.findByIdAndUpdate(
      userId,
      { [option]: { followers: req.user._id } },
      { new: true }
    );

    // Send Notification
    if (!isFollowing) {
      await Notification.insertNotification({
        userTo: userId,
        userFrom: req.user._id,
        notificationType: 'follow',
        entityId: req.user._id,
      });
    }

    res.status(200).json(req.user);
  } else {
    return throwErrResponse(res, 404, 'User Not Found');
  }
});

export const getFollowers = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId).populate('followers');
  if (user) {
    res.status(200).json(user);
  } else {
    return throwErrResponse(res, 404, 'User Not Found');
  }
});

export const getFollowing = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId).populate('following');
  if (user) {
    res.status(200).json(user);
  } else {
    return throwErrResponse(res, 404, 'User Not Found');
  }
});
