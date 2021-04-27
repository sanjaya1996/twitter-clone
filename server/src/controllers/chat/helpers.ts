import { IChatSchema } from '../../models/interfaces/Chat';
import mongoose from 'mongoose';
import Chat from '../../models/schemas/ChatSchema';

export async function getChatByUserId(
  userLoggedInId: string,
  otherUserId: string
) {
  return await Chat.findOneAndUpdate(
    {
      isGroupChat: false,
      users: {
        $size: 2, // Where size of users array is 2
        $all: [
          // Where all of the following conditions are met
          { $elemMatch: { $eq: mongoose.Types.ObjectId(userLoggedInId) } },
          { $elemMatch: { $eq: mongoose.Types.ObjectId(otherUserId) } },
        ],
      },
    },
    {
      // If we did not find anything from above query this block of object will execute
      $setOnInsert: {
        // Create a new document and insert the following value to users
        users: [userLoggedInId, otherUserId],
      },
    },
    {
      new: true, // Return the newly updated/created row back to us
      upsert: true, // If you did not find it, create it!
    }
  ).populate('users');
}
