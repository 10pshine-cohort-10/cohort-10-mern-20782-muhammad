import { findByEmail, createUser, authenticate, findById } from '../services/auth.service.js';
import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';
import { signToken } from '../utils/jwt.js';

function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function issueToken(user) {
  return signToken({ sub: String(user.id), email: user.email });
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const existing = await findByEmail(email);
    if (existing) {
      throw new ApiError(409, 'An account with this email already exists.');
    }

    const user = await createUser({ name, email, password });
    logger.info({ userId: user.id }, 'User registered');

    res.status(201).json({ user: toPublicUser(user), token: issueToken(user) });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ApiError(409, 'An account with this email already exists.'));
    }
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const user = await authenticate(req.body);
    logger.info({ userId: user.id }, 'User logged in');

    res.json({ user: toPublicUser(user), token: issueToken(user) });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await findById(req.user.id);
    if (!user) {
      throw new ApiError(401, 'This account no longer exists.');
    }
    res.json({ user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}
