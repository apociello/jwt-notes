import { Router } from 'express';
import { getMe } from '../controllers/userController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

// Every route in this file needs a valid token
router.use(requireAuth);

router.get('/me', getMe);

export default router;
