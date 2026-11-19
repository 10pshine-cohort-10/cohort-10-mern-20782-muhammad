import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { register, login, me } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import requireAuth from '../middleware/auth.js';
import { registerSchema, loginSchema } from '../validations/auth.schema.js';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: { message: 'Too many attempts. Please try again later.' },
  },
});

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.get('/me', requireAuth, me);

export default router;
