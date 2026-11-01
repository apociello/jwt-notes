import { useState } from 'react';
import NoteForm from './NoteForm.jsx';
import styles from '../styles/NoteItem.module.css';

const formatDate = (iso) =>
  new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

export default function NoteItem({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  async function handleUpdate(values) {
    await onUpdate(note.id, values);
    setIsEditing(false);
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${note.title}"?`)) return;

    try {
      await onDelete(note.id);
    } catch (err) {
      setError(err.message);
    }
  }

  if (isEditing) {
    return (
      <article className={styles.note}>
        <NoteForm
          initialNote={note}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          submitLabel="Save"
        />
      </article>
    );
  }

  return (
    <article className={styles.note}>
      <h2>{note.title}</h2>
      {note.content && <p className={styles.content}>{note.content}</p>}
      <time className={styles.date} dateTime={note.updatedAt}>
        {formatDate(note.updatedAt)}
      </time>

      <div className={styles.actions}>
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </article>
  );
}
