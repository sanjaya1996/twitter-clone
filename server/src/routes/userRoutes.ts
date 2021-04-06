import express from 'express';
import { loginUser, registerUser } from '../controllers/user/userController';
const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);

export default router;
