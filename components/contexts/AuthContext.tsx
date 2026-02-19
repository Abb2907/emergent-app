import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BADGES } from '../../constants';
import { Badge } from '../../types';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isSignInOpen: boolean;
  enrolledPaths: string[];
  badges: Badge[];
  login: (name: string, email: string) => void;
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

  const login = (name: string, email: string) => {
    setUser({ name, email });
    setIsSignInOpen(false);
  };

  const logout = () => {
    setUser(null);
    setEnrolledPaths([]);
    setBadges(BADGES); // Reset badges on logout
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
