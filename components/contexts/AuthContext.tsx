import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BADGES } from '../../constants';
import { Badge } from '../../types';

interface User {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  isSignInOpen: boolean;
  enrolledPaths: string[];
  badges: Badge[];
  login: (provider: 'github' | 'google') => void;
  loginWithEmail: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signupWithEmail: (name: string, email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  logout: () => void;
  openSignIn: () => void;
  closeSignIn: () => void;
  enrollInPath: (pathId: string) => void;
  isEnrolled: (pathId: string) => boolean;
  unlockBadge: (badgeId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [enrolledPaths, setEnrolledPaths] = useState<string[]>([]);
  const [badges, setBadges] = useState<Badge[]>(BADGES);
  const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

  const apiFetch = (endpoint: string, init?: RequestInit) => {
    return fetch(getApiUrl(endpoint), {
      credentials: 'include',
      ...init,
    });
  };

  const parseApiResponse = async <T,>(response: Response): Promise<T> => {
    const contentType = response.headers.get('content-type') || '';
    const bodyText = await response.text();

    if (!bodyText) {
      return {} as T;
    }

    if (!contentType.includes('application/json')) {
      const preview = bodyText.slice(0, 120).replace(/\s+/g, ' ').trim();
      throw new Error(
        `Unexpected API response from ${response.url || 'unknown endpoint'} (${response.status}): ${preview}`
      );
    }

    try {
      return JSON.parse(bodyText) as T;
    } catch {
      throw new Error(`Received malformed JSON from ${response.url || 'the server'}.`);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await apiFetch('/api/auth/me');
      if (response.ok) {
        const data = await parseApiResponse<{ user: User }>(response);
        setUser(data.user);
      }
    } catch (error) {
      console.error('Failed to check auth:', error);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        checkAuth();
        setIsSignInOpen(false);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const loginWithEmail = async (email: string, password: string, rememberMe: boolean = false) => {
    const response = await apiFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe }),
    });
    
    if (response.ok) {
      const data = await parseApiResponse<{ user: User }>(response);
      setUser(data.user);
      setIsSignInOpen(false);
    } else {
      const errorData = await parseApiResponse<{ error?: string }>(response);
      throw new Error(errorData.error || 'Invalid credentials');
    }
  };

  const signupWithEmail = async (name: string, email: string, password: string) => {
    const response = await apiFetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await parseApiResponse<{ user: User }>(response);
      setUser(data.user);
      setIsSignInOpen(false);
    } else {
      const errorData = await parseApiResponse<{ error?: string }>(response);
      throw new Error(errorData.error || 'Signup failed');
    }
  };

  const forgotPassword = async (email: string) => {
    const response = await apiFetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await parseApiResponse<{ error?: string }>(response);
      throw new Error(errorData.error || 'Failed to request password reset');
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    const response = await apiFetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      const errorData = await parseApiResponse<{ error?: string }>(response);
      throw new Error(errorData.error || 'Failed to reset password');
    }
  };

  const login = async (provider: 'github' | 'google') => {
    try {
      const response = await apiFetch(`/api/auth/${provider}`);
      const { url } = await parseApiResponse<{ url: string }>(response);

      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      window.open(
        url,
        'oauth_popup',
        `width=${width},height=${height},left=${left},top=${top}`
      );
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setEnrolledPaths([]);
      setBadges(BADGES);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const openSignIn = () => setIsSignInOpen(true);
  const closeSignIn = () => setIsSignInOpen(false);

  const enrollInPath = (pathId: string) => {
    if (!enrolledPaths.includes(pathId)) {
      setEnrolledPaths(prev => [...prev, pathId]);
    }
  };

  const isEnrolled = (pathId: string) => enrolledPaths.includes(pathId);

  const unlockBadge = (badgeId: string) => {
    setBadges(prev => prev.map(badge =>
      badge.id === badgeId ? { ...badge, unlocked: true } : badge
    ));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isSignInOpen,
      enrolledPaths,
      badges,
      login,
      loginWithEmail,
      signupWithEmail,
      forgotPassword,
      resetPassword,
      logout,
      openSignIn,
      closeSignIn,
      enrollInPath,
      isEnrolled,
      unlockBadge
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
