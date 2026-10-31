import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext.js';

export default function GuestRoute() {
  const { token } = useAuth();

  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
}
