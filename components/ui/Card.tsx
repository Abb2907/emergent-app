import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true, onClick }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, boxShadow: '0 10px 30px -10px rgba(6, 182, 212, 0.2)' } : {}}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};
