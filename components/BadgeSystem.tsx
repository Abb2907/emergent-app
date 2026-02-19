import React from 'react';
import { BADGES } from '../constants';
import { Card } from './ui/Card';
import { Trophy } from 'lucide-react';

export const BadgeSystem: React.FC = () => {
  return (
    <div className="py-12 border-t border-white/5 bg-aether-dark">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                <Trophy size={24} />
            </div>
            <div>
                <h3 className="text-xl font-bold">Your Achievements</h3>
                <p className="text-sm text-gray-400">Track your progress and earn badges.</p>
            </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BADGES.map((badge) => (
            <div 
                key={badge.id}
                className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                    badge.unlocked 
                    ? 'bg-gradient-to-b from-white/10 to-transparent border-aether-primary/30' 
                    : 'bg-white/2 border-white/5 opacity-50 grayscale'
                }`}
            >
                <div className="text-4xl mb-3 filter drop-shadow-lg">{badge.icon}</div>
                <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
                <p className="text-xs text-gray-500">{badge.description}</p>
                {badge.unlocked && (
                    <span className="mt-3 px-2 py-0.5 rounded-full bg-aether-primary/20 text-aether-primary text-[10px] font-bold uppercase tracking-wide border border-aether-primary/20">
                        Unlocked
                    </span>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
