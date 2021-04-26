import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import { IUserSchema } from '../interfaces/User';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, select: false },
    profilePic: { type: String, default: '/images/profilePic.jpeg' },
    coverPhoto: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    retweets: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  const user = this as IUserSchema;
  return await bcrypt.compare(enteredPassword, user.password);
};

userSchema.pre<IUserSchema>('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

const User = mongoose.model<IUserSchema>('User', userSchema);

export default User;
