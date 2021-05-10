import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_TWEETHOUSE!, {
    expiresIn: process.env.JWT_EXPIRE_TWEETHOUSE,
  });
};

export default generateToken;
