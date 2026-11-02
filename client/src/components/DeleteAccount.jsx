import { useState } from 'react';
import { apiFetch } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.js';
import styles from '../styles/DeleteAccount.module.css';

export default function DeleteAccount() {
  const { logout } = useAuth();
  const [error, setError] = useState(null);

  async function handleDelete() {
    if (!window.confirm('Delete your account and all your notes? This cannot be undone.')) {
      return;
    }

    try {
      await apiFetch('/users/me', { method: 'DELETE' });
      logout();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.danger}>
      <h2>Delete account</h2>
      <p>This deletes your account and all your notes.</p>
      <button type="button" onClick={handleDelete}>
        Delete account
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
