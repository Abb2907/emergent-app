import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronRight, Clock } from 'lucide-react';
import { LEARNING_PATHS } from '../constants';
import { Card } from './ui/Card';

export const LearningPaths: React.FC = () => {
  const [activePath, setActivePath] = useState<string | null>(LEARNING_PATHS[0].id);

  return (
    <section id="paths" className="py-20 bg-black/20">
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
                
                <h3 className={`text-xl font-bold mb-1 ${activePath === path.id ? 'text-white' : 'text-gray-300'}`}>
                  {path.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">{path.description}</p>
                
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
                  <Card className="h-full min-h-[500px]">
                    {LEARNING_PATHS.map(p => {
                      if (p.id !== activePath) return null;
                      return (
                        <div key={p.id}>
                          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                            <div>
                              <h3 className="text-3xl font-display font-bold mb-2">{p.title}</h3>
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
                                      <div className="w-8 h-8 rounded-full bg-aether-primary/20 flex items-center justify-center border border-aether-primary/50 text-aether-primary">
                                        1
                                      </div>
                                    ) : (
                                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-gray-500 group-hover:border-gray-400 transition-colors">
                                        {idx + 1}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-3">
                                      {module.title}
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/5">
                                        {module.resources} resources
                                      </span>
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {module.topics.map(topic => (
                                        <span key={topic} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                          {topic}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-full">
                                    <ChevronRight size={18} className="text-gray-400" />
                                  </button>
                                </div>
                                {idx !== p.modules.length - 1 && (
                                  <div className="ml-4 w-px h-8 bg-white/10 my-2" />
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="mt-10 pt-6 border-t border-white/10">
                            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-aether-primary to-aether-secondary text-white font-bold hover:opacity-90 transition-opacity">
                              Enroll in Path
                            </button>
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
    </section>
  );
};
