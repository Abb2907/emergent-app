import React, { useState, useEffect } from 'react';
import { Menu, X, Atom, Zap, BookOpen, Layers, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Paths', icon: <Zap size={18} />, href: '#paths' },
    { name: 'Repos', icon: <Layers size={18} />, href: '#repos' },
    { name: 'Library', icon: <BookOpen size={18} />, href: '#library' },
    { name: 'Community', icon: <Users size={18} />, href: '#community' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-aether-dark/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <Atom className="text-aether-primary animate-pulse-slow" size={32} />
            <div className="absolute inset-0 bg-aether-primary/20 blur-xl rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-aether-primary transition-colors">
              Aether Index
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400">The AI Foundry</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              {link.icon}
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aether-primary transition-all group-hover:w-full" />
            </a>
          ))}
          <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-semibold transition-all hover:scale-105 active:scale-95">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-aether-dark/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 text-lg font-medium text-gray-200 p-2 rounded-lg hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </a>
            ))}
            <button className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-aether-primary to-aether-secondary font-bold text-white">
              Sign In
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
