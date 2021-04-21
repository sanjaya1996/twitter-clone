import express, { NextFunction, RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';
import asyncHanlder from 'express-async-handler';

const upload = multer({ dest: 'uploads/' });

export const uploadProfilePic: RequestHandler = asyncHanlder(
  async (req, res, next) => {}
);
