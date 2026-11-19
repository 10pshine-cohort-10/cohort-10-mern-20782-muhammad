import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import client, { clearToken, getToken, setToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      setRestoring(false);
      return;
    }

    client
      .get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        if (err?.response?.status === 401) {
          clearToken();
        }
      })
      .finally(() => setRestoring(false));
  }, []);

  const login = useCallback(async (credentials) => {
    const res = await client.post('/auth/login', credentials);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const register = useCallback(async (details) => {
    const res = await client.post('/auth/register', details);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, restoring, login, register, logout }),
    [user, restoring, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}
