import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { MIN_PASSWORD_LENGTH } from './authController.js';

// Only the fields the client may see (never the password hash)
const publicFields = { id: true, username: true, createdAt: true };

const asString = (value) => (typeof value === 'string' ? value : '');

export const getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: publicFields,
  });

  // The token is still valid but the account was deleted after it was issued
  if (!user) {
    return res.status(401).json({ error: 'User no longer exists' });
  }

  res.json({ user });
};

export const updateMe = async (req, res) => {
  const username = asString(req.body?.username).trim();

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  // A taken username makes Prisma throw P2002, the error handler turns it into a 409
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { username },
    select: publicFields,
  });

  res.json({ user });
};

export const updatePassword = async (req, res) => {
  const currentPassword = asString(req.body?.currentPassword);
  const newPassword = asString(req.body?.newPassword);

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required' });
  }
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return res
      .status(400)
      .json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
  }

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) {
    return res.status(401).json({ error: 'User no longer exists' });
  }

  // 400 and not 401: the token is fine, and a 401 would log the client out
  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) {
    return res.status(400).json({ error: 'Current password is incorrect' });
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { password: hash } });

  res.status(204).end();
};

// Its notes go with it (onDelete: Cascade in the schema)
export const deleteMe = async (req, res) => {
  await prisma.user.delete({ where: { id: req.user.id } });
  res.status(204).end();
};
