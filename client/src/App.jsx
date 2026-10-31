import { Link, Outlet } from 'react-router';
import { useAuth } from './context/AuthContext.js';
import styles from './styles/App.module.css';

export default function App() {
  const { token, user, logout } = useAuth();

  return (
    <div className={styles.app}>
      {token && (
        <nav className={styles.nav}>
          <Link to="/">Notes</Link>
          <Link to="/profile">Profile</Link>
          <span className={styles.username}>{user?.username}</span>
          <button type="button" onClick={logout}>
            Log out
          </button>
        </nav>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
