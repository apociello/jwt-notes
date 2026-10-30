import { Outlet } from 'react-router';
import styles from './styles/App.module.css';

// Layout shared by every page; the current page renders in <Outlet />
export default function App() {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
}
