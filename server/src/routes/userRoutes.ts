import express from 'express';
import {
  followUser,
  getFollowers,
  getFollowing,
  getMyProfile,
  getProfileByIdOrUserName,
  getUsers,
  loginUser,
  registerUser,
} from '../controllers/user/userController';
import { requireLogin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(requireLogin, getUsers).post(registerUser);
router.post('/login', loginUser);
router.get('/myprofile', requireLogin, getMyProfile);
router.get('/profile/:id', requireLogin, getProfileByIdOrUserName);
router.put('/:id/follow', requireLogin, followUser);
router.get('/:id/followers', requireLogin, getFollowers);
router.get('/:id/following', requireLogin, getFollowing);

export default router;
