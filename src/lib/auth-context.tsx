'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { VI } from './i18n';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string | null;
  role: 'USER' | 'ADMIN';
  currentLevel: string;
  targetLevel?: string;
  targetExam?: string | null;
  targetScore?: number | null;
  dailyMinutes: number;
  placementDone: boolean;
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  totalStudyDays: number;
  totalStudyMinutes: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  updateProfile: (data: Partial<User> & { currentPassword?: string; newPassword?: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data?.user) setUser(data.user); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || VI.auth.invalidCredentials);
        return false;
      }
      setUser(data.user);
      toast.success(VI.auth.loginSuccess);
      return true;
    } catch {
      toast.error(VI.errors.network);
      return false;
    }
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || VI.errors.generic);
        return false;
      }
      setUser(data.user);
      toast.success(VI.auth.registerSuccess);
      return true;
    } catch {
      toast.error(VI.errors.network);
      return false;
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    toast.success(VI.auth.loggedOut);
  };

  const refresh = async () => {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || VI.errors.generic);
        return false;
      }
      setUser(json.user);
      toast.success(VI.profile.profileUpdated);
      return true;
    } catch {
      toast.error(VI.errors.network);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}