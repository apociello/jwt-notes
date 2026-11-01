import { useState } from 'react';
import styles from '../styles/NoteForm.module.css';

export default function NoteForm({ initialNote, onSubmit, onCancel, submitLabel }) {
  const [title, setTitle] = useState(initialNote?.title ?? '');
  const [content, setContent] = useState(initialNote?.content ?? '');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({ title, content });
      setTitle('');
      setContent('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        aria-label="Title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        aria-label="Content"
        placeholder="Write something..."
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className={styles.buttons}>
        <button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
