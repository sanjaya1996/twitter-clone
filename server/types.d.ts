declare namespace Express {
  type UserInfo = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    profilePic: string;
  };

  export interface Request {
    user: UserInfo;
  }
}
