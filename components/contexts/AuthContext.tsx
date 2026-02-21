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
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  openSignIn: () => void;
  closeSignIn: () => void;
  enrollInPath: (pathId: string) => void;
  isEnrolled: (pathId: string) => boolean;
  unlockBadge: (badgeId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [enrolledPaths, setEnrolledPaths] = useState<string[]>([]);
  const [badges, setBadges] = useState<Badge[]>(BADGES);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
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

  const loginWithEmail = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      setIsSignInOpen(false);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signupWithEmail = async (name: string, email: string, password: string) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      setIsSignInOpen(false);
    } else {
      throw new Error('Signup failed');
    }
  };

  const login = async (provider: 'github' | 'google') => {
    try {
      const response = await fetch(`/api/auth/${provider}`);
      const { url } = await response.json();
      
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
      await fetch('/api/auth/logout', { method: 'POST' });
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
