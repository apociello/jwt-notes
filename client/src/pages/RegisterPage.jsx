import { useState } from 'react';
import { Link } from 'react-router';
import { apiFetch } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.js';
import styles from '../styles/AuthForm.module.css';

export default function RegisterPage() {
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
      const data = await apiFetch('/auth/register', {
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
      <h1>Sign up</h1>

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
          autoComplete="new-password"
          minLength={8}
          required
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing up...' : 'Sign up'}
      </button>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
