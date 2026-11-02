import { useState } from 'react';
import { apiFetch } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.js';
import styles from '../styles/ProfileForm.module.css';

export default function UsernameForm() {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(user.username);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);

    try {
      const data = await apiFetch('/users/me', { method: 'PATCH', body: { username } });
      setUser(data.user);
      setMessage('Username updated');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Username</h2>

      <label>
        New username
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        Save
      </button>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
