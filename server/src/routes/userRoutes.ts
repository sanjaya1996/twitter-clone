import express from 'express';
import {
  getMyProfile,
  getProfileByIdOrUserName,
  loginUser,
  registerUser,
} from '../controllers/user/userController';
import { requireLogin } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/myprofile', requireLogin, getMyProfile);
router.get('/profile/:id', requireLogin, getProfileByIdOrUserName);
export default router;
