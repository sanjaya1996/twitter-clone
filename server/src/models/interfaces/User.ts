import mongoose, { Schema } from 'mongoose';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePic?: string;
  likes: (string | Schema.Types.ObjectId)[];
  retweets: (string | Schema.Types.ObjectId)[];
  following: (string | Schema.Types.ObjectId)[];
  followers: (string | Schema.Types.ObjectId)[];
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export type LoggedInUserType = {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePic: string;
  token?: string;
  following: string[];
  followers: string[];
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
