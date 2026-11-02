import { useAuth } from '../context/AuthContext.js';
import UsernameForm from '../components/UsernameForm.jsx';
import PasswordForm from '../components/PasswordForm.jsx';
import DeleteAccount from '../components/DeleteAccount.jsx';
import styles from '../styles/ProfilePage.module.css';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className={styles.page}>
      <h1>Profile</h1>

      {/* UsernameForm needs user to fill the field; after a reload it takes a moment to arrive */}
      {user ? <UsernameForm /> : <p>Loading...</p>}
      <PasswordForm />
      <DeleteAccount />
      
    </section>
  );
}
