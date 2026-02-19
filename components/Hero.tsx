import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, Book, Code } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/paths?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/paths');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-aether-dark">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aether-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-aether-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium tracking-wide text-aether-primary mb-8">
              THE ULTIMATE AI FOUNDRY
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8 tracking-tighter">
              Build.<br/>
              Ship.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aether-primary to-aether-secondary">
                Scale.
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-10 max-w-md leading-relaxed">
              Master the modern AI stack. From foundational models to autonomous agentic systems.
            </p>

            {/* Search/Action Bar */}
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-full flex items-center shadow-2xl mb-12">
              <div className="pl-6 text-gray-400">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Find a learning path..." 
                className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder-gray-500 h-12"
              />
              <button 
                onClick={handleSearch}
                className="h-12 px-8 rounded-full bg-white text-black font-bold flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Go
              </button>
            </div>

            {/* Social Proof / Stats */}
            <div className="flex items-center gap-10">
               <div>
                  <div className="flex -space-x-3 mb-2">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-10 h-10 rounded-full border-2 border-aether-dark bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                         U{i}
                       </div>
                     ))}
                  </div>
                  <p className="text-sm font-medium text-gray-400">1.2k+ Engineers</p>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <div>
                  <p className="text-3xl font-display font-bold text-white">100+</p>
                  <p className="text-sm font-medium text-gray-400">Instructors & Repos</p>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Modern Bento Grid */}
        <div className="lg:col-span-7 h-[600px] relative hidden lg:block">
           <div className="grid grid-cols-4 grid-rows-2 gap-4 h-full">
              
              {/* Main Feature Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="col-span-2 row-span-2 rounded-[2.5rem] bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 relative overflow-hidden group"
              >
                  <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop" 
                    alt="Learning"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 grayscale mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 pointer-events-none">
                     <span className="px-3 py-1 rounded-full bg-aether-primary/20 text-aether-primary text-xs font-bold uppercase mb-3 inline-block border border-aether-primary/20">
                        Featured Path
                     </span>
                     <h3 className="text-3xl font-display font-bold text-white mb-2">Agentic AI</h3>
                     <p className="text-gray-300 text-sm">Build autonomous systems that reason and act.</p>
                  </div>
                  <Link to="/paths?search=agentic" className="absolute inset-0 z-20" aria-label="Explore Agentic AI" />
              </motion.div>

              {/* Secondary Card: Repositories (Vertical) */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="col-span-1 row-span-2 rounded-[2.5rem] bg-[#1a1b26] border border-white/10 relative overflow-hidden group hover:bg-[#1f212e] transition-colors cursor-pointer"
              >
                 <Link to="/repos" className="absolute inset-0 flex flex-col items-center justify-center py-10">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto text-white group-hover:scale-110 transition-transform">
                       <Code size={20} />
                    </div>
                    <p className="[writing-mode:vertical-rl] rotate-180 text-2xl font-display font-bold tracking-widest text-white/50 group-hover:text-white transition-colors uppercase">
                       Repositories
                    </p>
                 </Link>
              </motion.div>

              {/* Tertiary Card: Library (Vertical) */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3, duration: 0.8 }}
                 className="col-span-1 row-span-2 rounded-[2.5rem] bg-white text-aether-dark relative overflow-hidden group cursor-pointer"
              >
                 <Link to="/library" className="absolute inset-0 flex flex-col items-center justify-center py-10">
                    <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-auto group-hover:scale-110 transition-transform text-black">
                       <Book size={20} />
                    </div>
                    <p className="[writing-mode:vertical-rl] rotate-180 text-2xl font-display font-bold tracking-widest text-black/50 group-hover:text-black transition-colors uppercase">
                       Library
                    </p>
                 </Link>
              </motion.div>
           </div>

           {/* Floating Widget 1 */}
           <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute top-12 -right-12 w-48 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl z-20"
           >
              <div className="flex items-center justify-between mb-2">
                 <span className="text-xs text-gray-400">Weekly Progress</span>
                 <span className="text-xs font-bold text-green-400">+24%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full w-[75%] bg-gradient-to-r from-aether-primary to-aether-secondary" />
              </div>
           </motion.div>

           {/* Floating Widget 2 */}
           <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-24 -left-12 z-20"
           >
              <Link 
                to="/paths?search=python"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white text-black shadow-2xl pr-8 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-sm">Start Learning</p>
                  <p className="text-xs text-gray-500">Python for AI</p>
                </div>
              </Link>
           </motion.div>

        </div>
      </div>
    </section>
  );
};