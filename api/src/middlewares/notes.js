import { prisma } from '../lib/prisma.js';

// Authorization for /notes/:id: the note must exist (404) and belong to the
// logged-in user (403). Runs after requireAuth and leaves the note in req.note
export const loadOwnNote = async (req, res, next) => {
  const id = Number(req.params.id);

  // /notes/abc can't be a note
  if (!Number.isInteger(id) || id < 1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const note = await prisma.note.findUnique({ where: { id } });

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  if (note.userId !== req.user.id) {
    return res.status(403).json({ error: 'This note belongs to another user' });
  }

  req.note = note;
  next();
};
