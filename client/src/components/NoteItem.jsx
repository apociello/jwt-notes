import styles from '../styles/NoteItem.module.css';

const formatDate = (iso) =>
  new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

export default function NoteItem({ note }) {
  return (
    <article className={styles.note}>
      <h2>{note.title}</h2>
      {note.content && <p className={styles.content}>{note.content}</p>}
      <time className={styles.date} dateTime={note.updatedAt}>
        {formatDate(note.updatedAt)}
      </time>
    </article>
  );
}
