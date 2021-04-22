declare namespace Express {
  type UserInfo = {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    profilePic: string;
    coverPhoto: string;
    likes?: string[];
    following: string[];
    followers: string[];
  };

  export interface Request {
    user: UserInfo;
  }
}
