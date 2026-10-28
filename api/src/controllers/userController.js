import { prisma } from '../lib/prisma.js';

// Only the fields the client may see (never the password hash)
const publicFields = { id: true, username: true, createdAt: true };

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
