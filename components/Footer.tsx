import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const DiscordIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="9" cy="12" r="1" />
    <circle cx="15" cy="12" r="1" />
    <path d="M7.5 4.2c-.3-.5-.9-.7-1.3-.4C3.9 6 2.4 9.3 2 13c0 0 2 0 3-1.6 0 0 .9 1.6 2.9 1.6 2 0 4.1-3 4.1-3s2.1 3 4.1 3c2 0 2.9-1.6 2.9-1.6 1 1.6 3 1.6 3 1.6-.4-3.7-1.9-7-4.2-9.2-.4-.3-1-.1-1.3.4-.2.4-.5.8-.9 1.1 1.8 1.5 2.5 4.1 1.4 6.4 0 0-.9-1.2-2.9-1.2-2 0-2.9 1.2-2.9 1.2-1.1-2.3-.4-4.9 1.4-6.4-.4-.3-.7-.7-.9-1.1Z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black pt-12 pb-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-display font-bold text-white mb-2">Aether Index</h3>
          <p className="text-sm text-gray-500">© 2025 The Ultimate AI Foundry. All rights reserved.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/Abb2907" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://twitter.com/abisempire1233" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a 
            href="mailto:padhy.abhiseks18@gmail.com" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/abhisek-padhy-67b5b4168/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="https://discord.gg/aPNRFYWA" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Discord"
          >
            <DiscordIcon size={20} />
          </a>
        </div>
      </div>
      
      <div className="container mx-auto px-6 pt-8 border-t border-white/5 text-center">
        <p className="text-gray-500 italic font-display text-sm">
          "The best way to predict the future is to invent it."
        </p>
      </div>
    </footer>
  );
};
