import express, { NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import path from 'path';

import { requireLogin } from '../middleware/authMiddleware';
import { LoggedInUserType } from '../models/interfaces/User';
import User from '../models/schemas/UserSchema';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true); // accept a file
  } else {
    cb(null, false); // reject a file
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
});

router.post('/profilePicture', requireLogin, function (req, res, next) {
  upload.single('profileImage')(req, res, async function (err: any) {
    try {
      if (err instanceof multer.MulterError) {
        return next(err);
      } else if (!req.file) {
        const error = new Error('No image was uploaded');
        return next(error);
      }

      const filePath = `/${req.file.path}`;
      req.user = (await User.findByIdAndUpdate(
        req.user._id,
        { profilePic: filePath },
        { new: true }
      )) as LoggedInUserType;
      res.status(204).send('Profile Updated');
    } catch (err) {
      next(err);
    }
  });
});

router.post('/coverPhoto', requireLogin, function (req, res, next) {
  upload.single('coverPhoto')(req, res, async function (err: any) {
    try {
      if (err instanceof multer.MulterError) {
        return next(err);
      } else if (!req.file) {
        const error = new Error('No image was uploaded');
        return next(error);
      }

      const filePath = `/${req.file.path}`;
      req.user = (await User.findByIdAndUpdate(
        req.user._id,
        { coverPhoto: filePath },
        { new: true }
      )) as LoggedInUserType;
      res.status(204).json({ message: 'Cover Photo Updated' });
    } catch (err) {
      next(err);
    }
  });
});

export default router;
