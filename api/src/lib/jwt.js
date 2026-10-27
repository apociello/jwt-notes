import jwt from 'jsonwebtoken';

const EXPIRES_IN = '1h';

// The payload only carries the user id (sub = "subject", the JWT standard name).
// Anyone can decode the payload, so nothing secret goes in it. The secret only signs.
export const signToken = (userId) =>
  jwt.sign({ sub: String(userId) }, process.env.JWT_SECRET, { expiresIn: EXPIRES_IN });

// Throws if the signature doesn't match or the token has expired
export const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
