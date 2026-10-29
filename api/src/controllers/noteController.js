import { prisma } from '../lib/prisma.js';

const asString = (value) => (typeof value === 'string' ? value : '');

export const getNotes = async (req, res) => {
  const notes = await prisma.note.findMany({
    where: { userId: req.user.id },
    orderBy: { updatedAt: 'desc' },
  });

  res.json({ notes });
};

export const createNote = async (req, res) => {
  const title = asString(req.body?.title).trim();
  const content = asString(req.body?.content);

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  // The owner always comes from the token, never from the body
  const note = await prisma.note.create({
    data: { title, content, userId: req.user.id },
  });

  res.status(201).json({ note });
};

// loadOwnNote already found it and checked it's ours
export const getNote = (req, res) => {
  res.json({ note: req.note });
};

export const updateNote = async (req, res) => {
  const body = req.body ?? {};
  const data = {};

  // PATCH: only the fields that were sent change
  if ('title' in body) {
    data.title = asString(body.title).trim();
    if (!data.title) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
  }
  if ('content' in body) {
    data.content = asString(body.content);
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'Send a title or content to update' });
  }

  const note = await prisma.note.update({ where: { id: req.note.id }, data });

  res.json({ note });
};

export const deleteNote = async (req, res) => {
  await prisma.note.delete({ where: { id: req.note.id } });
  res.status(204).end();
};
