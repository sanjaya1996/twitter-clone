import { Response } from 'express';

export const throwErrResponse = (
  res: Response,
  code: number,
  message: string
) => {
  res.status(code);
  throw new Error(message);
};
