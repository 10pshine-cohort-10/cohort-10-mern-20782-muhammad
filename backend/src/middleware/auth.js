import { verifyToken } from '../utils/jwt.js';
import ApiError from '../utils/ApiError.js';

export default function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return next(new ApiError(401, 'Authentication required. Please sign in.'));
  }

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch {
    return next(new ApiError(401, 'Your session is invalid or has expired. Please sign in again.'));
  }
}
