import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext.js';
import styles from '../styles/GuestRoute.module.css';

export default function GuestRoute() {
  const { token } = useAuth();

  if (token) return <Navigate to="/" replace />;
  return (
    <div className={styles.center}>
      <Outlet />
    </div>
  );
}
