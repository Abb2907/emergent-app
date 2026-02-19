import React, { useState, useEffect } from 'react';
import { RESOURCES } from '../constants';
import { Card } from './ui/Card';
import { Play, Book, FileText, Code, Monitor, Mic, Layers } from 'lucide-react';

export const ResourceLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Reset showAll when filter changes
  useEffect(() => {
    setShowAll(false);
  }, [activeTab]);

  const tabs = ['All', 'YouTube', 'Book', 'Course', 'Paper', 'Tool'];

  const filteredResources = activeTab === 'All' 
    ? RESOURCES 
    : RESOURCES.filter(r => {
        if (activeTab === 'Paper') return r.type.includes('Paper') || r.type === 'Whitepaper' || r.type === 'Article' || r.type === 'Research Paper';
        if (activeTab === 'Book') return r.type.includes('Book');
        if (activeTab === 'YouTube') return r.type.includes('YouTube') || r.type === 'Playlist' || r.type === 'Talk' || r.type === 'Webinar';
        return r.type === activeTab;
    });

  const displayedResources = showAll ? filteredResources : filteredResources.slice(0, 16);

  const getIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('youtube') || t.includes('video') || t.includes('playlist') || t.includes('webinar') || t.includes('talk')) return <Play size={20} />;
    if (t.includes('book') || t.includes('pdf')) return <Book size={20} />;
    if (t.includes('course') || t.includes('training') || t.includes('learning path')) return <Monitor size={20} />;
    if (t.includes('paper') || t.includes('article') || t.includes('blog') || t.includes('newsletter') || t.includes('guide') || t.includes('documentation') || t.includes('resource') || t.includes('whitepaper')) return <FileText size={20} />;
    if (t.includes('voice') || t.includes('audio')) return <Mic size={20} />;
    return <Layers size={20} />;
  };

  return (
    <section id="library" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
         <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">The Knowledge Library</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Videos, books, papers, and courses. The best content from around the web.
          </p>
        </div>

        <div className="flex justify-center mb-12 flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-aether-primary text-aether-dark font-bold' 
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedResources.map((res, idx) => (
            <Card key={idx} className="group hover:border-aether-secondary/30 transition-all flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10 text-gray-300 group-hover:text-aether-secondary transition-colors">
                  {getIcon(res.type)}
                </div>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider text-right max-w-[50%] leading-tight">
                  {res.type}
                </span>
              </div>
              
              <h4 className="text-lg font-bold mb-2 line-clamp-2 leading-snug group-hover:text-aether-secondary transition-colors">
                <a href={res.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{res.title}</a>
              </h4>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed flex-1">
                {res.desc}
              </p>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                <span className="truncate max-w-[60%]">{res.category}</span>
                <span className={`font-medium whitespace-nowrap ${
                    res.level === 'Beginner' ? 'text-green-400' :
                    res.level === 'Intermediate' ? 'text-blue-400' : 'text-purple-400'
                }`}>
                  {res.level}
                </span>
              </div>
            </Card>
          ))}
        </div>
        
        {!showAll && filteredResources.length > 16 && (
            <div className="mt-12 text-center">
                <button 
                  onClick={() => setShowAll(true)}
                  className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 text-sm font-medium transition-colors"
                >
                    View All {filteredResources.length} Resources
                </button>
            </div>
        )}
      </div>
    </section>
  );
};
