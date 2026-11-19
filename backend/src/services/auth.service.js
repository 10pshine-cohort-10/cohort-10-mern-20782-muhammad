import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

const SALT_ROUNDS = 10;

export async function findByEmail(email) {
  return User.findOne({ email });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser({ name, email, password }) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return User.create({ name, email, passwordHash });
}

export async function authenticate({ email, password }) {
  const user = await User.findOne({ email }).select('+passwordHash');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  const passwordMatches = await user.comparePassword(password);

  if (!passwordMatches) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  return User.findById(user.id);
}
