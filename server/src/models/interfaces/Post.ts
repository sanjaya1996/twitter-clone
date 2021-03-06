import mongoose, { Schema } from 'mongoose';

export interface IPostSchema extends mongoose.Document {
  content: string;
  postedBy: Schema.Types.ObjectId | string;
  pinned: boolean;
  likes: (string | Schema.Types.ObjectId)[];
  retweetUsers: (string | Schema.Types.ObjectId)[];
  retweetData: Schema.Types.ObjectId | string;
  replyTo: Schema.Types.ObjectId | string;
}

export interface GetPostsResultI {
  postData: IPostSchema;
  replyTo?: any;
  replies: IPostSchema[];
}

export function isPopulatedPost(obj: IPostSchema | any): obj is IPostSchema {
  return obj && obj._id;
}
