import mongoose, { Schema } from 'mongoose';

export interface IUserSchema extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePic?: string;
  coverPhoto?: string;
  likes: (string | Schema.Types.ObjectId)[];
  retweets: (string | Schema.Types.ObjectId)[];
  following: (string | Schema.Types.ObjectId)[];
  followers: (string | Schema.Types.ObjectId)[];
  isAdmin?: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export type LoggedInUserType = {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePic: string;
  coverPhoto: string;
  token?: string;
  following: string[];
  followers: string[];
  isAdmin?: boolean;
};

export interface UserRegisterData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}
