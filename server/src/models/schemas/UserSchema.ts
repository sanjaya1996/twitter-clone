import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePic?: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: '/images/profilePic.png' },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  const user = this as IUser;
  return await bcrypt.compare(enteredPassword, user.password);
};

userSchema.pre<IUser>('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;