import { useState } from 'react';
import { Link } from 'react-router';
import { apiFetch } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.js';
import styles from '../styles/AuthForm.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: { username, password },
      });
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Log in</h1>

      <label>
        Username
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </button>

      <p>
        No account? <Link to="/register">Sign up</Link>
      </p>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
