import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-display font-bold text-white mb-2">Aether Index</h3>
          <p className="text-sm text-gray-500">© 2025 The Ultimate AI Foundry. All rights reserved.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
};
