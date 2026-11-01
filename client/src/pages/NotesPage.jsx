import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api.js';
import NoteForm from '../components/NoteForm.jsx';
import NoteItem from '../components/NoteItem.jsx';
import styles from '../styles/NotesPage.module.css';

export default function NotesPage() {
  const [notes, setNotes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch('/notes')
      .then((data) => setNotes(data.notes))
      .catch((err) => setError(err.message));
  }, []);

  async function createNote(values) {
    const data = await apiFetch('/notes', { method: 'POST', body: values });
    setNotes((prev) => [data.note, ...prev]);
  }

  // Editing changes updatedAt, so the note moves to the top like the API orders it
  async function updateNote(id, values) {
    const data = await apiFetch(`/notes/${id}`, { method: 'PATCH', body: values });
    setNotes((prev) => [data.note, ...prev.filter((note) => note.id !== id)]);
  }

  async function deleteNote(id) {
    await apiFetch(`/notes/${id}`, { method: 'DELETE' });
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  return (
    <section className={styles.page}>
      <h1>Notes</h1>
      <NoteForm onSubmit={createNote} submitLabel="Add note" />

      {error && <p>{error}</p>}
      {!notes && !error && <p>Loading...</p>}
      {notes?.length === 0 && <p>No notes yet.</p>}

      {notes?.length > 0 && (
        <div className={styles.list}>
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          ))}
        </div>
      )}
    </section>
  );
}
