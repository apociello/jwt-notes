import { Router } from 'express';
import {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from '../controllers/noteController.js';
import { requireAuth } from '../middlewares/auth.js';
import { loadOwnNote } from '../middlewares/notes.js';

const router = Router();

// Every route in this file needs a valid token
router.use(requireAuth);

router.get('/', getNotes);
router.post('/', createNote);

// Routes for a single note also check that it's yours
router.get('/:id', loadOwnNote, getNote);
router.patch('/:id', loadOwnNote, updateNote);
router.delete('/:id', loadOwnNote, deleteNote);

export default router;
