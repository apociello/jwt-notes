import { verifyToken } from '../lib/jwt.js';

// Protects a route: only lets the request through with a valid
// "Authorization: Bearer <token>" header, and leaves the user id in req.user
export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }

  const token = header.slice('Bearer '.length);

  try {
    const payload = verifyToken(token);
    req.user = { id: Number(payload.sub) };
    next();
  } catch {
    // Wrong signature, expired or malformed: the client has to log in again
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
