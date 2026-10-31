import { useEffect, useState } from 'react';
import {
  apiFetch,
  getToken,
  setToken,
  clearToken,
  setUnauthorizedHandler,
} from '../lib/api.js';
import { AuthContext } from './AuthContext.js';

export default function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken);
  const [user, setUser] = useState(null);

  function login(newToken, newUser) {
    setToken(newToken);
    setTokenState(newToken);
    setUser(newUser);
  }

  function logout() {
    clearToken();
    setTokenState(null);
    setUser(null);
  }

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, []);

  // After a reload only the token survives in localStorage
  useEffect(() => {
    if (!token || user) return;

    apiFetch('/users/me')
      .then((data) => setUser(data.user))
      .catch(() => {});
  }, [token, user]);

  return (
    <AuthContext value={{ token, user, login, logout }}>
      {children}
    </AuthContext>
  );
}
