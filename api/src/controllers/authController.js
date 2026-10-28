import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { signToken } from '../lib/jwt.js';

export const MIN_PASSWORD_LENGTH = 8;

// What the API sends back about a user (never the password hash)
const publicUser = ({ id, username, createdAt }) => ({ id, username, createdAt });

// Express 5 leaves req.body undefined when the request has no JSON body
const getCredentials = (body = {}) => ({
  username: typeof body.username === 'string' ? body.username.trim() : '',
  password: typeof body.password === 'string' ? body.password : '',
});

export const register = async (req, res) => {
  const { username, password } = getCredentials(req.body);

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return res
      .status(400)
      .json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
  }

  const hash = await bcrypt.hash(password, 10);

  // A duplicate username makes Prisma throw P2002, the error handler turns it into a 409
  const user = await prisma.user.create({ data: { username, password: hash } });

  res.status(201).json({ token: signToken(user.id), user: publicUser(user) });
};

export const login = async (req, res) => {
  const { username, password } = getCredentials(req.body);

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = await prisma.user.findUnique({ where: { username } });
  const isValid = user && (await bcrypt.compare(password, user.password));

  // Same message for both cases, so nobody can find out which usernames exist
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.json({ token: signToken(user.id), user: publicUser(user) });
};
