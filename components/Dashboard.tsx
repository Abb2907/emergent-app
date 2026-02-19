import React from 'react';
import { BadgeSystem } from './BadgeSystem';
import { useAuth } from './contexts/AuthContext';
import { Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const { user, enrolledPaths } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 max-w-md">
            <Shield size={48} className="mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
            <p className="text-gray-400">Please sign in to view your dashboard and achievements.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-display font-bold mb-2"
                >
                    Welcome back, {user.name}
                </motion.h1>
                <p className="text-gray-400">Track your progress and mastery.</p>
            </div>
            
            <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="p-3 bg-aether-primary/20 rounded-lg text-aether-primary">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-400">Active Paths</p>
                    <p className="text-2xl font-bold">{enrolledPaths.length}</p>
                </div>
            </div>
        </div>

        <BadgeSystem />
      </div>
    </div>
  );
};