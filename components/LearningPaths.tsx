import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Clock, Lock, Star } from 'lucide-react';
import { LEARNING_PATHS } from '../constants';
import { Card } from './ui/Card';
import { useAuth } from './contexts/AuthContext';

export const LearningPaths: React.FC = () => {
  const [activePath, setActivePath] = useState<string | null>(LEARNING_PATHS[0].id);
  const { user, openSignIn, isEnrolled, enrollInPath, unlockBadge, badges } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleEnroll = (pathId: string) => {
    if (!user) {
      openSignIn();
      return;
    }
    
    if (!isEnrolled(pathId)) {
      enrollInPath(pathId);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleComplete = (pathId: string) => {
      // Logic to unlock specific badge based on path
      // Simple mapping for demo:
      if (pathId === 'beginner') unlockBadge('1'); 
      if (pathId === 'intermediate') unlockBadge('2'); 
      if (pathId === 'advanced') unlockBadge('3'); 
      if (pathId === 'frontier') unlockBadge('4'); 
      
      // Trigger confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
  }

  // Check if badge related to this path is unlocked
  const isPathCompleted = (pathId: string) => {
      if (pathId === 'beginner') return badges.find(b => b.id === '1')?.unlocked;
      if (pathId === 'intermediate') return badges.find(b => b.id === '2')?.unlocked;
      if (pathId === 'advanced') return badges.find(b => b.id === '3')?.unlocked;
      if (pathId === 'frontier') return badges.find(b => b.id === '4')?.unlocked;
      return false;
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Smart Learning Paths</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Structured roadmaps designed to take you from novice to expert. Choose your entry point.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Path Selector */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {LEARNING_PATHS.map((path) => (
              <button
                key={path.id}
                onClick={() => setActivePath(path.id)}
                className={`text-left p-6 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                  activePath === path.id
                    ? 'bg-white/10 border-aether-primary/50'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${path.color} ${activePath === path.id ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
                
                <div className="flex justify-between items-start">
                   <div>
                      <h3 className={`text-xl font-bold mb-1 ${activePath === path.id ? 'text-white' : 'text-gray-300'}`}>
                        {path.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{path.description}</p>
                   </div>
                   {isEnrolled(path.id) && (
                     <CheckCircle2 size={20} className="text-green-500" />
                   )}
                </div>
                
                {activePath === path.id && (
                  <motion.div layoutId="active-indicator" className="absolute right-4 top-1/2 -translate-y-1/2">
                    <ChevronRight className="text-aether-primary" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* Path Details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activePath && (
                <motion.div
                  key={activePath}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full min-h-[500px] relative overflow-hidden">
                    {/* Confetti effect placeholder */}
                    {showConfetti && (
                        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                            <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: [0, 1, 0] }}
                                transition={{ duration: 1 }}
                                className="text-6xl"
                            >
                                🎉
                            </motion.div>
                        </div>
                    )}

                    {LEARNING_PATHS.map(p => {
                      if (p.id !== activePath) return null;
                      const enrolled = isEnrolled(p.id);
                      const completed = isPathCompleted(p.id);

                      return (
                        <div key={p.id}>
                          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-3xl font-display font-bold">{p.title}</h3>
                                {enrolled && (
                                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/20">
                                    ENROLLED
                                  </span>
                                )}
                                {completed && (
                                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold border border-yellow-500/20 flex items-center gap-1">
                                    <Star size={12} fill="currentColor" /> COMPLETED
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400">{p.description}</p>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                              <Clock size={16} className="text-aether-primary" />
                              <span className="text-sm font-medium">~40 Hours</span>
                            </div>
                          </div>

                          <div className="space-y-6">
                            {p.modules.map((module, idx) => (
                              <div key={idx} className="group">
                                <div className="flex items-start gap-4">
                                  <div className="mt-1">
                                    {idx === 0 ? (
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                                          enrolled ? 'bg-green-500/20 border-green-500/50 text-green-500' : 'bg-aether-primary/20 border-aether-primary/50 text-aether-primary'
                                      }`}>
                                        {enrolled ? <CheckCircle2 size={16} /> : <span>1</span>}
                                      </div>
                                    ) : (
                                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-gray-500 group-hover:border-gray-400 transition-colors">
                                        {enrolled ? <Lock size={14} /> : idx + 1}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className={`text-lg font-semibold mb-2 flex items-center gap-3 ${idx !== 0 && !enrolled ? 'text-gray-500' : 'text-white'}`}>
                                      {module.title}
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/5">
                                        {module.resources} resources
                                      </span>
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {module.topics.map(topic => (
                                        <span key={topic} className={`text-xs px-2 py-1 rounded border ${idx !== 0 && !enrolled ? 'bg-transparent text-gray-600 border-white/5' : 'bg-white/5 text-gray-400 border-white/5'}`}>
                                          {topic}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {idx !== p.modules.length - 1 && (
                                  <div className="ml-4 w-px h-8 bg-white/10 my-2" />
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="mt-10 pt-6 border-t border-white/10">
                            {enrolled ? (
                                <div className="flex gap-4">
                                    <button className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-bold cursor-default flex items-center justify-center gap-2">
                                        <CheckCircle2 className="text-green-500" />
                                        In Progress
                                    </button>
                                    {!completed && (
                                        <button 
                                            onClick={() => handleComplete(p.id)}
                                            className="px-6 py-3 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-500 font-bold transition-all"
                                        >
                                            Complete Quest
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <button 
                                    onClick={() => handleEnroll(p.id)}
                                    className="w-full py-3 rounded-lg bg-gradient-to-r from-aether-primary to-aether-secondary text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                >
                                    Enroll in Path
                                </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};