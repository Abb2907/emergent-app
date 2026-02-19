import React, { useState, useMemo } from 'react';
import { Search, Star, GitBranch, ExternalLink, Filter } from 'lucide-react';
import { REPOS } from '../constants';
import { Card } from './ui/Card';
import { Difficulty } from '../types';

export const RepoGrid: React.FC = () => {
  const [filter, setFilter] = useState<Difficulty | 'All'>('All');
  const [search, setSearch] = useState('');

  const filteredRepos = useMemo(() => {
    return REPOS.filter(repo => {
      const matchesFilter = filter === 'All' || repo.level === filter;
      const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase()) || 
                            repo.description.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Frontier'];

  return (
    <section id="repos" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Curated Repositories</h2>
            <p className="text-gray-400">Hand-picked open source treasures for your AI journey.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
             <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-aether-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search repos..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-aether-primary/50 transition-colors"
              />
            </div>
            
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                    filter === cat 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <Card key={repo.id} className="flex flex-col h-full group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-aether-primary">
                  <GitBranch size={20} />
                </div>
                {repo.starter && (
                   <span className="px-2 py-1 rounded bg-aether-accent/10 text-aether-accent border border-aether-accent/20 text-xs font-bold uppercase tracking-wide">
                     Starter
                   </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-aether-primary transition-colors">{repo.name}</h3>
              <p className="text-gray-400 text-sm mb-4 flex-1">{repo.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-6">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" /> {repo.stars}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {repo.category}
                </span>
                <span className={`px-2 py-0.5 rounded border ${
                    repo.level === 'Beginner' ? 'border-green-500/20 text-green-500' :
                    repo.level === 'Intermediate' ? 'border-blue-500/20 text-blue-500' :
                    'border-purple-500/20 text-purple-500'
                }`}>
                  {repo.level}
                </span>
              </div>

              <a 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold flex items-center justify-center gap-2 transition-all group-hover:border-aether-primary/30"
              >
                View on GitHub
                <ExternalLink size={14} />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
