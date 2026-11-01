import { useState } from 'react';
import styles from '../styles/NoteForm.module.css';

export default function NoteForm({ onSubmit, submitLabel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
      <button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
