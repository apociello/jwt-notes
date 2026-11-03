import { NavLink, Outlet } from 'react-router';
import { useAuth } from './context/AuthContext.js';
import styles from './styles/App.module.css';

const navLinkClass = ({ isActive }) => (isActive ? styles.active : undefined);

export default function App() {
  const { token, user, logout } = useAuth();

  return (
    <>
      {token && (
        <header className={styles.header}>
          <nav className={styles.nav}>
            <NavLink to="/" className={navLinkClass}>
              Notes
            </NavLink>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
            <span className={styles.username}>{user?.username}</span>
            <button type="button" onClick={logout}>
              Log out
            </button>
          </nav>
        </header>
      )}
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
