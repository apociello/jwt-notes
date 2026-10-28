import { Router } from 'express';
import {
  getMe,
  updateMe,
  updatePassword,
  deleteMe,
} from '../controllers/userController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

// Every route in this file needs a valid token
router.use(requireAuth);

router.get('/me', getMe);
router.patch('/me', updateMe);
router.patch('/me/password', updatePassword);
router.delete('/me', deleteMe);

export default router;
